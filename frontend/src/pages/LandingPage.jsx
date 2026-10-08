import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileSearch,
  Brain,
  Clock3,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

function LandingPage() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="logo">
            UNMORPH <span>SENTINEL</span>
          </div>

          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>

            <Link to="/start-case" className="btn btn-primary">
              Start a Case
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              AI-Powered Cyber-Incident Assistance
            </div>

            <h1>
              From a Victim's Story
              <br />
              to an <span>Evidence-Ready Case.</span>
            </h1>

            <p className="hero-subtitle">
              UNMORPH SENTINEL helps victims understand cyber incidents,
              organize digital evidence, identify missing information,
              and prepare a structured case report for official reporting.
            </p>

            <Link to="/start-case" className="btn btn-primary">
              Start a New Case
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section id="features" className="page-container">
          <div className="page-header">
            <h1>What UNMORPH SENTINEL Does</h1>

            <p>
              The system combines AI-assisted incident understanding,
              evidence organization, and case preparation into one workflow.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <Brain size={28} />

              <h2>AI Understanding</h2>

              <p>
                Understands the user's incident description and identifies
                the likely type of cyber incident.
              </p>
            </div>

            <div className="card">
              <FileSearch size={28} />

              <h2>Evidence Intelligence</h2>

              <p>
                Helps collect, analyze, organize, and preserve screenshots,
                files, URLs, messages, and other case information.
              </p>
            </div>

            <div className="card">
              <Clock3 size={28} />

              <h2>Timeline Creation</h2>

              <p>
                Converts available incident information into a chronological
                timeline that is easier to understand and review.
              </p>
            </div>

            <div className="card">
              <ShieldCheck size={28} />

              <h2>Severity Assessment</h2>

              <p>
                Provides an AI-assisted assessment to help the victim
                understand the urgency and seriousness of the incident.
              </p>
            </div>

            <div className="card">
              <LockKeyhole size={28} />

              <h2>Evidence Integrity</h2>

              <p>
                Uses hashing and controlled evidence handling to help
                preserve the integrity of collected files.
              </p>
            </div>

            <div className="card">
              <FileSearch size={28} />

              <h2>Case Report</h2>

              <p>
                Generates a structured case report that the user can review
                before proceeding to official reporting channels.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="page-container">
          <div className="page-header">
            <h1>How It Works</h1>

            <p>
              UNMORPH SENTINEL follows a guided workflow instead of acting
              as a simple chatbot.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <strong>01. Understand</strong>
              <p>
                The user explains what happened and the AI identifies the
                incident context.
              </p>
            </div>

            <div className="card">
              <strong>02. Ask</strong>
              <p>
                The AI asks relevant follow-up questions based on the
                incident.
              </p>
            </div>

            <div className="card">
              <strong>03. Collect</strong>
              <p>
                The user adds screenshots, files, URLs, messages, and other
                available information.
              </p>
            </div>

            <div className="card">
              <strong>04. Analyze</strong>
              <p>
                The system extracts useful information and identifies
                missing details.
              </p>
            </div>

            <div className="card">
              <strong>05. Organize</strong>
              <p>
                Evidence and information are arranged into a structured
                case timeline.
              </p>
            </div>

            <div className="card">
              <strong>06. Generate</strong>
              <p>
                A structured evidence-ready case report is generated for
                human review.
              </p>
            </div>
          </div>
        </section>

        <section className="page-container">
          <div className="card">
            <div className="ai-box">
              <div className="ai-label">Important</div>

              <p>
                UNMORPH SENTINEL does not replace police, cybercrime
                investigators, forensic experts, or official reporting
                portals. It helps users prepare and organize information
                before official reporting.
              </p>
            </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Link to="/start-case" className="btn btn-primary">
                Start Your Case
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          UNMORPH SENTINEL — AI-powered cyber-incident assistance and
          evidence intelligence.
        </p>

        <p style={{ marginTop: "8px" }}>
          Prototype for educational and demonstration purposes.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
