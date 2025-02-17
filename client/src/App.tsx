import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/dashboard";

// Get the base path from the URL or use "/" for local development
const getBasePath = () => {
  // When in development or production, handle paths accordingly
  if (window.location.hostname === 'localhost' || window.location.hostname === '0.0.0.0') {
    return '/';
  }

  // For GitHub Pages deployment
  const repoName = import.meta.env.VITE_REPO_NAME || 'GitMergeStats';
  return `/${repoName}`;
};

function AppRouter() {
  const base = getBasePath();

  return (
    <WouterRouter base={base}>
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