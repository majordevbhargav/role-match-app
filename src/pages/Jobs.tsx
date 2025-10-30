import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, DollarSign, Search, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const jobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    posted: "2 days ago",
    tags: ["React", "Node.js", "TypeScript", "AWS"],
    description: "Looking for an experienced full stack developer to join our growing team."
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    posted: "1 week ago",
    tags: ["Figma", "Design Systems", "User Research"],
    description: "Create beautiful and intuitive user experiences for our products."
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Analytics Corp",
    location: "New York, NY",
    type: "Full-time",
    salary: "$85k - $115k",
    posted: "3 days ago",
    tags: ["Python", "SQL", "Tableau", "Statistics"],
    description: "Analyze data to drive business decisions and insights."
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Growth Ventures",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $150k",
    posted: "5 days ago",
    tags: ["Product Strategy", "Agile", "Analytics"],
    description: "Lead product development from concept to launch."
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud Systems Ltd",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130k - $170k",
    posted: "1 day ago",
    tags: ["Kubernetes", "Docker", "CI/CD", "AWS"],
    description: "Build and maintain our cloud infrastructure."
  },
  {
    id: 6,
    title: "Frontend Developer",
    company: "Digital Agency",
    location: "Remote",
    type: "Contract",
    salary: "$80k - $110k",
    posted: "4 days ago",
    tags: ["React", "Next.js", "Tailwind CSS"],
    description: "Create responsive and performant web applications."
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleQuickApply = (jobTitle: string, company: string) => {
    toast.success(`Application submitted to ${company} for ${jobTitle}!`, {
      description: "Your profile and matching resume were automatically attached."
    });
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Jobs</h1>
          <p className="text-muted-foreground">Find your next opportunity and apply instantly</p>
        </div>
        
        <Card className="mb-8 shadow-[var(--shadow-medium)]">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by job title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-[var(--shadow-medium)] transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                      <CardDescription className="text-base">{job.company}</CardDescription>
                    </div>
                  </div>
                  <Button variant="hero" onClick={() => handleQuickApply(job.title, job.company)}>
                    Quick Apply
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{job.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {job.posted}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No jobs found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Jobs;
