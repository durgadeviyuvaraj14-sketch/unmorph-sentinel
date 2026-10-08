import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Shield,
  FileText,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

function CaseDashboard() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    const storedCase = localStorage.getItem(
      `unmorph-case-${caseId}`
    );

    if (!storedCase) {
      navigate("/start-case");
      return;
    }

    setCaseData(JSON.parse(storedCase));
  }, [caseId, navigate]);

  const continueToReview = () => {
    navigate(`/case/${caseId}/review`);
  };

  if (!caseData) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Loading case dashboard...</p>
        </div>
      </div>
    );
  }

  const evidenceCount = caseData.evidence?.length || 0;
  const timelineCount = caseData.timeline?.length || 0;
  const interviewCount = caseData.interviewAnswers
    ? Object.keys(caseData.interviewAnswers).length
    : 0;

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="logo">
            UNMORPH <span>SENTINEL</span>
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "#687387",
            }}
          >
            Case: {caseId}
          </div>
        </div>
      </nav>

      <main className="page-container">
        <div className="page-header">
          <h1>Case Dashboard</h1>

          <p>
            Review the information collected so far before generating
            the evidence-ready case report.
          </p>
        </div>

        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#687387",
                }}
              >
                Case ID
              </div>

              <h2 style={{ marginTop: "5px" }}>
                {caseId}
              </h2>
            </div>

            <span className="status status-low">
              {caseData.status || "In Progress"}
            </span>
          </div>
        </div>

        <div
          className="grid grid-4"
          style={{ marginTop: "20px" }}
        >
          <div className="stat-card">
            <FileText size={24} />

            <div className="stat-value">
              {evidenceCount}
            </div>

            <div className="stat-label">
              Evidence Items
            </div>
          </div>

          <div className="stat-card">
            <Clock3 size={24} />

            <div className="stat-value">
              {timelineCount}
            </div>

            <div className="stat-label">
              Timeline Events
            </div>
          </div>

          <div className="stat-card">
            <CheckCircle2 size={24} />

            <div className="stat-value">
              {interviewCount}
            </div>

            <div className="stat-label">
              Interview Answers
            </div>
          </div>

          <div className="stat-card">
            <AlertTriangle size={24} />

            <div className="stat-value">
              {caseData.missingInformation?.length || 0}
            </div>

            <div className="stat-label">
              Missing Items
            </div>
          </div>
        </div>

        <div
          className="grid grid-2"
          style={{ marginTop: "20px" }}
        >
          <div className="card">
            <h2>Incident Overview</h2>

            <div style={{ marginTop: "18px" }}>
              <div className="stat-label">
                Incident Type
              </div>

              <p style={{ marginTop: "5px" }}>
                {caseData.incidentType || "Not confirmed"}
              </p>
            </div>

            <div style={{ marginTop: "18px" }}>
              <div className="stat-label">
                Description
              </div>

              <p style={{ marginTop: "5px" }}>
                {caseData.description}
              </p>
            </div>
          </div>

          <div className="card">
            <h2>Severity</h2>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <Shield size={32} />

              <div>
                <div className="stat-label">
                  AI-Assisted Assessment
                </div>

                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    marginTop: "5px",
                  }}
                >
                  {caseData.severity?.level || "Not assessed"}
                </div>
              </div>
            </div>

            {caseData.severity?.reasons?.length > 0 && (
              <div style={{ marginTop: "18px" }}>
                <div className="stat-label">
                  Main Factors
                </div>

                <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                  {caseData.severity.reasons
                    .slice(0, 3)
                    .map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="card" style={{ marginTop: "20px" }}>
          <h2>Case Preparation Status</h2>

          <div style={{ marginTop: "20px" }}>
            <div className="progress-row">
              <span>Incident Understanding</span>
              <strong>Complete</strong>
            </div>

            <div className="progress-row">
              <span>AI-Assisted Interview</span>
              <strong>Complete</strong>
            </div>

            <div className="progress-row">
              <span>Evidence Collection</span>
              <strong>
                {evidenceCount > 0 ? "Complete" : "Pending"}
              </strong>
            </div>

            <div className="progress-row">
              <span>Evidence Analysis</span>
              <strong>
                {caseData.status === "Evidence Analyzed" ||
                evidenceCount > 0
                  ? "Complete"
                  : "Pending"}
              </strong>
            </div>

            <div className="progress-row">
              <span>Timeline</span>
              <strong>
                {timelineCount > 0 ? "Complete" : "Pending"}
              </strong>
            </div>

            <div className="progress-row">
              <span>Severity Assessment</span>
              <strong>
                {caseData.severity ? "Complete" : "Pending"}
              </strong>
            </div>
          </div>
        </div>

        <div
          className="alert alert-info"
          style={{ marginTop: "20px" }}
        >
          <strong>Human review required:</strong>{" "}
          Review the collected information and AI-assisted findings
          before generating the final case report.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "25px",
          }}
        >
          <button
            className="btn btn-primary"
            onClick={continueToReview}
          >
            Continue to Human Review
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>
          UNMORPH SENTINEL prepares structured information for review.
          Official investigation remains with authorized authorities.
        </p>
      </footer>
    </div>
  );
}

export default CaseDashboard;
