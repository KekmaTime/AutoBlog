import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import clientPromise from "../../lib/mongodb";
import { ObjectID } from "mongodb";

export default function Post(props){
    console.log("Props: " , props);
    return (
        <div>This is the post page</div>
    );
}

Post.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>;
} 

export const getServerSideProps = withPageAuthRequired ({
    async getServerSideProps(ctx){
        const userSession = await getSession(ctx.req , ctx.res);
        const client = await clientPromise;
        const db = client.db("AutoBlog");
        const user = await db.collection("users").findOne({
            auth0Id: userSession.user.sub
        });

        const post = await db.collection("posts").findOne({
            _id: new ObjectID(ctx.params.postID),
            userId: user._id,
        });

        if(!post){
            return {
                redirect: {
                    destination: "/post/new",
                    permanent: false
                }
            }
        }
        return {
            props: {
                postContent: post.postContent,
                title: post.title,
                metaDescription: post.metaDescription,
                keywords: post.keywords
            }
        }
    }
});
