import React from 'react'
import {Link} from "react-router";
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import ScoreCircle from "@/components/ScoreCircle";

const ResumeCard = ({resume}: {resume: Resume}) => {
    return (
        <Link to={`/resume/${resume?.id}`}>
            <Card>
                <CardHeader>
                    <CardTitle className={"text-primary"}> {resume.companyName} </CardTitle>
                    <CardDescription className={"text-foreground"}>{resume.jobTitle}</CardDescription>
                    <CardAction>
                        <ScoreCircle score={resume.feedback.overallScore}/>
                    </CardAction>
                </CardHeader>
                <CardContent className={"animate-in fade-in duration-1000"}>
                    <img className="w-full h-[350px] max-sm:h-[200px] object-cover" src={resume.imagePath} alt={"Resume"} />
                </CardContent>
            </Card>
        </Link>
    )
}
export default ResumeCard
