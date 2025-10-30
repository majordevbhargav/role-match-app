import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Briefcase, FileText, Target, TrendingUp, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const profileCompletion = 75;
  
  const stats = [
    { label: "Applications Sent", value: "12", icon: Briefcase, trend: "+3 this week" },
    { label: "Profile Views", value: "48", icon: User, trend: "+12 this week" },
    { label: "Interview Invites", value: "3", icon: Target, trend: "+1 new" },
    { label: "Success Rate", value: "25%", icon: TrendingUp, trend: "Above average" },
  ];
  
  const recentApplications = [
    { company: "Tech Corp", role: "Full Stack Developer", status: "Under Review", date: "2 days ago" },
    { company: "Design Studio", role: "UI/UX Designer", status: "Interviewed", date: "5 days ago" },
    { company: "Data Inc", role: "Data Analyst", status: "Applied", date: "1 week ago" },
  ];

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
              <Link to="/jobs">
                <Button variant="ghost">Browse Jobs</Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's your job search overview</p>
        </div>
        
        <Card className="mb-8 bg-[var(--gradient-card)]">
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>Complete your profile to get better job matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={profileCompletion} className="h-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{profileCompletion}% Complete</span>
              <Link to="/profile">
                <Button variant="link" className="h-auto p-0">
                  Complete Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-[var(--shadow-medium)] transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Track your latest job applications</CardDescription>
              </div>
              <Link to="/jobs">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Apply New
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{app.role}</p>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                        {app.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{app.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to boost your job search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/profile">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" className="w-full justify-start">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse Jobs
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Upload New Resume
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="mr-2 h-4 w-4" />
                Set Job Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
