import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobId, userId } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Fetch job details
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();
    
    if (jobError) throw jobError;
    
    // Fetch user profile, skills, experience
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    const { data: skills } = await supabase
      .from('skills')
      .select('*')
      .eq('user_id', userId);
    
    const { data: experience } = await supabase
      .from('experience')
      .select('*')
      .eq('user_id', userId);
    
    // Create AI prompt for matching
    const prompt = `Analyze the job match between the user and job posting. Return ONLY a JSON object with a match score (0-100) and reasons.

Job: ${job.title} at ${job.company}
Requirements: ${job.requirements?.join(', ') || 'Not specified'}
Experience Level: ${job.experience_level}
Description: ${job.description}

User Profile:
Name: ${profile?.first_name} ${profile?.last_name}
Skills: ${skills?.map(s => s.skill_name).join(', ') || 'None listed'}
Experience: ${experience?.map(e => `${e.position} at ${e.company_name}`).join(', ') || 'None listed'}

Return format:
{
  "score": <number 0-100>,
  "strengths": ["<strength1>", "<strength2>"],
  "gaps": ["<gap1>", "<gap2>"],
  "recommendation": "<brief recommendation>"
}`;

    // Call Lovable AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a job matching expert. Analyze resume and job fit. Return ONLY valid JSON.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      console.error('AI API error:', await aiResponse.text());
      throw new Error('AI analysis failed');
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || '{}';
    
    // Parse AI response
    let matchData;
    try {
      matchData = JSON.parse(content);
    } catch {
      matchData = { score: 50, strengths: [], gaps: [], recommendation: 'Unable to analyze match' };
    }

    return new Response(
      JSON.stringify(matchData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-job-match:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
