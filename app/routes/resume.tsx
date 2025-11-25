import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router";
import type {Route} from "../../.react-router/types/app/routes/+types/home";
import FooterSection from "@/components/layout/footer";
import {Button} from "@/components/ui/button";
import {usePuterStore} from "@/lib/puter";
import Summary from "@/components/feedback/Summary";
import ATS from "@/components/feedback/ATS";
import Details from "@/components/feedback/Details";
import {ModeToggle} from "@/components/mode-toggle";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind | Review" },
        { name: "description", content: "Detailed overview of your resume" },
    ];
}

const Resume = () => {

    const { auth, isLoading, fs, kv } = usePuterStore();
    const {id} = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <>
                <nav
                    className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent">
                    <div className="m-auto max-w-5xl px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            <div className="flex w-full justify-between lg:w-auto">
                                <Button asChild variant={"ghost"} size={"sm"}>
                                    <Link
                                        to="/"
                                        aria-label="home"
                                        className="flex items-center space-x-2 font-bold uppercase text-primary">
                                        Back to Home
                                    </Link>
                                </Button>
                            </div>
                            <ModeToggle/>
                        </div>
                    </div>
                </nav>

                <section className="py-16 md:py-32">
                    <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                        <div className={"flex flex-row w-full max-lg:flex-col-reverse"}>
                            <section className={"flex flex-col gap-8 w-1/2 px-8 max-lg:w-full py-6 h-[100vh] sticky top-0 items-center justify-center"}>
                                {
                                    imageUrl && resumeUrl && (
                                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={imageUrl}
                                                    className="w-full h-full object-contain rounded-2xl"
                                                    title="resume"
                                                    alt={"resume"}
                                                />
                                            </a>
                                        </div>
                                    )
                                }
                            </section>
                            <section className={"flex flex-col gap-8 w-1/2 px-8 max-lg:w-full py-6"}>
                                <h2 className="text-4xl text-primary font-bold">Resume Review</h2>
                                {feedback ? (
                                    <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                                        <Summary feedback={feedback} />
                                        <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                        <Details feedback={feedback} />
                                    </div>
                                ) : (
                                    <img src="/images/resume-scan-2.gif" className="w-full" alt={"resume scan gif"} />
                                )}
                            </section>
                        </div>
                    </div>
                </section>
            <FooterSection/>
        </>
    )
}
export default Resume
