import { getSession } from "@auth0/nextjs-auth0"
import ClientPromise from "../../lib/mongodb"

export default  async function handler(req, res) {
  const { user } =await getSession(req, res)

  console.log(user);

  const client = await ClientPromise;
  const db = client.db("AutoBlog")

  const userProfile = await db.collection("users").updateOne(
    {
      auth0Id : user.sub
    },
    {
      $inc: {
        availableTokens: 10,
      },
      $setOnInsert: {
        auth0Id: user.sub,
      },
    },
    {
      upsert: true,
    }
  )

    res.status(200).json({ name: 'John Doe' })
  }
  