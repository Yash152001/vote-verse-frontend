
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/components/ui/use-toast";
import { Lock, ShieldCheck } from "lucide-react";

const VoterLogin = () => {
  const [voterId, setVoterId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication for demo
    setTimeout(() => {
      toast({
        title: "Verification successful",
        description: "Your identity has been verified.",
      });
      navigate("/voter/ballot");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <a href="/" className="inline-block">
            <h2 className="font-bold text-2xl flex items-center justify-center">
              <span className="text-primary">Vote</span>
              <span className="text-secondary">Verse</span>
            </h2>
          </a>
        </div>
        
        <Card className="animate-scale-in">
          <CardHeader>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-center">Voter Verification</CardTitle>
            <CardDescription className="text-center">
              Enter your Voter ID to access your ballot
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voterId">Voter ID</Label>
                <Input
                  id="voterId"
                  placeholder="Enter your voter ID number"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Your information is encrypted and secured by blockchain technology
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading || voterId.length < 6}
              >
                {isLoading ? "Verifying..." : "Verify Identity"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Need help?{" "}
                <a 
                  href="/voter/help" 
                  className="text-secondary hover:underline"
                >
                  Voter Support
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default VoterLogin;
