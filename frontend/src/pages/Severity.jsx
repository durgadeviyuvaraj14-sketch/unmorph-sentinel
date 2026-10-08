import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Brain,
} from "lucide-react";

function Severity() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [severity, setSeverity] = useState(null);

  useEffect(() => {
    const storedCase = localStorage.getItem(
      `unmorph-case-${caseId}`
    );

    if (!storedCase) {
      navigate("/start-case");
      return;
    }

    const parsedCase = JSON.parse(storedCase);

    setCaseData(parsedCase);

    const assessment = calculateSeverity(parsedCase);

    setSeverity(assessment);

    const updatedCase = {
      ...parsedCase,
      severity: assessment,
      status: "Severity Assessed",
    };

    localStorage.setItem(
      `unmorph-case-${caseId}`,
      JSON.stringify(updatedCase)
    );

    setCaseData(updatedCase);
  }, [caseId, navigate]);

  const calculateSeverity = (data) => {
    let score = 0;
    const reasons = [];

    const text = (
      `${data.description || ""} ${data.incidentType || ""}`
    ).toLowerCase();

    if (
      text.includes("blackmail") ||
      text.includes("threat") ||
      text.includes("threatening")
    ) {
      score += 3;
      reasons.push(
        "The incident contains a possible threat or blackmail element."
      );
    }

    if (
      text.includes("money") ||
      text.includes("payment") ||
      text.includes("bank") ||
      text.includes("financial")
    ) {
      score += 3;
      reasons.push(
        "The incident may involve financial risk."
      );
    }

    if (
      text.includes("morphed") ||
      text.includes("manipulated image") ||
      text.includes("private image")
    ) {
      score += 3;
      reasons.push(
        "The incident may involve sensitive or manipulated imagery."
      );
    }

    if (
      data.evidence &&
      data.evidence.length >= 3
    ) {
      score += 1;

      reasons.push(
        "Multiple evidence items have been collected."
      );
    }

    if (
      data.timeline &&
      data.timeline.length >= 3
    ) {
      score += 1;

      reasons.push(
        "The incident contains multiple recorded events."
      );
    }

    let level = "Low";

    if (score >= 6) {
      level = "Critical";
    } else if (score >= 4) {
      level = "High";
    } else if (score >= 2) {
      level = "Medium";
    }

    if (reasons.length === 0) {
      reasons.push(
        "No major high-risk indicators were identified from the currently available information."
      );
    }

    return {
      level,
      score,
      reasons,
      assessedAt: new Date().toISOString(),
      disclaimer:
        "This is an AI-assisted prototype assessment and is not a legal or professional risk determination.",
    };
  };

  const getStatusClass = () => {
    if (!severity) {
      return "status-medium";
    }

    switch (severity.level) {
      case "Critical":
        return "status-critical";

      case "High":
        return "status-high";

      case "Medium":
        return "status-medium";

      default:
        return "status-low";
    }
  };

  const continueToDashboard = () => {
    navigate(`/case/${caseId}/dashboard`);
  };

  if (!caseData || !severity) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Assessing incident severity...</p>
        </div>
      </div>
    );
  }

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
          <h1>AI-Assisted Severity Assessment</h1>

          <p>
            The system reviews the information currently available
            and provides an indicative severity level.
          </p>
        </div>

        <div className="ai-box" style={{ marginBottom: "20px" }}>
          <div className="ai-label">
            AI-Assisted Assessment
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <Brain size={28} />

            <div>
              <strong>
                Severity is based only on available case information.
              </strong>

              <p style={{ marginTop: "7px" }}>
                This assessment can change when additional evidence or
                information is added.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <ShieldAlert size={35} />

              <div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#687387",
                    marginBottom: "5px",
                  }}
                >
                  Current Severity
                </div>

                <span
                  className={`status ${getStatusClass()}`}
                  style={{ fontSize: "15px" }}
                >
                  {severity.level}
                </span>
              </div>
            </div>

            <div style={{ marginTop: "25px" }}>
              <div className="stat-label">
                Assessment Score
              </div>

              <div className="stat-value">
                {severity.score}
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Assessment Factors</h2>

            <div style={{ marginTop: "18px" }}>
              {severity.reasons.map((reason, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "12px 0",
                    borderBottom:
                      index === severity.reasons.length - 1
                        ? "none"
                        : "1px solid #edf0f4",
                  }}
                >
                  <CheckCircle2 size={17} />

                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="alert alert-warning"
          style={{ marginTop: "20px" }}
        >
          <strong>Important:</strong>{" "}
          {severity.disclaimer}
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
            onClick={continueToDashboard}
          >
            Continue to Case Dashboard
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>
          Severity assessment is informational and should not be
          treated as a professional or legal determination.
        </p>
      </footer>
    </div>
  );
}

export default Severity;
