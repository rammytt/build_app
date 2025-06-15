export default async function handler(req, res) {
  const { topic } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // or "anthropic/claude-3-sonnet"
      messages: [
        { role: "system", content: "You are a viral content strategist for social media." },
        { role: "user", content: `Give me 3 short-form video ideas for this topic: ${topic}` }
      ]
    })
  });

  const data = await response.json();

  if (data.choices) {
    res.status(200).json({ ideas: data.choices[0].message.content });
  } else {
    res.status(500).json({ error: "No response from OpenRouter", details: data });
  }
}
