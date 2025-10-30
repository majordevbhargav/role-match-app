import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 SmartApply. Simplifying job applications, one click at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
