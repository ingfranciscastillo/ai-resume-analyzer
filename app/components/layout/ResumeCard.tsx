import React, {useEffect, useState} from 'react'
import {Link} from "react-router";
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import ScoreCircle from "@/components/ScoreCircle";
import {usePuterStore} from "@/lib/puter";

const ResumeCard = ({resume}: {resume: Resume}) => {

    const {fs} = usePuterStore()
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(resume.imagePath)
            if(!blob) return

            let url = URL.createObjectURL(blob);

            setResumeUrl(url)
        }

        loadResume()
    }, [resume.imagePath]);

    return (
        <Link to={`/resume/${resume?.id}`} className={"block h-full animate-in fade-in duration-1000"}>
            <Card className={"h-full cursor-pointer"}>
                <CardHeader>
                    {resume.companyName && <CardTitle className={"text-primary"}> {resume.companyName} </CardTitle>}
                    {resume.jobTitle && <CardDescription className={"text-foreground"}>{resume.jobTitle}</CardDescription>}
                    {!resume.companyName && !resume.jobTitle && <CardTitle className={"text-primary"}>Resume</CardTitle> }
                    <CardAction>
                        <ScoreCircle score={resume.feedback.overallScore}/>
                    </CardAction>
                </CardHeader>
                {
                    resume.imagePath && (
                        <CardContent className={"animate-in fade-in duration-1000"}>
                            <img className="w-full h-[350px] max-sm:h-[200px] object-cover object-top" src={resumeUrl} alt={"Resume"} />
                        </CardContent>
                    )
                }
            </Card>
        </Link>
    )
}
export default ResumeCard
