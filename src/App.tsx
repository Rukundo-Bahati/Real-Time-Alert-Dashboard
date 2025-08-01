import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import './App.css'

const queryClient = new QueryClient();

const App = () => (
  // QueryClientProvider  allows components to use hooks like useQuery, useMutation, etc., for data fetching, caching, and syncing.
  // ThemeProvider is for light and dark mode
  //  TooltipProvider for tooltip visibility and interaction across components
  <QueryClientProvider client={queryClient}> 
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem> 
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
