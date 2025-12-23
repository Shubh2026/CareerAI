import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Analyze from "@/pages/Analyze";
import Results from "@/pages/Results";

function Router() {
  return (
   <Switch>
  <Route path="/">
    <Home />
  </Route>

  <Route path="/analyze">
    <Analyze />
  </Route>

  <Route path="/results">
    <Results />
  </Route>

  <Route>
    <NotFound />
  </Route>
</Switch>

  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
