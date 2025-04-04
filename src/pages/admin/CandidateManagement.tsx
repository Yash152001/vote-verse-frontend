
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Edit, MoreHorizontal, Plus, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  bio: string;
}

const initialCandidates: Candidate[] = [
  {
    id: "1",
    name: "Alex Johnson",
    party: "Progressive Party",
    image: "/placeholder.svg",
    bio: "Former mayor with 8 years of public service experience. Focused on education and healthcare reform.",
  },
  {
    id: "2",
    name: "Sarah Williams",
    party: "Democratic Alliance",
    image: "/placeholder.svg",
    bio: "Business leader and community advocate with a strong focus on economic growth and job creation.",
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    party: "Unity Coalition",
    image: "/placeholder.svg",
    bio: "Civil rights attorney and activist dedicated to social justice and equality issues.",
  },
  {
    id: "4",
    name: "Jessica Chen",
    party: "Reform Movement",
    image: "/placeholder.svg",
    bio: "Technology executive focused on innovation, digital transformation, and environmental issues.",
  },
];

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    party: "",
    bio: "",
    image: "/placeholder.svg",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddCandidate = () => {
    const candidate = {
      id: String(candidates.length + 1),
      name: newCandidate.name,
      party: newCandidate.party,
      image: newCandidate.image,
      bio: newCandidate.bio,
    };

    setCandidates([...candidates, candidate]);
    setNewCandidate({
      name: "",
      party: "",
      bio: "",
      image: "/placeholder.svg",
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Candidate added successfully",
      description: `${newCandidate.name} has been added as a candidate.`,
    });
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Candidate Management</h2>
          <p className="text-muted-foreground">
            Add and manage election candidates
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>
                Add a new candidate to the election ballot.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Candidate Name</Label>
                <Input
                  id="name"
                  value={newCandidate.name}
                  onChange={(e) =>
                    setNewCandidate({ ...newCandidate, name: e.target.value })
                  }
                  placeholder="Enter candidate's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="party">Party Affiliation</Label>
                <Input
                  id="party"
                  value={newCandidate.party}
                  onChange={(e) =>
                    setNewCandidate({ ...newCandidate, party: e.target.value })
                  }
                  placeholder="Enter party name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Candidate Biography</Label>
                <Input
                  id="bio"
                  value={newCandidate.bio}
                  onChange={(e) =>
                    setNewCandidate({ ...newCandidate, bio: e.target.value })
                  }
                  placeholder="Enter a brief biography"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  value={newCandidate.image}
                  onChange={(e) =>
                    setNewCandidate({ ...newCandidate, image: e.target.value })
                  }
                  placeholder="Enter image URL"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCandidate}
                disabled={!newCandidate.name || !newCandidate.party}
              >
                Add Candidate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {candidates.map((candidate, index) => (
          <Card key={candidate.id} className="animate-in" style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="h-20 w-20 overflow-hidden rounded-full bg-muted">
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" /> View Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Remove Candidate
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="mt-4">{candidate.name}</CardTitle>
              <CardDescription>{candidate.party}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{candidate.bio}</p>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between text-sm">
                <span className="text-muted-foreground">ID: {candidate.id}</span>
                <span className="flex items-center text-primary">
                  <Check className="mr-1 h-4 w-4" /> Verified
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidateManagement;
