import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { OpenAI }  from "openai";
import clientPromise from "../../lib/mongodb"

export default withApiAuthRequired( async function handler(req, res) {
    const { user } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db("AutoBlog")

    const userProfile = await db.collection("users").findOne({
        auth0Id: user.sub
    })

    if(!userProfile?.availableTokens) {
        res.status(403)
        return;
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    const {topic, keywords} = req.body

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
            {
              role: 'system',
              content: 'You are a blog post generator.',
            },
            {
              role: 'user',
              content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
            The response should be formatted in SEO-friendly HTML, 
            limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
            },
          ],
          temperature: 0,
        });

   const postContent = response.choices[0]?.message?.content
   const seoTitle = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
        {
          role: 'system',
          content: 'You are a blog post generator.',
        },
        {
          role: 'user',
          content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
        The response should be formatted in SEO-friendly HTML, 
        limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },
        {
          role: 'assistant',
          content: postContent,
        },
        {
          role: 'user',
          content: 'Generate appropriate title tag text for the above blog post',
        },
      ],
      temperature: 0,
    });


   const seoMeta = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
        {
          role: 'system',
          content: 'You are a blog post generator.',
        },
        {
          role: 'user',
          content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
        The response should be formatted in SEO-friendly HTML, 
        limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },
        {
          role: 'assistant',
          content: postContent,
        },
        {
          role: 'user',
          content:
            'Generate SEO-friendly meta description content for the above blog post',
        },
      ],
      temperature: 0,
    });

 
    const title = seoTitle.choices[0]?.message?.content
    const metaDescription = seoMeta.choices[0]?.message?.content

    const post = await db.collection('posts').insertOne({
        postContent,
        title,
        metaDescription,
        topic,
        keywords,
        userId: userProfile._id,
        createdAt: new Date(),
    })



    res.status(200).json({post : { postContent ,seoTitle, seoMeta  }});

});

