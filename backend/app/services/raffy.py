"""Raffy AI chatbot service for Ryan's Roofing."""

from app.utils.intent_classifier import IntentClassifier


class RaffyService:
    """
    Service for Raffy, the AI chatbot assistant for Ryan's Roofing.
    Handles message processing, intent classification, and response generation.
    """

    def __init__(self) -> None:
        """Initialize Raffy service with intent classifier."""
        self._intent_classifier = IntentClassifier()

    def get_system_prompt(self) -> str:
        """
        Return the system prompt that defines Raffy's personality and behavior.
        """
        return (
            "You are Raffy, the friendly AI assistant for Ryan's Roofing. "
            "You help customers with roofing inquiries, booking appointments, "
            "getting quotes, and emergency roof repairs. Be professional, helpful, "
            "and warm. Always represent Ryan's Roofing positively."
        )

    def generate_response(self, message: str, session_id: str) -> str:
        """
        Generate Raffy's response to a user message.
        Placeholder implementation - will integrate with Anthropic and knowledge base.
        """
        intent = self._intent_classifier.classify(message)

        # Placeholder responses based on intent
        responses = {
            "book": "I'd be happy to help you schedule an appointment! Our team typically has availability within the week. Would you like me to check our calendar?",
            "quote": "Getting a quote is easy! I can help you with that. Could you tell me a bit about your roof—type, approximate size, and what kind of work you need?",
            "emergency": "I understand this is urgent. For emergency roof repairs, please call our 24/7 hotline at (555) 123-ROOF. We'll get someone out as soon as possible!",
            "general": "Thanks for reaching out! I'm here to help with any roofing questions—appointments, quotes, repairs, or general advice. What can I assist you with today?",
        }

        return responses.get(intent, responses["general"])

    async def get_response(self, message: str, session_id: str) -> dict[str, str | list[str]]:
        """
        Process a user message and return Raffy's response with intent and suggestions.

        Args:
            message: The user's message.
            session_id: Session identifier for conversation context.

        Returns:
            Dict with keys: response, intent, suggestions.
        """
        intent = self._intent_classifier.classify(message)
        response = self.generate_response(message, session_id)

        # Placeholder suggestions based on intent
        suggestions_map = {
            "book": ["Schedule for this week", "Check availability", "What services do you offer?"],
            "quote": ["Free estimate", "How long does a quote take?", "What's included?"],
            "emergency": ["Call now", "What areas do you serve?", "Insurance claims"],
            "general": ["Get a quote", "Book an appointment", "Emergency repair"],
        }
        suggestions = suggestions_map.get(intent, suggestions_map["general"])

        return {
            "response": response,
            "intent": intent,
            "suggestions": suggestions,
        }
