class SeverityService:
    """
    Provides a simple AI-assisted severity assessment
    for the UNMORPH SENTINEL Phase 1 prototype.

    This is not a legal, medical, or professional risk assessment.
    """

    def assess(
        self,
        description: str,
        incident_type: str | None = None,
        evidence_count: int = 0,
    ) -> dict:

        text = description.lower()
        score = 0
        reasons = []

        if incident_type in {
            "Threat / Blackmail",
            "Manipulated / Morphed Image",
        }:
            score += 3
            reasons.append("Incident type may involve significant victim impact.")

        if incident_type == "Online Harassment":
            score += 2
            reasons.append("Repeated or targeted harassment may increase severity.")

        if incident_type == "Impersonation":
            score += 2
            reasons.append("Identity impersonation can affect the victim and their contacts.")

        if any(word in text for word in [
            "money",
            "payment",
            "financial loss",
            "bank",
            "otp",
        ]):
            score += 3
            reasons.append("Possible financial or account-related risk detected.")

        if any(word in text for word in [
            "threat",
            "blackmail",
            "violence",
            "suicide",
        ]):
            score += 4
            reasons.append("Potentially serious safety-related language detected.")

        if evidence_count > 0:
            score += 1
            reasons.append("Supporting evidence has been provided.")

        if score >= 7:
            level = "Critical"
        elif score >= 5:
            level = "High"
        elif score >= 3:
            level = "Medium"
        else:
            level = "Low"

        return {
            "level": level,
            "score": score,
            "reasons": reasons,
            "disclaimer": (
                "This is an AI-assisted prototype assessment and "
                "does not determine legal severity or official case priority."
            ),
        }


severity_service = SeverityService()
