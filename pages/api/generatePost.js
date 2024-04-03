import { OpenAI }  from "openai";

export default async function handler(req, res) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    const {topic, keywords} = req.body

    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        temperature: 0,
        max_tokens: 3600,
        prompt: `Write a Long and SEO-Friendly blog post about ${topic}, that targets the following comma-seperated keywords : ${keywords}
        The content must be formatted in SEO-friendly HTML.
        The response must include approriate HTML title and meta description content.
        The return format must be stringified JSON in the following format: 
        {
            "postContent": post content here,
            "title": title goes here,
            "metaDescription": meta description goes here
        }`
    });
    console.log('response' , response);
  res.status(200).json({ post: response.choices[0]?.text.split('\n').join('')})
}

