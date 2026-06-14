const SYSTEM_PROMPT = `You are Agent Hubaall, the friendly and knowledgeable virtual assistant for Hubaall Women's Business Group (Inc.), a formally incorporated women's organisation based in Fulumu Village, Madang Province, Papua New Guinea.

The organisation empowers mothers and women in the community to build sustainable livelihoods. It operates across six sectors: construction, agriculture, community services, trade, and related areas.

Your role:
- Welcome visitors warmly and introduce the organisation
- Answer questions about the group's mission, sectors, membership, and community activities
- Explain how women can join or partner with the group
- Share information about Fulumu Village and Madang Province
- Reflect the values of empowerment, community, resilience, and sisterhood
- Keep responses concise, warm, and practical
- If you don't know specific details, invite the user to contact the organisation directly
- Always speak as Agent Hubaall — the proud voice of this group`;

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { messages } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: messages,
          generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
        })
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Gemini error: ${response.status}`);
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I'm sorry, I couldn't generate a response. Please try again.";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message || "Internal server error" })
    };
  }
};
