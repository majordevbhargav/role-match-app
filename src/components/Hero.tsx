import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-job-platform.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-5" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Smart Job Application Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Apply to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Multiple Jobs</span> in Seconds
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Fill your profile once, apply everywhere instantly. Our intelligent system auto-fills your details and matches the right resume to each job role.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-foreground">Save hours on repetitive form filling</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-foreground">Smart role-based resume selection</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-foreground">Track all applications in one dashboard</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/auth">
                <Button variant="hero" size="lg" className="group">
                  Start Applying Smart
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
            <img
              src={heroImage}
              alt="Professionals using SmartApply platform"
              className="relative rounded-2xl shadow-[var(--shadow-large)] w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
