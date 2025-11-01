import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-[var(--shadow-large)]">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6">
            <AlertCircle className="h-10 w-10 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <Link to="/" className="inline-block w-full">
            <Button variant="hero" className="w-full" size="lg">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
