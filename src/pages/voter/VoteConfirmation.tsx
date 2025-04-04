
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// In a real app, we would get this from state or context
const mockSelectedCandidate = {
  id: "1",
  name: "Alex Johnson",
  party: "Progressive Party",
  image: "/placeholder.svg",
};

const VoteConfirmation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Mock blockchain transaction
    setTimeout(() => {
      toast({
        title: "Vote submitted successfully",
        description: "Your vote has been recorded on the blockchain.",
      });
      navigate("/voter/success");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldAlert className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Confirm Your Vote</CardTitle>
          <CardDescription>
            Please review your selection before submitting your final vote
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Selected Candidate</h3>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-full bg-muted">
                <img
                  src={mockSelectedCandidate.image}
                  alt={mockSelectedCandidate.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-xl font-medium">{mockSelectedCandidate.name}</div>
                <div className="text-muted-foreground">{mockSelectedCandidate.party}</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-md bg-muted">
            <AlertCircle className="h-5 w-5 text-secondary mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium">Important Notice</p>
              <p className="text-sm text-muted-foreground">
                By clicking "Submit Vote" below, your vote will be permanently recorded on the blockchain.
                This action cannot be undone or changed.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex flex-col xs:flex-row gap-4 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/voter/ballot")}
              disabled={isSubmitting}
            >
              Change Selection
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-pulse">Processing...</span>
                </>
              ) : (
                "Submit Vote"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VoteConfirmation;
