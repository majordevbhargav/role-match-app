import { Card } from "@/components/ui/card";
import { Zap, Target, BarChart3, Lock, Clock, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "One-Click Applications",
    description: "Apply to multiple jobs instantly with pre-filled information from your profile."
  },
  {
    icon: Target,
    title: "Smart Role Matching",
    description: "Automatically selects the right resume and projects based on the job role you're applying for."
  },
  {
    icon: BarChart3,
    title: "Application Tracking",
    description: "Monitor all your applications in one centralized dashboard with real-time status updates."
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your data is encrypted and stored securely. You control what employers see."
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Reduce application time from 30 minutes to just 30 seconds per job."
  },
  {
    icon: Sparkles,
    title: "Multiple Profiles",
    description: "Create different professional profiles for various career paths and roles."
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SmartApply</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to streamline your job search and land your dream role faster.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-[var(--shadow-medium)] transition-all duration-300 hover:-translate-y-1 bg-[var(--gradient-card)]">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
