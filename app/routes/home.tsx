import type { Route } from "./+types/home";
import HeroSection from "@/components/layout/HeroSection";
import ResumeCard from "@/components/layout/ResumeCard";
import { usePuterStore } from "@/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import FooterSection from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import FeaturesSection from "@/components/layout/FeaturesSection";
import WallOfLoveSection from "@/components/layout/TestimonialSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeSense" },
    { name: "description", content: "Welcome to ResumeSense!" },
  ];
}

export default function Home() {
  const { isLoading, auth, kv } = usePuterStore();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <>
      <HeroSection />
      {auth.isAuthenticated ? (
        !loadingResumes && resumes?.length === 0 ? (
          <section className="py-16 md:py-32 relative z-50">
            <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 lg:py-32">
              <div className="text-center">
                <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                  No se encontró ningún currículum.
                </h2>
                <p className="mt-4 truncate">
                  Aún no has creado ninguna reseña. Comienza subiendo tu primer
                  currículum para recibir una evaluación.
                </p>

                <div className="mt-12 flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg">
                    <Link to="/upload">
                      <span>Subir currículum</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ) : null
      ) : null}
      {auth.isAuthenticated && loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/images/resume-scan-2.gif"
            className="w-[200px]"
            alt={"loading"}
          />
        </div>
      )}
      {!loadingResumes && resumes.length > 0 && (
        <section className="py-16 md:py-32 relative z-50">
          <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
            <div className="flex flex-wrap max-lg:flex-col gap-6 items-start w-full max-w-[1850px] justify-evenly">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          </div>
        </section>
      )}
      <FeaturesSection />
      <WallOfLoveSection />
      <FooterSection />
    </>
  );
}
