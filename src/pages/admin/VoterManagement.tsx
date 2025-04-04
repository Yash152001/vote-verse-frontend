
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { CheckCircle, Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Voter {
  id: string;
  name: string;
  voterId: string;
  email: string;
  location: string;
  status: "Registered" | "Pending" | "Voted";
}

const initialVoters: Voter[] = [
  {
    id: "1",
    name: "John Smith",
    voterId: "V-1234",
    email: "john@example.com",
    location: "North District",
    status: "Registered",
  },
  {
    id: "2",
    name: "Maria Garcia",
    voterId: "V-2345",
    email: "maria@example.com",
    location: "South District",
    status: "Voted",
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    voterId: "V-3456",
    email: "ahmed@example.com",
    location: "East District",
    status: "Pending",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    voterId: "V-4567",
    email: "sarah@example.com",
    location: "West District",
    status: "Registered",
  },
  {
    id: "5",
    name: "Li Wei",
    voterId: "V-5678",
    email: "li@example.com",
    location: "Central District",
    status: "Voted",
  },
];

const VoterManagement = () => {
  const [voters, setVoters] = useState<Voter[]>(initialVoters);
  const [searchQuery, setSearchQuery] = useState("");
  const [newVoter, setNewVoter] = useState({
    name: "",
    email: "",
    location: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredVoters = voters.filter((voter) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      voter.name.toLowerCase().includes(query) ||
      voter.email.toLowerCase().includes(query) ||
      voter.voterId.toLowerCase().includes(query) ||
      voter.location.toLowerCase().includes(query)
    );
  });

  const handleAddVoter = () => {
    const newVoterId = `V-${Math.floor(Math.random() * 9000) + 1000}`;
    const voter = {
      id: String(voters.length + 1),
      name: newVoter.name,
      voterId: newVoterId,
      email: newVoter.email,
      location: newVoter.location,
      status: "Pending" as const,
    };
    
    setVoters([...voters, voter]);
    setNewVoter({ name: "", email: "", location: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Voter registered successfully",
      description: `Voter ID ${newVoterId} has been assigned to ${newVoter.name}.`,
    });
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Voter Management</h2>
          <p className="text-muted-foreground">
            Register and manage voters for the election
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Register Voter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Voter</DialogTitle>
              <DialogDescription>
                Add a new voter to the election system. They will receive a unique voter ID.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newVoter.name}
                    onChange={(e) =>
                      setNewVoter({ ...newVoter, name: e.target.value })
                    }
                    placeholder="Enter voter's full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newVoter.email}
                    onChange={(e) =>
                      setNewVoter({ ...newVoter, email: e.target.value })
                    }
                    placeholder="Enter voter's email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newVoter.location}
                    onChange={(e) =>
                      setNewVoter({ ...newVoter, location: e.target.value })
                    }
                    placeholder="Enter voter's district"
                  />
                </div>
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
                onClick={handleAddVoter} 
                disabled={!newVoter.name || !newVoter.email || !newVoter.location}
              >
                Register Voter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Registered Voters</CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-md border px-3 py-1 text-sm">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span>Total: {voters.length} voters</span>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            View and manage all registered voters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 pb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search voters..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Voter ID</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVoters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                      No voters found. Try a different search term.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVoters.map((voter) => (
                    <TableRow key={voter.id}>
                      <TableCell>{voter.name}</TableCell>
                      <TableCell>
                        <code className="rounded bg-muted px-2 py-1 text-xs">
                          {voter.voterId}
                        </code>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {voter.location}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {voter.email}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className={`mr-2 h-2 w-2 rounded-full ${
                              voter.status === "Voted"
                                ? "bg-green-500"
                                : voter.status === "Registered"
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          <span>{voter.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Voter</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Remove Voter
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <div className="text-xs text-muted-foreground">
            Showing {filteredVoters.length} of {voters.length} voters
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VoterManagement;
