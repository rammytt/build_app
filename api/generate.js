export default async function handler(req, res) {
  const { topic } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a viral content strategist for social media." },
        { role: "user", content: `Give me 3 short-form video ideas for this topic: ${topic}` }
      ],
      temperature: 0.9
    })
  });

  const data = await response.json();
  res.status(200).json({ ideas: data.choices[0].message.content });
}
