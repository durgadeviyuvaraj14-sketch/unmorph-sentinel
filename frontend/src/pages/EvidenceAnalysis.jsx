import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Brain,
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

function EvidenceAnalysis() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

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
    setEvidence(parsedCase.evidence || []);
  }, [caseId, navigate]);

  const runAnalysis = () => {
    setAnalyzing(true);

    setTimeout(() => {
      const analyzedEvidence = evidence.map((item) => ({
        ...item,
        analysisStatus: "Analyzed",
        findings:
          item.type === "Image"
            ? "Image evidence available for further review. OCR and visual analysis can be connected in the backend."
            : "File collected successfully. Content can be analyzed by the backend evidence-processing service.",
      }));

      const updatedCase = {
        ...caseData,
        evidence: analyzedEvidence,
        status: "Evidence Analyzed",
      };

      localStorage.setItem(
        `unmorph-case-${caseId}`,
        JSON.stringify(updatedCase)
      );

      setCaseData(updatedCase);
      setEvidence(analyzedEvidence);

      setAnalyzing(false);
      setAnalysisComplete(true);
    }, 1500);
  };

  const continueToMissingInformation = () => {
    navigate(`/case/${caseId}/missing-information`);
  };

  if (!caseData) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Loading evidence analysis...</p>
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
          <h1>Evidence Analysis</h1>

          <p>
            UNMORPH SENTINEL reviews the collected evidence and
            identifies information that may be useful for organizing
            the case.
          </p>
        </div>

        <div className="ai-box" style={{ marginBottom: "20px" }}>
          <div className="ai-label">
            AI-Assisted Evidence Intelligence
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
              <strong>Evidence analysis stage</strong>

              <p style={{ marginTop: "7px" }}>
                The prototype currently demonstrates the analysis
                workflow. OCR, metadata extraction, and deeper AI
                analysis will be connected through the backend.
              </p>
            </div>
          </div>
        </div>

        {evidence.length === 0 ? (
          <div className="card">
            <AlertTriangle size={28} />

            <h2 style={{ marginTop: "12px" }}>
              No evidence available
            </h2>

            <p style={{ marginTop: "8px" }}>
              You can continue, but adding supporting evidence will
              make the case more useful.
            </p>
          </div>
        ) : (
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2>Evidence Items</h2>

                <p style={{ marginTop: "5px" }}>
                  {evidence.length} item
                  {evidence.length !== 1 ? "s" : ""} ready for
                  analysis.
                </p>
              </div>

              {!analysisComplete && (
                <button
                  className="btn btn-primary"
                  onClick={runAnalysis}
                  disabled={analyzing}
                >
                  <FileSearch size={17} />

                  {analyzing
                    ? "Analyzing..."
                    : "Analyze Evidence"}
                </button>
              )}
            </div>

            {evidence.map((item) => (
              <div
                className="evidence-item"
                key={item.id}
              >
                <div>
                  <div className="evidence-name">
                    {item.name}
                  </div>

                  <div className="evidence-meta">
                    {item.type}
                  </div>

                  {item.findings && (
                    <p style={{ marginTop: "8px" }}>
                      {item.findings}
                    </p>
                  )}
                </div>

                <div>
                  {item.analysisStatus === "Analyzed" ? (
                    <span className="status status-low">
                      <CheckCircle2
                        size={14}
                        style={{ marginRight: "5px" }}
                      />
                      Analyzed
                    </span>
                  ) : (
                    <span className="status status-medium">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {analysisComplete && (
          <div
            className="alert alert-success"
            style={{ marginTop: "20px" }}
          >
            <strong>Analysis completed.</strong>{" "}
            The collected evidence has been marked as analyzed
            and the case can now be checked for missing information.
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "25px",
          }}
        >
          <button
            className="btn btn-primary"
            onClick={continueToMissingInformation}
          >
            Continue
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>
          AI-assisted analysis is for case organization and does not
          replace professional digital forensic examination.
        </p>
      </footer>
    </div>
  );
}

export default EvidenceAnalysis;
