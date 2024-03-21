import Image from "next/image";
import Link from "next/link";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Logo } from "../Logo/Logo";

export const AppLayout = ({ children }) => {
  const { user } = useUser();
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      <div className="flex flex-col text-white overflow-hidden">
        <div className="bg-zinc-800 px-2">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href="/post/new"
            className="text-zinc-100 bg-zinc-400 tracking-wider w-full font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-zinc-600 transition-colors block"
          >
            New Post
          </Link>
          <Link href="/token-topup" className="block mt-2 text-center">
            <FontAwesomeIcon
              icon={faCoins}
              className="fa-thin fa-coins text-zinc-400"
            />
            <span className="pl-1">0 Tokens available</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto bg-zinc-800">List of Posts</div>
        <div className="bg-zinc-800 flex item-center gap-2 border-t border-t-black/50 h-20 px-2 py-4">
          {user ? (
            <>
              <div className="min-w-[50px]">
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="font-bold">{user.email}</div>
                <Link className="text-sm" href="/api/auth/logout">
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </div>
      </div>
      <div className="bg-zinc-900">{children}</div>
    </div>
  );
};
