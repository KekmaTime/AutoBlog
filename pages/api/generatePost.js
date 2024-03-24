import OpenAI from "openai";

export default async function handler(_req, res) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    const response = await openai.completions.create({
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 4000,
        prompt: "generate a passage about dogs"
    });
    console.log('response' , response);
  res.status(200).json({ post: response.data.choices })
}