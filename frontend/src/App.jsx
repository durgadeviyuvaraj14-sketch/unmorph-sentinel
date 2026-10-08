import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import StartCase from "./pages/StartCase";
import CaseInterview from "./pages/CaseInterview";
import EvidenceVault from "./pages/EvidenceVault";
import EvidenceAnalysis from "./pages/EvidenceAnalysis";
import MissingInformation from "./pages/MissingInformation";
import Timeline from "./pages/Timeline";
import Severity from "./pages/Severity";
import CaseDashboard from "./pages/CaseDashboard";
import HumanReview from "./pages/HumanReview";
import CaseReport from "./pages/CaseReport";
import ReportingGuidance from "./pages/ReportingGuidance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Start a new case */}
        <Route path="/start-case" element={<StartCase />} />

        {/* Case workflow */}
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
          element={<CaseDashboard />}
        />

        <Route
          path="/case/:caseId/review"
          element={<HumanReview />}
        />

        <Route
          path="/case/:caseId/report"
          element={<CaseReport />}
        />

        <Route
          path="/case/:caseId/reporting"
          element={<ReportingGuidance />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div className="page-container">
              <div className="card">
                <h1>Page Not Found</h1>
                <p>
                  The page you are looking for does not exist.
                </p>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
