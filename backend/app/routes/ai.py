from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)


class IncidentRequest(BaseModel):
    description: str


def detect_incident_type(description: str) -> str:
    text = description.lower()

    if any(word in text for word in [
        "fake account",
        "impersonat",
        "pretending to be me",
        "pretend to be me",
    ]):
        return "Impersonation"

    if any(word in text for word in [
        "harass",
        "abuse",
        "stalking",
        "repeated messages",
    ]):
        return "Online Harassment"

    if any(word in text for word in [
        "blackmail",
        "threat",
        "threatening",
        "extort",
    ]):
        return "Threat / Blackmail"

    if any(word in text for word in [
        "phishing",
        "scam",
        "fraud",
        "otp",
        "suspicious link",
    ]):
        return "Phishing / Scam"

    if any(word in text for word in [
        "morphed",
        "manipulated image",
        "edited photo",
        "fake photo",
        "deepfake",
    ]):
        return "Manipulated / Morphed Image"

    return "Other"


def generate_follow_up_questions(incident_type: str) -> list[str]:
    questions = {
        "Impersonation": [
            "What platform is being used for the impersonation?",
            "Do you have the fake profile URL or username?",
            "When did you first notice the fake account?",
            "Has the account contacted or affected anyone you know?",
        ],
        "Online Harassment": [
            "Which platform or communication channel is involved?",
            "Do you know who is sending the messages?",
            "When did the harassment begin?",
            "Do you have screenshots or message records?",
        ],
        "Threat / Blackmail": [
            "What type of threat or demand was made?",
            "When did you receive the threat?",
            "Do you have the original messages or screenshots?",
            "Has the person contacted you repeatedly?",
        ],
        "Phishing / Scam": [
            "How did you receive the suspicious message or link?",
            "Did you click the link or provide any information?",
            "Do you have the original message, email, or URL?",
            "Was any financial loss involved?",
        ],
        "Manipulated / Morphed Image": [
            "Where was the manipulated image discovered?",
            "Do you have the original and manipulated versions?",
            "When did you first notice the image?",
            "Has the image been shared with other people?",
        ],
        "Other": [
            "Which platform or service was involved?",
            "When did the incident happen?",
            "Do you have screenshots, messages, files, or URLs?",
            "What outcome are you looking for?",
        ],
    }

    return questions.get(incident_type, questions["Other"])


@router.post("/analyze-incident")
def analyze_incident(request: IncidentRequest):
    incident_type = detect_incident_type(request.description)

    questions = generate_follow_up_questions(incident_type)

    return {
        "success": True,
        "incident_type": incident_type,
        "analysis": {
            "summary": (
                f"The reported incident has been classified as "
                f"{incident_type.lower()} based on the information provided."
            ),
            "confidence": "Prototype assessment",
        },
        "follow_up_questions": questions,
        "disclaimer": (
            "This is an AI-assisted prototype assessment and is not "
            "a legal or professional investigation."
        ),
    }
