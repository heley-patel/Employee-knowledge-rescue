import OpenAI from 'openai';

export async function createGroundedAnswer(question, sources) {
  const context = sources
    .map((s, i) => `[${i + 1}] ${s.title} (${s.type})\n${s.content}`)
    .join('\n\n');

  if (!process.env.OPENAI_API_KEY) {
    return `Here is what the company knowledge says:\n\n${sources[0].content}\n\nPlease review the linked sources for the full procedure.`;
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    temperature: 0.1,

    messages: [
      {
        role: 'system',
        content: "You are the company's internal knowledge assistant. Answer using only the provided company knowledge. If it does not contain enough information, say exactly that the information was not found in the company knowledge base. Never invent company procedures. Keep answers clear and practical."
      },

      {
        role: 'user',
        content: `Question: ${question}\n\nCompany knowledge:\n${context}`
      }
    ]
  });

  return completion.choices[0]?.message?.content ||
    "I couldn't find this information in the company's knowledge base.";
}