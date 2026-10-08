import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Clock3,
  Plus,
  Trash2,
  ArrowRight,
} from "lucide-react";

function Timeline() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [events, setEvents] = useState([]);

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

    if (parsedCase.timeline) {
      setEvents(parsedCase.timeline);
    } else {
      createInitialEvents(parsedCase);
    }
  }, [caseId, navigate]);

  const createInitialEvents = (data) => {
    const initialEvents = [];

    if (data.createdAt) {
      initialEvents.push({
        id: `EVENT-${Date.now()}-1`,
        date: data.createdAt,
        title: "Case Created",
        description:
          "The incident was initially reported to UNMORPH SENTINEL.",
      });
    }

    if (data.interviewAnswers) {
      initialEvents.push({
        id: `EVENT-${Date.now()}-2`,
        date: new Date().toISOString(),
        title: "AI-Assisted Interview Completed",
        description:
          "Context-specific questions were answered to collect additional incident information.",
      });
    }

    if (data.evidence?.length > 0) {
      initialEvents.push({
        id: `EVENT-${Date.now()}-3`,
        date: new Date().toISOString(),
        title: "Evidence Collected",
        description: `${data.evidence.length} evidence item(s) were added to the case.`,
      });
    }

    setEvents(initialEvents);
  };

  const saveTimeline = (updatedEvents) => {
    const updatedCase = {
      ...caseData,
      timeline: updatedEvents,
      status: "Timeline Created",
    };

    localStorage.setItem(
      `unmorph-case-${caseId}`,
      JSON.stringify(updatedCase)
    );

    setCaseData(updatedCase);
    setEvents(updatedEvents);
  };

  const addEvent = () => {
    if (!date || !title.trim()) {
      alert("Please provide a date and event title.");
      return;
    }

    const newEvent = {
      id: `EVENT-${Date.now()}`,
      date,
      title,
      description:
        description.trim() || "No additional description provided.",
    };

    const updatedEvents = [...events, newEvent].sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

    saveTimeline(updatedEvents);

    setDate("");
    setTitle("");
    setDescription("");
  };

  const removeEvent = (eventId) => {
    const updatedEvents = events.filter(
      (event) => event.id !== eventId
    );

    saveTimeline(updatedEvents);
  };

  const continueToSeverity = () => {
    saveTimeline(events);

    navigate(`/case/${caseId}/severity`);
  };

  const formatDate = (dateValue) => {
    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return dateValue;
    }

    return parsedDate.toLocaleString();
  };

  if (!caseData) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Preparing incident timeline...</p>
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
          <h1>Incident Timeline</h1>

          <p>
            Organize the known events in chronological order.
            A clear timeline can help explain how the incident
            developed.
          </p>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <Plus size={22} />

              <h2>Add Timeline Event</h2>
            </div>

            <div className="form-group">
              <label htmlFor="eventDate">
                Date and Time
              </label>

              <input
                id="eventDate"
                type="datetime-local"
                className="input"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventTitle">
                Event
              </label>

              <input
                id="eventTitle"
                type="text"
                className="input"
                placeholder="Example: First suspicious message received"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventDescription">
                Description
              </label>

              <textarea
                id="eventDescription"
                className="textarea"
                placeholder="Describe what happened during this event..."
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={addEvent}
            >
              <Plus size={17} />
              Add Event
            </button>
          </div>

          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Clock3 size={23} />

              <h2>Case Timeline</h2>
            </div>

            {events.length === 0 ? (
              <div
                style={{
                  padding: "40px 10px",
                  textAlign: "center",
                }}
              >
                <p>
                  No timeline events have been added yet.
                </p>
              </div>
            ) : (
              <div className="timeline">
                {events.map((event) => (
                  <div
                    className="timeline-item"
                    key={event.id}
                  >
                    <div className="timeline-date">
                      {formatDate(event.date)}
                    </div>

                    <div className="timeline-title">
                      {event.title}
                    </div>

                    <p style={{ marginTop: "6px" }}>
                      {event.description}
                    </p>

                    <button
                      className="btn btn-secondary"
                      style={{
                        marginTop: "10px",
                        padding: "7px 10px",
                      }}
                      onClick={() =>
                        removeEvent(event.id)
                      }
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            onClick={continueToSeverity}
          >
            Continue to Severity Assessment
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>
          Timeline information should be reviewed by the user for
          accuracy before being included in the final report.
        </p>
      </footer>
    </div>
  );
}

export default Timeline;
