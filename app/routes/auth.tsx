import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { usePuterStore } from "@/lib/puter";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Login" },
    { name: "description", content: "Log into your account!" },
  ];
}

export default function LoginPage() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="flex justify-center items-center min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <section className={"flex flex-col gap-8 p-10"}>
        <div>
          <h1 className="text-6xl font-bold text-primary">Welcome</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Log In to Continue your Job Journey
          </h2>
        </div>
        <div>
          {isLoading ? (
            <Button className={"animate-pulse"}>Signing you in...</Button>
          ) : (
            <>
              {auth.isAuthenticated ? (
                <Button onClick={auth.signOut}>Sign Out</Button>
              ) : (
                <Button onClick={auth.signIn}>Sign In</Button>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
