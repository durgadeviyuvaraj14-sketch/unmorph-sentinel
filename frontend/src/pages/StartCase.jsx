import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldAlert } from "lucide-react";

function StartCase() {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [incidentType, setIncidentType] = useState("");

  const incidentTypes = [
    "Impersonation",
    "Online Harassment",
    "Threat / Blackmail",
    "Phishing / Scam",
    "Manipulated / Morphed Image",
    "Other",
  ];

  const handleStartCase = () => {
    if (!description.trim()) {
      alert("Please describe what happened before continuing.");
      return;
    }

    const caseId = `CASE-${Date.now()}`;

    const caseData = {
      caseId,
      description,
      incidentType,
      createdAt: new Date().toISOString(),
      status: "In Progress",
    };

    localStorage.setItem(
      `unmorph-case-${caseId}`,
      JSON.stringify(caseData)
    );

    localStorage.setItem("unmorph-current-case", caseId);

    navigate(`/case/${caseId}/interview`);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="logo">
            UNMORPH <span>SENTINEL</span>
          </div>
        </div>
      </nav>

      <main className="page-container">
        <div className="page-header">
          <h1>Start a New Case</h1>

          <p>
            Tell UNMORPH SENTINEL what happened. You do not need to know
            the exact cybercrime category. The AI will help organize the
            information.
          </p>
        </div>

        <div className="card">
          <div className="alert alert-info">
            <strong>Before you begin:</strong> Only provide information
            that you are comfortable storing in this prototype. Do not
            enter passwords, OTPs, banking PINs, or other sensitive
            authentication credentials.
          </div>

          <div className="form-group">
            <label htmlFor="incidentType">
              Do you know what type of incident this is?
            </label>

            <select
              id="incidentType"
              className="select"
              value={incidentType}
              onChange={(event) =>
                setIncidentType(event.target.value)
              }
            >
              <option value="">
                I'm not sure / Let AI determine
              </option>

              {incidentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              What happened?
            </label>

            <textarea
              id="description"
              className="textarea"
              placeholder="Example: Someone created an Instagram account using my name and photograph and started messaging my friends pretending to be me..."
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
            />
          </div>

          <div className="ai-box">
            <div className="ai-label">
              AI-Assisted Understanding
            </div>

            <p>
              After you continue, UNMORPH SENTINEL will analyze your
              description, identify the likely incident category, and
              ask follow-up questions based on your situation.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              marginTop: "25px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#687387",
                fontSize: "13px",
              }}
            >
              <ShieldAlert size={17} />

              <span>
                This is an educational prototype.
              </span>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleStartCase}
            >
              Continue
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className="footer">
          <p>
            UNMORPH SENTINEL does not replace official cybercrime
            reporting or law-enforcement authorities.
          </p>
        </div>
      </main>
    </div>
  );
}

export default StartCase;
