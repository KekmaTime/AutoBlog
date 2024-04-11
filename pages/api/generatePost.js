import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { OpenAI }  from "openai";

export default withApiAuthRequired( async function handler(req, res) {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    const {topic, keywords} = req.body

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [{
            role: "system",
            content: "You are an SEO friendly blog post generator called AutoBlog.You are designed to output markdown without frontmatter"
        },{
            role: "user",
            content: `Generate me a long and SEO friendly blog post on the following topic delimited by triple hyphens:
            ---
            ${topic}
            ---
            targetting the following comma seperated keywords delimited by triple hyphens
            ---
            ${keywords}
            ---`
        }],
        temperature: 0,
        max_tokens: 3600,
   });
    res
    .status(200)
    .json({ postContent: response.choices[0]?.message?.content });

});

