import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";

export default function TokenTopup() {
  const handleClick = async() => {
    await fetch("/api/addTokens", {
      method: "POST",
    });
  }

  return (
    <div className="text-white">
      <button className="btn" onClick={handleClick}>Add Tokens</button>
      </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
} 

export const getServerSideProps = withPageAuthRequired (() => {
  return {
      props: {}
  };
});
