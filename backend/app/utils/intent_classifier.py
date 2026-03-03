"""Intent classifier for Raffy chatbot. spaCy integration planned for later."""

import re


class IntentClassifier:
    """
    Classifies user messages into intents for routing and response selection.
    Placeholder keyword-based implementation. spaCy NER/classification to be added.
    """

    INTENTS = ("book", "quote", "emergency", "general")

    def __init__(self) -> None:
        """Initialize classifier. spaCy model loading to be added."""
        # Keyword patterns for placeholder classification
        self._patterns = {
            "book": re.compile(
                r"\b(book|schedule|appointment|set up|reserve|availability|calendar)\b",
                re.IGNORECASE,
            ),
            "quote": re.compile(
                r"\b(quote|estimate|price|cost|how much|pricing)\b",
                re.IGNORECASE,
            ),
            "emergency": re.compile(
                r"\b(emergency|urgent|leak|leaking|damage|storm|asap|immediately)\b",
                re.IGNORECASE,
            ),
        }

    def classify(self, message: str) -> str:
        """
        Classify a user message into one of: book, quote, emergency, general.

        Args:
            message: The user's message text.

        Returns:
            Intent string: "book", "quote", "emergency", or "general".
        """
        message = message.strip()
        if not message:
            return "general"

        # Check patterns in priority order (emergency first, then book, quote)
        if self._patterns["emergency"].search(message):
            return "emergency"
        if self._patterns["book"].search(message):
            return "book"
        if self._patterns["quote"].search(message):
            return "quote"

        return "general"
