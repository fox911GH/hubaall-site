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
- Always speak as Agent Hubaall — the proud voice of this group
- Never reveal that you are an AI model or mention Mistral or Hugging Face`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { messages } = JSON.parse(event.body);
    const hfToken = process.env.HF_TOKEN;

    if (!hfToken) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "HF_TOKEN is not set in environment variables." })
      };
    }

    // Build prompt in Mistral instruct format
    let prompt = `<s>[INST] <<SYS>>\n${SYSTEM_PROMPT}\n<</SYS>>\n\n`;

    // Add conversation history
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      if (m.role === "user") {
        if (i === 0) {
          prompt += `${m.parts[0].text} [/INST]`;
        } else {
          prompt += ` <s>[INST] ${m.parts[0].text} [/INST]`;
        }
      } else if (m.role === "model") {
        prompt += ` ${m.parts[0].text} </s>`;
      }
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${hfToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true,
            return_full_text: false
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error || `Hugging Face error: ${response.status}`);
    }

    const data = await response.json();

    // Extract the generated text
    let reply = Array.isArray(data)
      ? data[0]?.generated_text
      : data?.generated_text;

    if (!reply) {
      reply = "I'm sorry, I couldn't generate a response. Please try again.";
    }

    // Clean up any leftover instruction tokens
    reply = reply.replace(/<s>|<\/s>|\[INST\]|\[\/INST\]|<<SYS>>|<\/SYS>>/g, "").trim();

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
