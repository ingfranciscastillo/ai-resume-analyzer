import type { Route } from "./+types/home";
import HeroSection from "@/components/layout/HeroSection";
import { resumes } from "../../constants";
import ResumeCard from "@/components/layout/ResumeCard";
import { usePuterStore } from "@/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import FooterSection from "@/components/layout/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  return (
    <>
      <HeroSection />
      {resumes.length > 0 && (
        <section className="py-16 md:py-32">
          <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          </div>
        </section>
      )}
      <FooterSection />
    </>
  );
}
