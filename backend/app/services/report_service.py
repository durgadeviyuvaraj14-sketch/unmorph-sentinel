from datetime import datetime


class ReportService:
    """
    Generates a structured evidence-ready case report.
    """

    def generate_report(self, case: dict) -> dict:
        return {
            "report_title": "UNMORPH SENTINEL — Evidence-Ready Case Report",
            "generated_at": datetime.utcnow().isoformat(),

            "case_id": case.get("case_id"),
            "incident_type": case.get("incident_type"),
            "description": case.get("description"),

            "severity": case.get("severity"),

            "evidence": case.get(
                "evidence",
                [],
            ),

            "timeline": case.get(
                "timeline",
                [],
            ),

            "missing_information": case.get(
                "missing_information",
                [],
            ),

            "interview_answers": case.get(
                "interview_answers",
                [],
            ),

            "human_reviewed": case.get(
                "human_reviewed",
                False,
            ),

            "reporting_guidance": (
                "Review the prepared information and use the "
                "appropriate official cybercrime reporting channel."
            ),

            "disclaimer": (
                "This report is AI-assisted and is intended to help "
                "organize information for reporting. It does not "
                "replace law enforcement, investigators, forensic "
                "experts, or legal professionals."
            ),
        }


report_service = ReportService()
