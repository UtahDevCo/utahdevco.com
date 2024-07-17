import { auth } from "@/lib/auth";
import { SignInButton, SignOutButton } from "./auth-buttons";

export async function Header() {
  const session = await auth();

//   console.log("session", session);

  return (
    <header>
      <h1>Header</h1>
      <nav>
        {session ? (
          <SignOutButton />
        ) : (
          <SignInButton provider="github">Sign in with GitHub</SignInButton>
        )}
      </nav>
    </header>
  );
}
