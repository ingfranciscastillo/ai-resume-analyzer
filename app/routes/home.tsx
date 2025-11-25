import type { Route } from "./+types/home";
import HeroSection from "@/components/layout/HeroSection";
import ResumeCard from "@/components/layout/ResumeCard";
import { usePuterStore } from "@/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import FooterSection from "@/components/layout/footer";
import {Button} from "@/components/ui/button";
import FeaturesSection from "@/components/layout/FeaturesSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Welcome to Resumind!" },
  ];
}

export default function Home() {
  const { isLoading, auth, kv } = usePuterStore();
    const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

    useEffect(() => {
        const loadResumes = async () => {
            setLoadingResumes(true);

            const resumes = (await kv.list('resume:*', true)) as KVItem[];

            const parsedResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ))

            setResumes(parsedResumes || []);
            setLoadingResumes(false);
        }

        loadResumes()
    }, []);

  return (
    <>
      <HeroSection />
        {
            auth.isAuthenticated ? (
                !loadingResumes && resumes?.length === 0 ? (
                    <section className="py-16 md:py-32 relative z-50">
                        <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 lg:py-32">
                            <div className="text-center">
                                <h2 className="text-balance text-4xl font-semibold lg:text-5xl">No resume has found.</h2>
                                <p className="mt-4 truncate">You haven't created any review yet. Get started by uploading your first resume for a review.</p>

                                <div className="mt-12 flex flex-wrap justify-center gap-4">
                                    <Button
                                        asChild
                                        size="lg">
                                        <Link to="/upload">
                                            <span>Upload Resume</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : null
            ) : null
        }
        {auth.isAuthenticated && loadingResumes && (
            <div className="flex flex-col items-center justify-center">
                <img src="/images/resume-scan-2.gif" className="w-[200px]" alt={"loading"} />
            </div>
        )}
      {!loadingResumes && resumes.length > 0 && (
        <section className="py-16 md:py-32 relative z-50">
          <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          </div>
        </section>
      )}
        <FeaturesSection/>
        <FooterSection />
    </>
  );
}
