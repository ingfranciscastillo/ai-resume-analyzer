import { cn } from "@/lib/utils";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

const ATS = ({
                 score,
                 suggestions,
             }: {
    score: number;
    suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
    return (
        <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
                <img
                    src={
                        score > 69
                            ? "/icons/ats-good.svg"
                            : score > 49
                                ? "/icons/ats-warning.svg"
                                : "/icons/ats-bad.svg"
                    }
                    alt="ATS"
                    className="w-10 h-10"
                />
                <CardTitle className="text-2xl font-semibold text-muted-foreground">ATS Score - {score}/100</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <p className="font-medium text-xl text-foreground">
                    How well does your resume pass through Applicant Tracking Systems?
                </p>
                <p className="text-lg text-muted-foreground">
                    Your resume was scanned like an employer would. Here's how it
                    performed:
                </p>
                {suggestions.map((suggestion, index) => (
                    <div className="flex flex-row gap-2 items-center" key={index}>
                        <img
                            src={
                                suggestion.type === "good"
                                    ? "/icons/check.svg"
                                    : "/icons/warning.svg"
                            }
                            alt="ATS"
                            className="w-4 h-4"
                        />
                        <p className="text-lg text-muted-foreground">{suggestion.tip}</p>
                    </div>
                ))}

            </CardContent>
            <CardFooter>
                <p className="text-lg text-muted-foreground">
                    Want a better score? Improve your resume by applying the suggestions
                    listed below.
                </p>
            </CardFooter>
        </Card>
    );
};

export default ATS;