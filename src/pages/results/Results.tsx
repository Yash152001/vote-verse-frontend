
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  CheckCircle,
  ChevronDown,
  Download,
  ExternalLink,
  PieChart,
  Share2,
} from "lucide-react";

interface CandidateResult {
  id: string;
  name: string;
  party: string;
  image: string;
  votes: number;
  percentage: number;
}

const candidateResults: CandidateResult[] = [
  {
    id: "1",
    name: "Alex Johnson",
    party: "Progressive Party",
    image: "/placeholder.svg",
    votes: 1642,
    percentage: 42.5,
  },
  {
    id: "2",
    name: "Sarah Williams",
    party: "Democratic Alliance",
    image: "/placeholder.svg",
    votes: 1293,
    percentage: 33.5,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    party: "Unity Coalition",
    image: "/placeholder.svg",
    votes: 654,
    percentage: 16.9,
  },
  {
    id: "4",
    name: "Jessica Chen",
    party: "Reform Movement",
    image: "/placeholder.svg",
    votes: 274,
    percentage: 7.1,
  },
];

const Results = () => {
  const totalVotes = candidateResults.reduce((sum, candidate) => sum + candidate.votes, 0);
  const winner = candidateResults.reduce((prev, current) => 
    (prev.votes > current.votes) ? prev : current
  );

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Election Results</h1>
          <p className="text-muted-foreground">
            Presidential Election 2024 • Final Results
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Verify on Blockchain
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Vote Breakdown</CardTitle>
            <CardDescription>
              Total votes: {totalVotes.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bar" className="space-y-4">
              <TabsList>
                <TabsTrigger value="bar">
                  <BarChart className="mr-2 h-4 w-4" />
                  Bar Chart
                </TabsTrigger>
                <TabsTrigger value="pie">
                  <PieChart className="mr-2 h-4 w-4" />
                  Pie Chart
                </TabsTrigger>
              </TabsList>
              <TabsContent value="bar" className="space-y-4">
                {candidateResults.map((candidate) => (
                  <div key={candidate.id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: `hsl(${Number(candidate.id) * 100}, 70%, 50%)`,
                          }}
                        />
                        <span className="font-medium">{candidate.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {candidate.party}
                        </span>
                      </div>
                      <div className="font-medium">
                        {candidate.votes.toLocaleString()} votes ({candidate.percentage}%)
                      </div>
                    </div>
                    <Progress value={candidate.percentage} />
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="pie">
                <div className="flex h-80 items-center justify-center">
                  <div className="relative h-60 w-60 rounded-full">
                    {/* Simple pie chart visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xl font-bold">{totalVotes}</p>
                        <p className="text-sm text-muted-foreground">Total Votes</p>
                      </div>
                    </div>
                    {/* In a real app, we would use the Recharts library here for proper pie charts */}
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      {candidateResults.map((candidate, index) => {
                        let previousAngle = 0;
                        for (let i = 0; i < index; i++) {
                          previousAngle += candidateResults[i].percentage * 3.6;
                        }
                        const angle = candidate.percentage * 3.6;
                        
                        const x1 = 50 + 50 * Math.cos((previousAngle * Math.PI) / 180);
                        const y1 = 50 + 50 * Math.sin((previousAngle * Math.PI) / 180);
                        
                        const x2 = 50 + 50 * Math.cos(((previousAngle + angle) * Math.PI) / 180);
                        const y2 = 50 + 50 * Math.sin(((previousAngle + angle) * Math.PI) / 180);
                        
                        const largeArcFlag = angle > 180 ? 1 : 0;
                        
                        return (
                          <path
                            key={candidate.id}
                            d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={`hsl(${Number(candidate.id) * 100}, 70%, 50%)`}
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {candidateResults.map((candidate) => (
                    <div key={candidate.id} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: `hsl(${Number(candidate.id) * 100}, 70%, 50%)`,
                        }}
                      />
                      <span className="text-sm">
                        {candidate.name} ({candidate.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="order-first md:order-none">
          <CardHeader>
            <CardTitle>Winner</CardTitle>
            <CardDescription>
              Based on vote count
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-primary bg-muted">
              <img
                src={winner.image}
                alt={winner.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-2 space-y-1">
              <h3 className="text-xl font-bold">{winner.name}</h3>
              <p className="text-muted-foreground">{winner.party}</p>
              <div className="mt-2 flex items-center justify-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-primary">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{winner.percentage}% of votes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Vote Distribution by Location</CardTitle>
              <CardDescription>
                Breakdown of votes by electoral district
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[
              {
                district: "North District",
                totalVotes: 980,
                results: [
                  { name: "Alex Johnson", votes: 420, percentage: 42.9 },
                  { name: "Sarah Williams", votes: 330, percentage: 33.7 },
                  { name: "Michael Rodriguez", votes: 150, percentage: 15.3 },
                  { name: "Jessica Chen", votes: 80, percentage: 8.1 },
                ],
              },
              {
                district: "South District",
                totalVotes: 860,
                results: [
                  { name: "Alex Johnson", votes: 380, percentage: 44.2 },
                  { name: "Sarah Williams", votes: 300, percentage: 34.9 },
                  { name: "Michael Rodriguez", votes: 120, percentage: 13.9 },
                  { name: "Jessica Chen", votes: 60, percentage: 7.0 },
                ],
              },
            ].map((district, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{district.district}</h3>
                  <p className="text-sm text-muted-foreground">
                    {district.totalVotes.toLocaleString()} total votes
                  </p>
                </div>
                <div className="space-y-2">
                  {district.results.map((result, rIndex) => (
                    <div key={rIndex} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{result.name}</span>
                        <span>
                          {result.votes.toLocaleString()} ({result.percentage}%)
                        </span>
                      </div>
                      <Progress
                        value={result.percentage}
                        className="h-2"
                        style={{
                          backgroundColor: `hsl(${(rIndex + 1) * 100}, 20%, 92%)`,
                        }}
                        indicatorClassName={`bg-[hsl(${(rIndex + 1) * 100},70%,50%)]`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Show All Districts
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Verification</CardTitle>
          <CardDescription>
            Verify the integrity of the election results on the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <h4 className="font-medium mb-2">Election Smart Contract</h4>
            <p className="font-mono text-xs break-all">
              0x742d35Cc6634C0532925a3b844Bc454e4438f44e
            </p>
          </div>
          <div className="rounded-md bg-muted p-4">
            <h4 className="font-medium mb-2">Result Hash</h4>
            <p className="font-mono text-xs break-all">
              0x8a5b0e3d82b3c9a2e1d89d3e7f4b42f4c3e1d89d3e7f4b42f4c3e1d89d3e7f4b
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1">
              <ExternalLink className="mr-2 h-4 w-4" />
              Verify on Blockchain Explorer
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Verification Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
