
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { CheckCircle, Lock, Shield, TrendingUp } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-bold text-xl flex items-center">
              <span className="text-primary">Vote</span>
              <span className="text-secondary">Verse</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="outline">
              <a href="/voter/login">Voter Access</a>
            </Button>
            <Button asChild>
              <a href="/login">Admin Login</a>
            </Button>
          </div>
        </div>
      </header>
      <section className="py-20 px-4 md:px-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Secure Blockchain <span className="text-secondary">Voting System</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Transparent, immutable, and verifiable elections powered by blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <a href="/voter/login">Vote Now</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/results">View Results</a>
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src="/placeholder.svg" 
                alt="Blockchain Voting" 
                className="w-full h-auto rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose VoteVerse?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our blockchain-based voting system ensures transparency, security, and verifiability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Secure",
                description: "End-to-end encryption and blockchain security.",
                icon: Shield,
              },
              {
                title: "Transparent",
                description: "All votes are verifiable on the blockchain.",
                icon: CheckCircle,
              },
              {
                title: "Immutable",
                description: "Once cast, votes cannot be altered or deleted.",
                icon: Lock,
              },
              {
                title: "Real-time Results",
                description: "View accurate election results as they happen.",
                icon: TrendingUp,
              },
            ].map((feature, index) => (
              <Card key={index} className="animate-in" style={{
                animationDelay: `${index * 150}ms`
              }}>
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-secondary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to participate?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Access the platform as a voter or administrator.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <a href="/voter/login">Voter Access</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/login">Admin Login</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <span className="font-bold text-xl flex items-center">
              <span className="text-primary">Vote</span>
              <span className="text-secondary">Verse</span>
            </span>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} VoteVerse. Secured by blockchain technology.
            </p>
          </div>
          <div className="flex items-center gap-8">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/verify" className="hover:underline">Verification</a></li>
                <li><a href="/results" className="hover:underline">Results</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/faq" className="hover:underline">FAQ</a></li>
                <li><a href="/help" className="hover:underline">Help Center</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:underline">Terms of Use</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
