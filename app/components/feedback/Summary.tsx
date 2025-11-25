import ScoreGauge from "../ScoreGauge";

const ScoreBadge = ({ score }: { score: number }) => {
    const badgeColor =
        score > 69
            ? "bg-[#d5faf1]"
            : score > 49
                ? "bg-[#fceed8]"
                : "bg-[#f9e3e2]";
    const textColor =
        score > 69
            ? "text-[#254d4a]"
            : score > 49
                ? "text-[#73321b]"
                : "text-[#752522]";
    const badgeText =
        score > 69 ? "Strong" : score > 49 ? "Good Start" : "Needs Work";

    return (
        <div className={`flex flex-row items-center justify-center py-1 px-2 gap-4 rounded-[96px] ${badgeColor}`}>
            <p className={`text-xs ${textColor} font-semibold`}>{badgeText}</p>
        </div>
    );
};

const Category = ({ title, score }: { title: string; score: number }) => {
    const textColor =
        score > 69
            ? "text-green-600"
            : score > 49
                ? "text-yellow-600"
                : "text-red-600";

    return (
        <div className="flex flex-row items-center justify-center p-4 gap-4">
            <div className="flex flex-row gap-2 items-center rounded-2xl p-4 w-full justify-between">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-2xl">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl ">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-primary-foreground rounded-2xl shadow-md w-full">
            <div className="flex flex-row max-sm:flex-col items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore} />
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-muted-foreground">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>
            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    );
};

export default Summary;