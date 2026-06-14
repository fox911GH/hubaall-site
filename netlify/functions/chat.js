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
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "GEMINI_API_KEY is not set in environment variables." })
      };
    }

    // Try both endpoints — v1beta works for both AIzaSy and AQ. key formats
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || `Gemini error: ${response.status}`);
    }

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
