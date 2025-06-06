export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end("Only POST allowed");
  }

  const { text } = req.body;
  const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

  const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  });

  const data = await response.json();
  res.status(200).json({ output: data[0]?.generated_text || "No output" });
}