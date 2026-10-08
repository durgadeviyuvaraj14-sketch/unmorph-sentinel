import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function HumanReview() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

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

  const handleGenerateReport = () => {
    if (!confirmed) {
      alert(
        "Please confirm that you have reviewed the information before generating the report."
      );
      return;
    }

    const updatedCase = {
      ...caseData,
      humanReviewed: true,
      reviewedAt: new Date().toISOString(),
      status: "Human Review Completed",
    };

    localStorage.setItem(
      `unmorph-case-${caseId}`,
      JSON.stringify(updatedCase)
    );

    navigate(`/case/${caseId}/report`);
  };

  if (!caseData) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Loading human review...</p>
        </div>
      </div>
    );
  }

  const evidence = caseData.evidence || [];
  const timeline = caseData.timeline || [];
  const severity = caseData.severity;

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
          <h1>Human Review</h1>

          <p>
            Review the information collected and the AI-assisted
            findings before generating the final case report.
          </p>
        </div>

        <div className="alert alert-warning">
          <strong>Human review is required.</strong>{" "}
          AI-generated findings may contain mistakes. Confirm that
          the information accurately represents your experience
          before using the report for official reporting.
        </div>

        <div className="card" style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FileText size={23} />

            <h2>Incident Summary</h2>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div className="stat-label">
              Incident Type
            </div>

            <p style={{ marginTop: "5px" }}>
              {caseData.incidentType || "Not confirmed"}
            </p>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div className="stat-label">
              Original Description
            </div>

            <p style={{ marginTop: "5px" }}>
              {caseData.description}
            </p>
          </div>
        </div>

        <div
          className="grid grid-2"
          style={{ marginTop: "20px" }}
        >
          <div className="card">
            <h2>Evidence</h2>

            <p style={{ marginTop: "8px" }}>
              {evidence.length} evidence item
              {evidence.length !== 1 ? "s" : ""} collected.
            </p>

            <div style={{ marginTop: "15px" }}>
              {evidence.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "10px 0",
                    borderBottom:
                      "1px solid #edf0f4",
                  }}
                >
                  <strong>{item.name}</strong>

                  <div className="evidence-meta">
                    {item.type} · {item.analysisStatus}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2>Severity</h2>

            <div
              style={{
                marginTop: "18px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <ShieldCheck size={25} />

              <strong>
                {severity?.level || "Not assessed"}
              </strong>
            </div>

            {severity?.reasons?.length > 0 && (
              <ul
                style={{
                  marginTop: "15px",
                  paddingLeft: "20px",
                }}
              >
                {severity.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="card" style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CheckCircle2 size={23} />

            <h2>Timeline</h2>
          </div>

          {timeline.length === 0 ? (
            <p style={{ marginTop: "15px" }}>
              No timeline events recorded.
            </p>
          ) : (
            <div style={{ marginTop: "15px" }}>
              {timeline.map((event) => (
                <div
                  key={event.id}
                  style={{
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #edf0f4",
                  }}
                >
                  <strong>{event.title}</strong>

                  <div className="evidence-meta">
                    {event.date}
                  </div>

                  <p style={{ marginTop: "5px" }}>
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="card"
          style={{ marginTop: "20px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <AlertTriangle size={24} />

            <div>
              <h2>Before You Generate the Report</h2>

              <p style={{ marginTop: "8px" }}>
                Please make sure that the incident description,
                evidence, timeline, and AI-assisted findings are
                accurate to the best of your knowledge.
              </p>
            </div>
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(event) =>
                setConfirmed(event.target.checked)
              }
              style={{ marginTop: "4px" }}
            />

            <span>
              I have reviewed the information and understand that
              UNMORPH SENTINEL provides AI-assisted case preparation,
              not an official investigation or legal determination.
            </span>
          </label>
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
            onClick={handleGenerateReport}
          >
            Generate Case Report
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>
          Review all information carefully before using the report
          for official reporting.
        </p>
      </footer>
    </div>
  );
}

export default HumanReview;
