import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Post(){
    return (
        <div>This is the post page</div>
    );
}

export const getServerSideProps = withPageAuthRequired (() => {
    return {
        props: {}
    };
});
