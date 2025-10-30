import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Upload, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  const skills = ["React", "TypeScript", "Node.js", "Python", "SQL"];

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="bg-background border-b border-border">
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground">Keep your information up to date for quick applications</p>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic details about you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="San Francisco, CA" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
              <CardDescription>Tell employers about yourself</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Experienced software developer with 5+ years in full-stack development..."
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add your technical and professional skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                    {skill}
                    <button className="ml-2 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Add a skill" />
                <Button variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
              <CardDescription>Your work history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">Senior Developer</h4>
                      <p className="text-sm text-muted-foreground">Tech Company Inc</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2020 - Present</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Led development of multiple web applications using React and Node.js.
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Resumes</CardTitle>
              <CardDescription>Upload different resumes for different roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, DOCX (max 5MB)
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Full_Stack_Resume.pdf</p>
                      <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Full Stack Developer</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Link to="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button variant="hero" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
