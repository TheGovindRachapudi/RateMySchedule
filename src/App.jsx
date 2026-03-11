import { Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AboutPage from "./pages/AboutPage";
import AppPage from "./pages/AppPage";
import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";
import ScheduleDetailPage from "./pages/ScheduleDetailPage";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/app/results" element={<ResultsPage />} />
        <Route path="/app/results/:id" element={<ScheduleDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}