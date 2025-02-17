import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/dashboard";

// Get the base path from the URL or use "/" for local development
const getBasePath = () => {
  // When deployed to GitHub Pages, the site will be in a subdirectory
  const path = window.location.pathname;
  const base = path.split('/').slice(0, -1).join('/');
  return base || '/';
};

function AppRouter() {
  return (
    <WouterRouter base={getBasePath()}>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;