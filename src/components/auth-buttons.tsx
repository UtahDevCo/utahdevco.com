import { signIn, signOut } from "@/lib/auth";
import { ClickButton } from "./click-button";

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
      className="flex items-center justify-center sm:justify-end"
    >
      <ClickButton
        clickToDisable
        key="sign-in-button"
        size="sm"
        variant="outline"
      >
        {children}
      </ClickButton>
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
      className="flex items-center justify-center sm:justify-end"
    >
      <ClickButton
        clickToDisable
        key="sign-out-button"
        size="sm"
        variant="outline"
      >
        Sign Out
      </ClickButton>
    </form>
  );
}
