import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
} from "lucide-react";

function MissingInformation() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [missingItems, setMissingItems] = useState([]);

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

    checkMissingInformation(parsedCase);
  }, [caseId, navigate]);

  const checkMissingInformation = (data) => {
    const missing = [];

    if (!data.description || data.description.trim() === "") {
      missing.push("Incident description");
    }

    if (!data.incidentType) {
      missing.push("Confirmed incident category");
    }

    if (
      !data.interviewAnswers ||
      Object.keys(data.interviewAnswers).length === 0
    ) {
      missing.push("Incident interview responses");
    }

    if (!data.evidence || data.evidence.length === 0) {
      missing.push(
        "Supporting evidence such as screenshots, files, URLs, or messages"
      );
    }

    setMissingItems(missing);
  };

  const handleContinue = () => {
    const updatedCase = {
      ...caseData,
      missingInformation: missingItems,
      status: "Information Review Completed",
    };

    localStorage.setItem(
      `unmorph-case-${caseId}`,
      JSON.stringify(updatedCase)
    );

    setCaseData(updatedCase);

    navigate(`/case/${caseId}/timeline`);
  };

  if (!caseData) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Checking case information...</p>
        </div>
      </div>
    );
  }

  const hasMissingInformation = missingItems.length > 0;

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
          <h1>Missing Information Check</h1>

          <p>
            Before creating the incident timeline, UNMORPH SENTINEL
            checks whether important case information appears to be
            missing.
          </p>
        </div>

        <div className="ai-box" style={{ marginBottom: "20px" }}>
          <div className="ai-label">
            Agentic AI Case Check
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <ClipboardCheck size={28} />

            <div>
              <strong>
                Reviewing the current case information
              </strong>

              <p style={{ marginTop: "7px" }}>
                This check helps identify information that could make
                the final case report clearer and more complete.
              </p>
            </div>
          </div>
        </div>

        {hasMissingInformation ? (
          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <AlertTriangle size={25} />

              <h2>Potentially Missing Information</h2>
            </div>

            <p style={{ marginBottom: "18px" }}>
              The following information may be useful if it is
              available to you:
            </p>

            {missingItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 0",
                  borderBottom:
                    index === missingItems.length - 1
                      ? "none"
                      : "1px solid #edf0f4",
                }}
              >
                <AlertTriangle size={17} />

                <span>{item}</span>
              </div>
            ))}

            <div
              className="alert alert-warning"
              style={{ marginTop: "20px" }}
            >
              <strong>Important:</strong> A missing item does not
              automatically mean the case cannot be reported.
              Only provide information that is actually available
              to you.
            </div>
          </div>
        ) : (
          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <CheckCircle2 size={28} />

              <h2>No major missing items detected</h2>
            </div>

            <p style={{ marginTop: "12px" }}>
              The current case contains the main information needed
              to continue organizing the incident.
            </p>
          </div>
        )}

        <div className="card" style={{ marginTop: "20px" }}>
          <h2>Current Case Summary</h2>

          <div style={{ marginTop: "18px" }}>
            <strong>Incident Type</strong>

            <p style={{ marginTop: "5px" }}>
              {caseData.incidentType || "Not confirmed"}
            </p>
          </div>

          <div style={{ marginTop: "18px" }}>
            <strong>Evidence Items</strong>

            <p style={{ marginTop: "5px" }}>
              {caseData.evidence?.length || 0}
            </p>
          </div>

          <div style={{ marginTop: "18px" }}>
            <strong>Interview Responses</strong>

            <p style={{ marginTop: "5px" }}>
              {caseData.interviewAnswers
                ? Object.keys(caseData.interviewAnswers).length
                : 0}
            </p>
          </div>
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
            onClick={handleContinue}
          >
            Continue to Timeline
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>
          Missing-information detection is AI-assisted and should
          always be reviewed by the user.
        </p>
      </footer>
    </div>
  );
}

export default MissingInformation;
