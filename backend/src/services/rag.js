import OpenAI from 'openai';
import pool from '../config/database.js';
import { embedText, toPgVector } from './embeddings.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
- If the user asks about pricing, booking, scheduling, or wants to contact someone, include a note that they can share their contact details so the team can follow up.

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

  const leadTriggers = /\b(pricing|price|cost|book|schedule|appointment|contact|quote|demo|call|email|phone|consultation)\b/i;
  const shouldCaptureLead = leadTriggers.test(userMessage) || leadTriggers.test(answer);

  return {
    answer,
    sources,
    should_capture_lead: shouldCaptureLead,
  };
}
