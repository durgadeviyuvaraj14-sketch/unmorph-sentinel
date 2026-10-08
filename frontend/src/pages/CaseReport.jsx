import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FileText,
  Download,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

function CaseReport() {
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

    const parsedCase = JSON.parse(storedCase);

    setCaseData(parsedCase);
  }, [caseId, navigate]);

  const generateTextReport = () => {
    if (!caseData) {
      return;
    }

    const evidence = caseData.evidence || [];
    const timeline = caseData.timeline || [];
    const severity = caseData.severity;

    let report = "";

    report += "UNMORPH SENTINEL\n";
    report += "EVIDENCE-READY CYBER INCIDENT CASE REPORT\n";
    report += "============================================\n\n";

    report += `Case ID: ${caseId}\n`;
    report += `Generated: ${new Date().toLocaleString()}\n`;
    report += `Status: ${caseData.status || "Prepared"}\n\n`;

    report += "1. INCIDENT INFORMATION\n";
    report += "------------------------\n";
    report += `Incident Type: ${
      caseData.incidentType || "Not confirmed"
    }\n\n`;

    report += "Incident Description:\n";
    report += `${caseData.description || "Not provided"}\n\n`;

    report += "2. AI-ASSISTED SEVERITY ASSESSMENT\n";
    report += "-----------------------------------\n";
    report += `Severity: ${
      severity?.level || "Not assessed"
    }\n`;
    report += `Assessment Score: ${
      severity?.score ?? "N/A"
    }\n\n`;

    if (severity?.reasons?.length) {
      report += "Assessment Factors:\n";

      severity.reasons.forEach((reason, index) => {
        report += `${index + 1}. ${reason}\n`;
      });

      report += "\n";
    }

    report += "3. EVIDENCE INVENTORY\n";
    report += "----------------------\n";

    if (evidence.length === 0) {
      report += "No evidence items were collected.\n\n";
    } else {
      evidence.forEach((item, index) => {
        report += `${index + 1}. ${item.name}\n`;
        report += `   Type: ${item.type}\n`;
        report += `   Status: ${item.analysisStatus || "Pending"}\n`;
        report += `   Hash: ${item.hash || "Not available"}\n\n`;
      });
    }

    report += "4. INCIDENT TIMELINE\n";
    report += "--------------------\n";

    if (timeline.length === 0) {
      report += "No timeline events recorded.\n\n";
    } else {
      timeline.forEach((event, index) => {
        report += `${index + 1}. ${event.title}\n`;
        report += `   Date: ${event.date}\n`;
        report += `   Details: ${event.description}\n\n`;
      });
    }

    report += "5. AI-ASSISTED INTERVIEW\n";
    report += "------------------------\n";

    if (
      caseData.interviewAnswers &&
      Object.keys(caseData.interviewAnswers).length > 0
    ) {
      Object.entries(caseData.interviewAnswers).forEach(
        ([questionNumber, answer]) => {
          report += `Question ${Number(questionNumber) + 1}:\n`;
          report += `${answer || "No answer provided"}\n\n`;
        }
      );
    } else {
      report += "No interview responses recorded.\n\n";
    }

    report += "6. MISSING INFORMATION\n";
    report += "----------------------\n";

    if (
      caseData.missingInformation &&
      caseData.missingInformation.length > 0
    ) {
      caseData.missingInformation.forEach(
        (item, index) => {
          report += `${index + 1}. ${item}\n`;
        }
      );
    } else {
      report += "No major missing items detected.\n";
    }

    report += "\n7. HUMAN REVIEW\n";
    report += "----------------\n";
    report += `Reviewed: ${
      caseData.humanReviewed ? "Yes" : "No"
    }\n`;

    if (caseData.reviewedAt) {
      report += `Reviewed At: ${new Date(
        caseData.reviewedAt
      ).toLocaleString()}\n`;
    }

    report += "\n8. REPORTING GUIDANCE\n";
    report += "--------------------\n";
    report +=
      "This report is intended to help organize information before official reporting. Users should submit the incident through the appropriate official cybercrime reporting channel.\n\n";

    report += "DISCLAIMER\n";
    report += "----------\n";
    report +=
      "UNMORPH SENTINEL is an AI-assisted case preparation tool. It does not replace law enforcement, official cybercrime reporting portals, professional digital forensic examination, or legal advice.\n";

    const blob = new Blob([report], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `UNMORPH-SENTINEL-${caseId}-Report.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const goToReportingGuidance = () => {
    navigate(`/case/${caseId}/reporting`);
  };

  if (!caseData) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Preparing case report...</p>
        </div>
      </div>
    );
  }

  const evidence = caseData.evidence || [];
  const timeline = caseData.timeline || [];

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
          <h1>Evidence-Ready Case Report</h1>

          <p>
            Review the structured case information and download a
            copy before proceeding to official reporting guidance.
          </p>
        </div>

        <div className="alert alert-success">
          <ShieldCheck size={18} />

          <strong>
            Human review completed:
          </strong>

          <span>
            The case has been reviewed before report generation.
          </span>
        </div>

        <div className="card report-preview">
          <div className="report-header">
            <div>
              <div className="logo">
                UNMORPH <span>SENTINEL</span>
              </div>

              <h2 style={{ marginTop: "15px" }}>
                Evidence-Ready Cyber Incident Case Report
              </h2>
            </div>

            <FileText size={35} />
          </div>

          <div className="report-section">
            <h3>Case Information</h3>

            <p>
              <strong>Case ID:</strong> {caseId}
            </p>

            <p>
              <strong>Incident Type:</strong>{" "}
              {caseData.incidentType || "Not confirmed"}
            </p>

            <p>
              <strong>Severity:</strong>{" "}
              {caseData.severity?.level || "Not assessed"}
            </p>
          </div>

          <div className="report-section">
            <h3>Incident Description</h3>

            <p>
              {caseData.description ||
                "No description provided."}
            </p>
          </div>

          <div className="report-section">
            <h3>Evidence Summary</h3>

            <p>
              {evidence.length} evidence item
              {evidence.length !== 1 ? "s" : ""} collected.
            </p>

            {evidence.map((item) => (
              <div
                key={item.id}
                className="report-list-item"
              >
                <strong>{item.name}</strong>

                <span>
                  {item.type} ·{" "}
                  {item.analysisStatus || "Pending"}
                </span>
              </div>
            ))}
          </div>

          <div className="report-section">
            <h3>Timeline Summary</h3>

            {timeline.length === 0 ? (
              <p>No timeline events recorded.</p>
            ) : (
              timeline.map((event) => (
                <div
                  key={event.id}
                  className="report-list-item"
                >
                  <strong>{event.title}</strong>

                  <span>
                    {event.date}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="report-section">
            <h3>AI-Assisted Severity Factors</h3>

            {caseData.severity?.reasons?.length ? (
              <ul>
                {caseData.severity.reasons.map(
                  (reason, index) => (
                    <li key={index}>{reason}</li>
                  )
                )}
              </ul>
            ) : (
              <p>
                No severity factors available.
              </p>
            )}
          </div>

          <div className="report-section">
            <h3>Disclaimer</h3>

            <p>
              UNMORPH SENTINEL provides AI-assisted case
              preparation and evidence organization. It does not
              replace law enforcement, official reporting portals,
              professional digital forensic examination, or legal
              advice.
            </p>
          </div>
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
            onClick={generateTextReport}
          >
            <Download size={17} />
            Download Report
          </button>

          <button
            className="btn btn-primary"
            onClick={goToReportingGuidance}
          >
            Continue to Reporting Guidance
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>
          The generated report is a case-preparation document and
          should be reviewed before official submission.
        </p>
      </footer>
    </div>
  );
}

export default CaseReport;
