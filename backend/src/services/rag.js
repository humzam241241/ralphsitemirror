import OpenAI from 'openai';
import pool from '../config/database.js';
import { embedText, toPgVector } from './embeddings.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const intentPatterns = {
  booking: /\b(book|schedule|appointment|inspection|visit|come out|set up)\b/i,
  quote: /\b(price|cost|quote|estimate|how much|pricing)\b/i,
  emergency: /\b(emergency|urgent|leak|storm damage|asap|right now|immediately)\b/i,
};

function detectIntent(message) {
  if (intentPatterns.emergency.test(message)) {
    return 'emergency';
  }
  if (intentPatterns.booking.test(message)) {
    return 'booking';
  }
  if (intentPatterns.quote.test(message)) {
    return 'quote';
  }
  return null;
}

export async function chatWithRAG(siteId, userMessage, siteConfig) {
  const queryEmbedding = await embedText(userMessage);
  const vectorLiteral = toPgVector(queryEmbedding);

  const { rows: docs } = await pool.query(
    `SELECT content, url
     FROM documents
     WHERE site_id = $1
     ORDER BY embedding <=> $2::vector
     LIMIT 5`,
    [siteId, vectorLiteral]
  );

  const contextBlock = docs
    .map((d, i) => `[Source ${i + 1}: ${d.url}]\n${d.content}`)
    .join('\n\n---\n\n');

  const companyName = siteConfig.company_name || 'the company';
  const tone = siteConfig.tone || 'friendly and professional';
  const customPrompt = siteConfig.custom_prompt || '';

  const systemPrompt = `You are a helpful AI assistant for ${companyName}. Your tone should be ${tone}.

${customPrompt ? `Additional instructions: ${customPrompt}\n` : ''}
STRICT RULES:
- ONLY answer questions using the context provided below. Do NOT use outside knowledge.
- If the context does not contain enough information to answer, say: "I'm not sure about that. Would you like me to connect you with the ${companyName} team?"
- Be concise and helpful. Use the same language as the user's question.
- When citing information, reference the source naturally (e.g., "According to our website...").
- Never reveal that you are reading from indexed documents or embeddings.
- If the user asks about emergency services, emphasize the urgency and direct them to call immediately.
- If the user asks about booking or scheduling, be enthusiastic and mention they can schedule online or provide their details.
- If the user asks about pricing or quotes, offer to have someone provide a detailed estimate after reviewing their specific needs.

CONTEXT:
${contextBlock || 'No relevant context found.'}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    max_tokens: 600,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
  });

  const answer = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  const sources = [...new Set(docs.map((d) => d.url))];

  const intent = detectIntent(userMessage);
  
  const leadTriggers = /\b(pricing|price|cost|book|schedule|appointment|contact|quote|demo|call|email|phone|consultation)\b/i;
  const shouldCaptureLead = leadTriggers.test(userMessage) || leadTriggers.test(answer);

  return {
    answer,
    sources,
    should_capture_lead: shouldCaptureLead,
    intent,
  };
}
