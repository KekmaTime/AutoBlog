import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NewPost(props){
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [keywords, setKeywords] = useState("");
    const PostGen = async(e) => {
        e.preventDefault();
        const response = await fetch('/api/generatePost',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({topic, keywords}),
        });
        const json = await response.json();
        console.log("Result" , json);
        if(json?.postId){
            router.push(`/post/${json.postId}`);
        }
    };
    return(
        <div className="text-white">
            <form onSubmit={PostGen}>
                <div className="">
                    <label>
                        <strong>
                            Generate a Blog Post on the topic of :
                        </strong>
                    </label>
                    <textarea className="resize-none border text-black border-zinc-600 w-full black my-2 px-4 py-2 rounded-sm" value={topic} onChange={(e) => setTopic(e.target.value)}/>
                </div>
                <div>
                <label>
                    <strong>
                        Targetting the following Keywords :
                    </strong>
                    </label>
                    <textarea className="resize-none border text-black border-zinc-600 w-full black my-2 px-4 py-2 rounded-sm" value={keywords} onChange={(e) => setKeywords(e.target.value)}/>
                </div>
            <button type="submit" className="bg-zinc-400 tracking-wider font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-zinc-6000 transition-colors block">
                Generate
            </button>
            </form>
            </div>
    
    );
}

NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>;
} 

export const getServerSideProps = withPageAuthRequired (() => {
    return {
        props: {}
    };
});

