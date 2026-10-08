import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import StartCase from "./pages/StartCase";
import CaseInterview from "./pages/CaseInterview";
import EvidenceVault from "./pages/EvidenceVault";
import EvidenceAnalysis from "./pages/EvidenceAnalysis";
import MissingInformation from "./pages/MissingInformation";
import Timeline from "./pages/Timeline";
import Severity from "./pages/Severity";
import Dashboard from "./pages/Dashboard";
import Review from "./pages/Review";
import Report from "./pages/Report";
import ReportingGuidance from "./pages/ReportingGuidance";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/start-case" element={<StartCase />} />

      <Route
        path="/case/:caseId/interview"
        element={<CaseInterview />}
      />

      <Route
        path="/case/:caseId/evidence"
        element={<EvidenceVault />}
      />

      <Route
        path="/case/:caseId/evidence-analysis"
        element={<EvidenceAnalysis />}
      />

      <Route
        path="/case/:caseId/missing-information"
        element={<MissingInformation />}
      />

      <Route
        path="/case/:caseId/timeline"
        element={<Timeline />}
      />

      <Route
        path="/case/:caseId/severity"
        element={<Severity />}
      />

      <Route
        path="/case/:caseId/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/case/:caseId/review"
        element={<Review />}
      />

      <Route
        path="/case/:caseId/report"
        element={<Report />}
      />

      <Route
        path="/case/:caseId/reporting-guidance"
        element={<ReportingGuidance />}
      />
    </Routes>
  );
}

export default App;
