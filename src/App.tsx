import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import StudentDetails from "./pages/StudentDetails";
import ResumeUpload from "./pages/ResumeUpload";
import Mapping from "./pages/Mapping";
import JobListings from "./pages/JobListings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Layout wraps all main pages */}
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<StudentDetails />} />
            <Route path="/upload" element={<ResumeUpload />} />
            <Route path="/mapping" element={<Mapping />} />
            <Route path="/jobs" element={<JobListings />} />
          </Route>

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
