"use client";
import {useState, type FormEvent, useEffect} from "react";
import Navbar from "@/components/layout/navbar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FooterSection from "@/components/layout/footer";
import FileUploader from "@/components/FileUploader";
import {usePuterStore} from "@/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "@/lib/pdf2img";
import {generateUUID} from "@/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {

    const {auth, isLoading, fs, ai, kv} = usePuterStore()
    const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
    setIsProcessing(true);

    setStatusText("Uploading file...");
    const uploadedFile = await fs.upload([file]);
    if(!uploadedFile) return setStatusText('Error: Failed to upload file');

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText('Error: Failed to convert pdf to image');

    setStatusText("Uploading the image...");
    const uploadImage = await fs.upload([imageFile.file])
      if(!uploadImage) return setStatusText('Error: Failed to upload image');

      setStatusText("Preparing data...")

      const uuid = generateUUID();

      const data = {
          id: uuid,
          resumePath: uploadedFile.path,
          imagePath: uploadImage.path,
          companyName,
          jobTitle,
          jobDescription,
          feedback: "",
      }

      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("Analyzing...");

      const feedback = await ai.feedback(
          uploadedFile.path,
          prepareInstructions({ jobTitle, jobDescription })
      )
      if (!feedback) return setStatusText('Error: Failed to analyze resume');

      const feedbackText = typeof feedback.message.content === 'string'
          ? feedback.message.content
          : feedback.message.content[0].text;

      data.feedback = JSON.parse(feedbackText);
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText('Analysis complete, redirecting...');
      console.log(data);
      navigate(`/resume/${uuid}`);

  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");

    if(!form) return;

    const formData = new FormData(form);

    const companyName = formData.get("company_name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if(!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <>
      <Navbar />
      <section className="py-16 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <div className="relative z-10 mx-auto max-w-2xl text-center">

            {isProcessing ? (
              <>
                  <div className={"text-lg font-semibold mt-2"}>
                    <h2>{statusText}</h2>
                  </div>
                <img
                  src={"/images/search.gif"}
                  alt="Search"
                  className={"w-full mx-auto mt-2"}
                />
              </>
            ) : (
                <>
                    <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">
                        Feedback inteligente para tu empleo soñado.
                    </h1>
                  <p className="text-muted-foreground mx-auto my-8 max-w-2xl text-xl">
                      Sube tu currículum para obtener una puntuación ATS y consejos de mejora
                  </p>
                </>
            )}
            {!isProcessing ? (
              <div className={"w-full max-w-md mx-auto"}>
                <form id={"upload-form"} onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="company-name">
                        Nombre de la compañia
                      </FieldLabel>
                      <Input
                        type="text"
                        name={"company_name"}
                        placeholder={"Nombre de la compañia"}
                        id={"company-name"}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="job-title">Título del trabajo</FieldLabel>
                      <Input
                        type="text"
                        name={"job-title"}
                        placeholder={"Desarrollador Full stack, abogado..."}
                        id={"job-title"}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="job-description">
                        Descripción del trabajo
                      </FieldLabel>
                      <Textarea
                        rows={5}
                        name={"job-description"}
                        placeholder={"Descripción del trabajo"}
                        id={"job-description"}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="uploader">Upload Resume</FieldLabel>
                      <FileUploader onFileSelect={handleFileSelect} />
                    </Field>

                    <Field orientation={"horizontal"}>
                      <Button type={"submit"} variant={"default"} className={"w-full"}>
                        Analizar curriculum
                      </Button>
                    </Field>
                  </FieldGroup>
                </form>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
      <FooterSection />
    </>
  );
};
export default Upload;
