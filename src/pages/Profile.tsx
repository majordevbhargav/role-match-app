import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Plus, X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

interface Skill {
  id: string;
  skill_name: string;
  proficiency: string;
}

interface Experience {
  id: string;
  position: string;
  company_name: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchSkills();
      fetchExperiences();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          bio: data.bio || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .eq('user_id', user?.id)
        .order('start_date', { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user?.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const { error } = await supabase
        .from('skills')
        .insert({
          user_id: user?.id,
          skill_name: newSkill,
          proficiency: 'intermediate'
        });

      if (error) throw error;
      setNewSkill('');
      fetchSkills();
      toast.success("Skill added!");
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error("Failed to add skill");
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;
      fetchSkills();
      toast.success("Skill removed!");
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error("Failed to remove skill");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <nav className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-10 w-48" />
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
              <Link to="/jobs">
                <Button variant="outline">Browse Jobs</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-muted-foreground text-lg">Keep your information up to date for quick applications</p>
        </div>
        
        <div className="space-y-6">
          <Card className="border-2 animate-fade-in shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic details about you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={profile.first_name}
                    onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={profile.last_name}
                    onChange={(e) => setProfile({...profile, last_name: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={profile.email}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 animate-fade-in shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
              <CardDescription>Tell employers about yourself</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Experienced software developer with 5+ years in full-stack development..."
                className="min-h-[120px]"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
              />
            </CardContent>
          </Card>
          
          <Card className="border-2 animate-fade-in shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add your technical and professional skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="text-sm px-3 py-1.5">
                    {skill.skill_name}
                    <button 
                      className="ml-2 hover:text-destructive transition-colors"
                      onClick={() => handleDeleteSkill(skill.id)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a skill" 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button variant="outline" onClick={handleAddSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 animate-fade-in shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle>Experience</CardTitle>
              <CardDescription>Your work history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {experiences.length > 0 ? (
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="p-4 border-2 border-border rounded-lg hover:border-primary transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{exp.position}</h4>
                          <p className="text-sm text-muted-foreground font-medium">{exp.company_name}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date!)}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No experience added yet</p>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4 sticky bottom-4 bg-background/80 backdrop-blur-md p-4 rounded-lg border border-border shadow-[var(--shadow-medium)]">
            <Link to="/dashboard">
              <Button variant="outline" size="lg">Cancel</Button>
            </Link>
            <Button variant="hero" size="lg" onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
