import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
export default function NewPost(props){
    console.log("Props",props);
    const PostGen = async() => {
        const response = await fetch('/api/generatePost',{
            method: "POST"
        });
        const json = await response.json();
        console.log("RESULT: ", json);
    }
    return(
        <div className="text-white">
            <h1>
                this is the new post page
            </h1>
            <button className="bg-zinc-400 tracking-wider font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-zinc-600 transition-colors block" onClick={PostGen}>
                Generate
            </button>
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

