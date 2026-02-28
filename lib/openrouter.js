export async function callOpenRouter(prompt) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000", // required
      "X-Title": "AI Career App"
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL,
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error("OpenRouter error:", res.status, errText);
    throw new Error(`OpenRouter API failed: ${res.status}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
