import type { Route } from "./+types/home";
import HeroSection from "@/components/layout/HeroSection";
import ResumeCard from "@/components/layout/ResumeCard";
import { usePuterStore } from "@/lib/puter";
import {Link, useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import FooterSection from "@/components/layout/footer";
import {Button} from "@/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { isLoading, auth, kv } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

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
            !loadingResumes && resumes?.length === 0 ? (
                <>
                    <h2>No resumes found. Upload your first resume for review.</h2>
                    <Button asChild size="lg" className="gap-4" variant="default">
                        <Link to={"/upload"}>
                            Upload your first resume for review
                        </Link>
                    </Button>
                </>
            ) : null
        }
        {loadingResumes && (
            <div className="flex flex-col items-center justify-center">
                <img src="/images/resume-scan-2.gif" className="w-[200px]" alt={"loading"} />
            </div>
        )}
      {!loadingResumes && resumes.length > 0 && (
        <section className="py-16 md:py-32">
          <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
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
