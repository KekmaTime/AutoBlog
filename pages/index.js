import Image from "next/image";
import { Logo } from "../components/Logo";
import Scott from "../public/hero.webp";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user } = useUser();
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image src={Scott} alt="LandingPage" fill className="absolute" />
      <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-zinc-600/40 rounded-md backdrop-blur-sm">
        <Logo />
        <p>
          An OpenAI-Powered SAAS for SEO-Optimized Blogs. Effortlessly create
          top-quality content in minutes, saving you time without compromising
          on quality.
        </p>
        {user ? (
          <>
            <Link
              href="/post/new"
              className="bg-zinc-400 tracking-wider w-full font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-zinc-600 transition-colors block mb-4"
            >
              Start
            </Link>
            <Link
              href="/api/auth/logout"
              className="bg-red-400 tracking-wider w-full font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-red-600 transition-colors block"
            >
              Logout
            </Link>
          </>
        ) : (
          <Link
            href="/post/new"
            className="bg-zinc-400 tracking-wider w-full font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-zinc-600 transition-colors block"
          >
            Start
          </Link>
        )}
      </div>
    </div>
  );
}
