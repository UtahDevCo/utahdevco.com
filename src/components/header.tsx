import { auth } from "@/lib/auth";
import { SignInButton, SignOutButton } from "./auth-buttons";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export async function Header() {
  const session = await auth();

  return (
    <header className="flex flex-col sm:flex-row items-center gap-2 py-2 px-2 sm:px-6 bg-secondary text-secondary-foreground w-full">
      <Link href="/">
        <Image
          alt="UtahDevCo Logo"
          src="/images/logos/udc-background-logo.png"
          width={64 * 3}
          height={10 * 3}
        />
      </Link>
      <nav className="grow flex flex-col-reverse sm:flex-row justify-end gap-4">
        {session ? (
          <SignOutButton />
        ) : (
          <SignInButton provider="github">Sign in with GitHub</SignInButton>
        )}
        <div className="text-right pl-2 sm:pl-10 text-xs sm:text-base">
          <p>Design + Build</p>
          <p>Web // iOS // Android</p>
        </div>
      </nav>
    </header>
  );
}
