import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; // Import React Router DOM
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/NotFound";
import WelcomePage from "./pages/WelcomePage";
import { ThemeProvider } from "./providers/theme-provider";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import DatabaseForm from "./pages/Database";
import ForecastsPage from "./pages/ForecastPage";
import ReportPage from './pages/ReportPage';
import NotificationsPage from "./pages/NotificationsPage";
import { ReportProvider } from './ReportContext';
import SocketManager from "./socketManager";

// Define the type for queryData
type QueryData = {
  [key: string]: any[];
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

function App() {
  const [queryData, setQueryData] = useState<QueryData>({});

  // On first load, fetch data from localStorage
  useEffect(() => {
    const storedData: QueryData = {};
    Object.keys(localStorage).forEach((key) => {
      try {
        const value = localStorage.getItem(key);
        const parsed = JSON.parse(value || "");
        if (Array.isArray(parsed)) storedData[key] = parsed;
      } catch {}
    });
    setQueryData(storedData);
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          <Router>
            <ReportProvider>
              <SocketManager setQueryData={setQueryData} /> {/* 👈 Moved here */}
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/home" element={<Dashboard queryData={queryData} />} />
                <Route path="/login" element={<AuthPage isLogin={true} />} />
                <Route path="/signup" element={<AuthPage isLogin={false} />} />
                <Route path="/database" element={<DatabaseForm />} />
                <Route path="/forecasts" element={<ForecastsPage />} />
                <Route path="/reports" element={<ReportPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ReportProvider>
          </Router>
          <Toaster />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default App;