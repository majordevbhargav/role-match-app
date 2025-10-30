import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
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
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
