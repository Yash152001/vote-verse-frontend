import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

// Auth Pages
import Login from "./pages/auth/Login";
import AdminRegister from "./pages/auth/AdminRegister";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import VoterManagement from "./pages/admin/VoterManagement";
import CandidateManagement from "./pages/admin/CandidateManagement";
import ElectionSettings from "./pages/admin/ElectionSettings";

// Voter Pages
import VoterLogin from "./pages/voter/VoterLogin";
import VotingBallot from "./pages/voter/VotingBallot";
import VoteConfirmation from "./pages/voter/VoteConfirmation";
import VoteSuccess from "./pages/voter/VoteSuccess";

// Results Page
import Results from "./pages/results/Results";

// Layouts
import AdminLayout from "./components/layouts/AdminLayout";
import VoterLayout from "./components/layouts/VoterLayout";
import BaseLayout from "./components/layouts/BaseLayout";

// Other Pages
import NotFound from "./pages/NotFound";
import Home from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            
            {/* Voter Routes */}
            <Route path="/voter/login" element={<VoterLogin />} />
            <Route element={<VoterLayout />}>
              <Route path="/voter/ballot" element={<VotingBallot />} />
              <Route path="/voter/confirm" element={<VoteConfirmation />} />
              <Route path="/voter/success" element={<VoteSuccess />} />
            </Route>
            
            {/* Admin Routes */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/voters" element={<VoterManagement />} />
              <Route path="/admin/candidates" element={<CandidateManagement />} />
              <Route path="/admin/settings" element={<ElectionSettings />} />
            </Route>
            
            {/* Results Routes */}
            <Route element={<BaseLayout />}>
              <Route path="/results" element={<Results />} />
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
