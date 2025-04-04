
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const VoteSuccess = () => {
  return (
    <div className="max-w-md mx-auto animate-scale-in">
      <Card className="border-2 border-success/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <CardTitle className="text-2xl">Vote Successfully Cast</CardTitle>
          <CardDescription>
            Your vote has been securely recorded on the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-sm font-medium mb-2">Blockchain Transaction ID</h3>
            <p className="bg-muted p-2 rounded text-xs font-mono break-all">
              0x7d5b8d6f9a2c5e4b3a1d8e7c6b5a4d3c2b1a9d8c7b6a5d4e3f2a1b0c9d8e7f6
            </p>
          </div>
          
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-2">
              Thank you for participating in this election.
            </p>
            <p className="text-sm text-muted-foreground">
              Your vote is anonymous and has been securely recorded.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex flex-col gap-4 w-full">
            <Button asChild>
              <a href="/results">
                View Election Results
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/">
                Return to Home
              </a>
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            A receipt has been sent to your registered email address.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VoteSuccess;
