import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Upload,
  FileText,
  Image,
  Link as LinkIcon,
  ShieldCheck,
  ArrowRight,
  Trash2,
} from "lucide-react";

function EvidenceVault() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [evidence, setEvidence] = useState([]);

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

    if (parsedCase.evidence) {
      setEvidence(parsedCase.evidence);
    }
  }, [caseId, navigate]);

  const calculateDemoHash = (file) => {
    /*
      This is a frontend demonstration placeholder.

      The real Phase 1 implementation will calculate SHA-256
      in the backend using Python's hashlib library.
    */

    const base = `${file.name}-${file.size}-${file.lastModified}`;

    return `SHA256-DEMO-${btoa(base)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 32)}`;
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      return;
    }

    const newEvidence = files.map((file) => {
      const extension = file.name
        .split(".")
        .pop()
        .toLowerCase();

      let type = "Document";

      if (
        ["png", "jpg", "jpeg", "gif", "webp"].includes(
          extension
        )
      ) {
        type = "Image";
      }

      if (["pdf", "doc", "docx", "txt"].includes(extension)) {
        type = "Document";
      }

      return {
        id: `EVD-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 7)}`,

        name: file.name,

        type,

        size: file.size,

        uploadedAt: new Date().toISOString(),

        hash: calculateDemoHash(file),

        status: "Collected",

        analysisStatus: "Pending",
      };
    });

    const updatedEvidence = [
      ...evidence,
      ...newEvidence,
    ];

    setEvidence(updatedEvidence);

    const updatedCase = {
      ...caseData,
      evidence: updatedEvidence,
      status: "Evidence Collection",
    };

    localStorage.setItem(
      `unmorph-case-${caseId}`,
      JSON.stringify(updatedCase)
    );

    setCaseData(updatedCase);

    event.target.value = "";
  };

  const removeEvidence = (evidenceId) => {
    const updatedEvidence = evidence.filter(
      (item) => item.id !== evidenceId
    );

    setEvidence(updatedEvidence);

    const updatedCase = {
      ...caseData,
      evidence: updatedEvidence,
    };

    localStorage.setItem(
      `unmorph-case-${caseId}`,
      JSON.stringify(updatedCase)
    );

    setCaseData(updatedCase);
  };

  const continueToAnalysis = () => {
    navigate(`/case/${caseId}/evidence-analysis`);
  };

  const getIcon = (type) => {
    if (type === "Image") {
      return <Image size={24} />;
    }

    if (type === "Link") {
      return <LinkIcon size={24} />;
    }

    return <FileText size={24} />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "0 KB";
    }

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }

    const mb = kb / 1024;

    return `${mb.toFixed(1)} MB`;
  };

  if (!caseData) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Loading evidence vault...</p>
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
          <h1>Evidence Vault</h1>

          <p>
            Add screenshots, images, documents, URLs, messages,
            or other information that may help explain the incident.
          </p>
        </div>

        <div className="alert alert-info">
          <strong>Evidence handling:</strong> Files added here are
          currently stored only in the browser prototype. The backend
          will later provide proper secure storage, SHA-256 hashing,
          access control, and audit logging.
        </div>

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
              <h2>Collected Evidence</h2>

              <p style={{ marginTop: "5px" }}>
                {evidence.length} evidence item
                {evidence.length !== 1 ? "s" : ""} collected
              </p>
            </div>

            <label className="btn btn-primary">
              <Upload size={17} />

              Add Evidence

              <input
                type="file"
                multiple
                hidden
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {evidence.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
                border: "2px dashed #dce1ea",
                borderRadius: "12px",
              }}
            >
              <Upload
                size={38}
                style={{
                  marginBottom: "12px",
                  opacity: 0.6,
                }}
              />

              <h3>No evidence added yet</h3>

              <p style={{ marginTop: "8px" }}>
                Add screenshots, images, PDFs, documents, or other
                supporting files.
              </p>
            </div>
          ) : (
            <div>
              {evidence.map((item) => (
                <div
                  className="evidence-item"
                  key={item.id}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: "#f0f3ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#4657c7",
                      }}
                    >
                      {getIcon(item.type)}
                    </div>

                    <div>
                      <div className="evidence-name">
                        {item.name}
                      </div>

                      <div className="evidence-meta">
                        {item.type} ·{" "}
                        {formatFileSize(item.size)}
                      </div>

                      <div
                        className="evidence-meta"
                        style={{
                          fontFamily: "monospace",
                          wordBreak: "break-all",
                        }}
                      >
                        {item.hash}
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-secondary"
                    onClick={() => removeEvidence(item.id)}
                    title="Remove evidence"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-2" style={{ marginTop: "20px" }}>
          <div className="card">
            <ShieldCheck size={25} />

            <h2 style={{ marginTop: "12px" }}>
              Evidence Integrity
            </h2>

            <p>
              Each uploaded item receives a demonstration hash
              identifier. In the backend implementation, SHA-256
              will be used to verify file integrity.
            </p>
          </div>

          <div className="card">
            <FileText size={25} />

            <h2 style={{ marginTop: "12px" }}>
              Evidence Organization
            </h2>

            <p>
              Evidence is linked to this case so that it can later
              be analyzed, placed on the timeline, and included in
              the generated case report.
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
            onClick={continueToAnalysis}
          >
            Continue to Evidence Analysis
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>
          UNMORPH SENTINEL helps organize evidence for human review
          and official reporting.
        </p>
      </footer>
    </div>
  );
}

export default EvidenceVault;
