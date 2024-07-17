import { signIn, signOut } from "@/lib/auth";

type LoginButtonProps = {
  children: React.ReactNode;
  provider: string;
};

export function SignInButton({ children, provider }: LoginButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button>{children}</button>
    </form>
  );
}

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>Sign Out</button>
    </form>
  );
}
