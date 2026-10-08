import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShieldCheck,
  ExternalLink,
  FileText,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

function ReportingGuidance() {
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

  const openOfficialPortal = () => {
    window.open(
      "https://www.cybercrime.gov.in/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!caseData) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Loading reporting guidance...</p>
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
          <h1>Reporting Guidance</h1>

          <p>
            Your case information has been organized. The next
            step is official reporting through the appropriate
            channel.
          </p>
        </div>

        <div className="alert alert-success">
          <CheckCircle size={18} />

          <span>
            Your evidence-ready case preparation is complete.
          </span>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <div className="ai-box">
              <div className="ai-label">
                <ShieldCheck size={17} />
                UNMORPH SENTINEL
              </div>

              <h2>What we have prepared</h2>

              <ul>
                <li>Incident information</li>
                <li>Context-specific interview responses</li>
                <li>Collected evidence</li>
                <li>Evidence analysis results</li>
                <li>Missing-information assessment</li>
                <li>Chronological timeline</li>
                <li>AI-assisted severity assessment</li>
                <li>Human-reviewed case report</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="ai-label">
              <FileText size={17} />
              Official Reporting
            </div>

            <h2>What happens next?</h2>

            <p>
              UNMORPH SENTINEL does not submit a criminal complaint
              on your behalf. It prepares and organizes information
              so that you can review it before using the appropriate
              official reporting channel.
            </p>

            <p>
              For cybercrime incidents in India, the official
              reporting portal is the National Cyber Crime
              Reporting Portal.
            </p>

            <button
              className="btn btn-primary"
              onClick={openOfficialPortal}
              style={{ marginTop: "15px" }}
            >
              Open Official Cybercrime Portal
              <ExternalLink size={17} />
            </button>
          </div>
        </div>

        <div className="card" style={{ marginTop: "25px" }}>
          <h2>Before submitting your complaint</h2>

          <div className="grid">
            <div className="report-list-item">
              <CheckCircle size={18} />
              <span>
                Review the information in your generated case
                report.
              </span>
            </div>

            <div className="report-list-item">
              <CheckCircle size={18} />
              <span>
                Keep the original evidence files safely stored.
              </span>
            </div>

            <div className="report-list-item">
              <CheckCircle size={18} />
              <span>
                Verify dates, usernames, phone numbers, URLs and
                other important details.
              </span>
            </div>

            <div className="report-list-item">
              <CheckCircle size={18} />
              <span>
                Submit information through the appropriate official
                channel.
              </span>
            </div>
          </div>
        </div>

        <div className="alert alert-warning" style={{ marginTop: "25px" }}>
          <ShieldCheck size={18} />

          <span>
            UNMORPH SENTINEL is an AI-assisted case preparation
            tool. It does not replace law enforcement, official
            cybercrime portals, digital forensic experts, or legal
            professionals.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={() =>
              navigate(`/case/${caseId}/report`)
            }
          >
            <ArrowLeft size={17} />
            Back to Case Report
          </button>

          <button
            className="btn btn-primary"
            onClick={openOfficialPortal}
          >
            Continue to Official Portal
            <ExternalLink size={17} />
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>
          UNMORPH SENTINEL prepares information; official
          authorities handle complaint processing and investigation.
        </p>
      </footer>
    </div>
  );
}

export default ReportingGuidance;
