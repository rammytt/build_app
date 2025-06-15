export default async function handler(req, res) {
  const { topic } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a viral content strategist for social media." },
        { role: "user", content: `Give me 3 short-form video ideas for this topic: ${topic}` }
      ]
    })
  });

  const data = await response.json();
  console.log("OpenRouter response:", data);

  try {
    const ideas = data.choices?.[0]?.message?.content;
    if (ideas) {
      res.status(200).json({ ideas });
    } else {
      res.status(500).json({ error: "No ideas returned", details: data });
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error", details: err.message });
  }
}