import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bot,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

const questionSets = {
  Impersonation: [
    "Where did you first notice the impersonation?",
    "What name, photograph, username, or other identity information is being used?",
    "Has the impersonating account contacted you or other people?",
    "Do you have screenshots or links to the impersonating account?",
  ],

  "Online Harassment": [
    "Which platform or service is being used?",
    "What type of messages or content are you receiving?",
    "When did the harassment begin?",
    "Do you have screenshots, messages, usernames, or profile links?",
  ],

  "Threat / Blackmail": [
    "What type of threat or blackmail was made?",
    "When did the person first contact you?",
    "Is the person demanding money, content, or another action?",
    "Do you have screenshots, messages, usernames, phone numbers, or links?",
  ],

  "Phishing / Scam": [
    "How did the suspicious message, link, or offer reach you?",
    "What platform or communication method was used?",
    "Did you provide any information or interact with the link?",
    "Do you have the original message, email, phone number, or URL?",
  ],

  "Manipulated / Morphed Image": [
    "Where did you discover the manipulated or morphed image?",
    "Do you know who may have created or shared it?",
    "Where has the image been shared?",
    "Do you have the original image and the manipulated version?",
  ],

  Other: [
    "Which platform, website, application, or communication channel is involved?",
    "When did you first notice the incident?",
    "Who appears to be involved?",
    "What evidence do you currently have?",
  ],
};

function CaseInterview() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answer, setAnswer] = useState("");

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

    const detectedType =
      parsedCase.incidentType || detectIncidentType(parsedCase.description);

    setQuestions(
      questionSets[detectedType] || questionSets.Other
    );
  }, [caseId, navigate]);

  const detectIncidentType = (description) => {
    const text = description.toLowerCase();

    if (
      text.includes("fake account") ||
      text.includes("pretending to be me") ||
      text.includes("impersonat")
    ) {
      return "Impersonation";
    }

    if (
      text.includes("harass") ||
      text.includes("abuse") ||
      text.includes("repeated messages")
    ) {
      return "Online Harassment";
    }

    if (
      text.includes("blackmail") ||
      text.includes("threat") ||
      text.includes("threatening")
    ) {
      return "Threat / Blackmail";
    }

    if (
      text.includes("phishing") ||
      text.includes("scam") ||
      text.includes("suspicious link")
    ) {
      return "Phishing / Scam";
    }

    if (
      text.includes("morphed") ||
      text.includes("manipulated image") ||
      text.includes("edited image")
    ) {
      return "Manipulated / Morphed Image";
    }

    return "Other";
  };

  const handleNext = () => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion]: answer,
    };

    setAnswers(updatedAnswers);
    setAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    const updatedCase = {
      ...caseData,
      interviewAnswers: updatedAnswers,
      status: "Interview Completed",
      incidentType:
        caseData.incidentType ||
        detectIncidentType(caseData.description),
    };

    localStorage.setItem(
      `unmorph-case-${caseId}`,
      JSON.stringify(updatedCase)
    );

    navigate(`/case/${caseId}/evidence`);
  };

  if (!caseData || questions.length === 0) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Preparing your AI-assisted case interview...</p>
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
          <h1>AI-Assisted Case Interview</h1>

          <p>
            UNMORPH SENTINEL is asking a few context-specific questions
            to understand the incident and determine what information
            may be useful for the case.
          </p>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <div className="ai-box">
              <div className="ai-label">
                Agentic AI Orchestrator
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <Bot size={28} />

                <div>
                  <strong>
                    I have reviewed your initial description.
                  </strong>

                  <p style={{ marginTop: "8px" }}>
                    Based on the information provided, I am asking
                    questions that may help organize your case.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "25px" }}>
              <div className="status status-medium">
                AI-assisted assessment
              </div>

              <h2 style={{ marginTop: "14px" }}>
                Possible Incident Type
              </h2>

              <p style={{ marginTop: "8px" }}>
                {caseData.incidentType ||
                  detectIncidentType(caseData.description)}
              </p>
            </div>

            <div style={{ marginTop: "25px" }}>
              <h3>Initial Description</h3>

              <p style={{ marginTop: "8px" }}>
                {caseData.description}
              </p>
            </div>
          </div>

          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <MessageSquare size={22} />

              <strong>
                Question {currentQuestion + 1} of{" "}
                {questions.length}
              </strong>
            </div>

            <div className="form-group">
              <label>
                {questions[currentQuestion]}
              </label>

              <textarea
                className="textarea"
                placeholder="Type your answer here..."
                value={answer}
                onChange={(event) =>
                  setAnswer(event.target.value)
                }
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={handleNext}
            >
              {currentQuestion === questions.length - 1
                ? "Continue to Evidence"
                : "Next Question"}

              <ArrowRight size={17} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                marginTop: "18px",
                color: "#687387",
                fontSize: "12px",
              }}
            >
              <ShieldCheck size={15} />

              <span>
                Only provide information relevant to the incident.
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>
          UNMORPH SENTINEL assists with case preparation. Official
          investigation and reporting remain with authorized authorities.
        </p>
      </footer>
    </div>
  );
}

export default CaseInterview;
