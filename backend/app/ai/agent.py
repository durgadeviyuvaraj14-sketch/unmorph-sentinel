from typing import Any


class UnmorphAgent:
    """
    Main Agentic AI orchestrator for UNMORPH SENTINEL.

    Phase 1 uses deterministic/local logic so the prototype
    does not require a paid AI API.
    """

    def analyze_incident(self, description: str) -> dict[str, Any]:
        incident_type = self._detect_incident_type(description)

        return {
            "incident_type": incident_type,
            "summary": self._generate_summary(incident_type),
            "next_action": "Ask context-specific follow-up questions",
            "questions": self._generate_questions(incident_type),
        }

    def _detect_incident_type(self, description: str) -> str:
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

    def _generate_summary(self, incident_type: str) -> str:
        return (
            f"The reported incident appears to be related to "
            f"{incident_type.lower()}."
        )

    def _generate_questions(self, incident_type: str) -> list[str]:
        questions = {
            "Impersonation": [
                "Which platform is being used for the impersonation?",
                "Do you have the fake profile URL or username?",
                "When did you first notice the fake account?",
                "Has the account contacted anyone you know?",
            ],
            "Online Harassment": [
                "Which platform or communication channel is involved?",
                "When did the harassment begin?",
                "Do you have screenshots or message records?",
                "Is the activity still happening?",
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
                "Do you have the original message or URL?",
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


agent = UnmorphAgent()
