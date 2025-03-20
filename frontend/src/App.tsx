import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/NotFound";
import WelcomePage from "./pages/WelcomePage";
import { ThemeProvider } from "./providers/theme-provider";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import DatabaseForm from "./pages/Database";
import ForecastsPage from "./pages/ForecastPage";
import ReportPage from './pages/ReportPage'
import NotificationsPage from "./pages/NotificationsPage";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
      <Route path="/home" component={Dashboard} />
      <Route path="/login" component={() => <AuthPage isLogin={true} />} />
      <Route path="/signup" component={() => <AuthPage isLogin={false} />} />
      <Route path="/connect" component={DatabaseForm} />
      <Route path="/forecasts" component={ForecastsPage} />
      <Route path="/reports" component={ReportPage} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          <Router />
          <Toaster />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;