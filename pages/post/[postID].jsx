import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import clientPromise from "../../lib/mongodb";
import { ObjectID } from "mongodb";
import Markdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

export default function Post(props){
    console.log("Props: " , props);
    return (
        <div className="overflow-auto h-full">
            <div className="max-w-screen-sm mx-auto">
                <div className="text-lg font-bold mt-6 p-2 bg-zinc-800 rounded-sm text-white">
                    SEO Title and Metadescription
                </div>
                <div className=" text-white p-4 my-2 border border-zinc-700 rounded-md">
                    <div className="text-blue-500 text-2xl font-bold">{props.title}</div>
                    <div className="mt-5">{props.metaDescription}</div>
                </div>
                <div className="text-lg font-bold mt-6 p-2 bg-zinc-800 rounded-sm text-white">
                    Keywords
                </div>
                <div className="flex flex-wrap pt-2 gap-1">
                {props.keywords.split(',').map((keyword, i) => (
                <div key={i} className="p-2 rounded bg-zinc-900 text-white">
                    <FontAwesomeIcon icon={faHashtag}/> {keyword.trim()}
                    </div>
                    ))}
                </div>
                <div className="text-lg font-bold mt-6 p-2 bg-zinc-800 rounded-sm text-white">
                    Blog Post
                </div>
                <div className="text-white" dangerouslySetInnerHTML={{__html: props.postContent || ''}} />
            </div>
        </div>
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
                title: post.title.replace(/<[^>]*>/g, ''),
                metaDescription: post.metaDescription,
                keywords: post.keywords
            }
        }
    }
});
