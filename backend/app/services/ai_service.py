from app.ai.agent import agent


class AIService:
    """
    Service layer between the API and the UNMORPH SENTINEL agent.
    """

    def analyze_incident(self, description: str) -> dict:
        return agent.analyze_incident(description)


ai_service = AIService()
