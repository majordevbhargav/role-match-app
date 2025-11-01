import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, MapPin, Clock, DollarSign, Search, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  salary_min: number;
  salary_max: number;
  requirements: string[];
  description: string;
  experience_level: string;
  created_at: string;
}

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickApply = async (jobId: string, jobTitle: string, company: string) => {
    if (!user) {
      toast.error('Please sign in to apply');
      return;
    }

    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          job_id: jobId,
          status: 'applied'
        });

      if (error) throw error;

      toast.success(`Application submitted to ${company} for ${jobTitle}!`, {
        description: "Your profile was automatically attached."
      });
    } catch (error: any) {
      if (error.code === '23505') {
        toast.error('You have already applied to this job');
      } else {
        console.error('Error applying:', error);
        toast.error('Failed to submit application');
      }
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.requirements?.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatSalary = (min: number, max: number) => {
    if (!min || !max) return 'Salary not specified';
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const getTimeAgo = (date: string) => {
    const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SmartApply
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Browse Jobs
          </h1>
          <p className="text-muted-foreground text-lg">Find your next opportunity and apply instantly</p>
        </div>
        
        <Card className="mb-8 shadow-[var(--shadow-medium)] border-2 animate-fade-in">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by job title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </CardContent>
        </Card>
        
        {loading ? (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <Card 
                key={job.id} 
                className="hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1 animate-fade-in border-2"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="h-14 w-14 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-[var(--shadow-soft)]">
                        <Building2 className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                        <CardDescription className="text-base font-medium">{job.company}</CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="hero" 
                      onClick={() => handleQuickApply(job.id, job.title, job.company)}
                      className="flex-shrink-0"
                    >
                      Quick Apply
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4 text-primary" />
                      {job.job_type || 'Full-time'}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-4 w-4 text-primary" />
                      {formatSalary(job.salary_min, job.salary_max)}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      {getTimeAgo(job.created_at)}
                    </div>
                  </div>
                  
                  {job.requirements && job.requirements.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {!loading && filteredJobs.length === 0 && (
          <Card className="text-center py-16 border-2 border-dashed">
            <CardContent>
              <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-xl font-semibold mb-2">No jobs found</p>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Jobs;
