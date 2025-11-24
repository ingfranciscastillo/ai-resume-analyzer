"use client";
import { useState, type FormEvent } from "react";
import Navbar from "@/components/layout/navbar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FooterSection from "@/components/layout/footer";
import FileUploader from "@/components/FileUploader";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <section className="py-16 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">
              Smart Feedback for your dream job
            </h1>
            {isProcessing ? (
              <>
                <h2>{statusText}</h2>
                <img
                  src={"/images/search.gif"}
                  alt="Search"
                  className={"w-32 mx-auto mt-2"}
                />
              </>
            ) : (
              <p className="text-muted-foreground mx-auto my-8 max-w-2xl text-xl">
                Drop your resume for an ATS Score and Improvement tips
              </p>
            )}
            {!isProcessing ? (
              <div className={"w-full max-w-md mx-auto"}>
                <form id={"upload-form"} onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="company-name">
                        Company Name
                      </FieldLabel>
                      <Input
                        type="text"
                        name={"company_name"}
                        placeholder={"Company Name"}
                        id={"company-name"}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="job-title">Job Title</FieldLabel>
                      <Input
                        type="text"
                        name={"job-title"}
                        placeholder={"Job Title"}
                        id={"job-title"}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="job-description">
                        Job description
                      </FieldLabel>
                      <Textarea
                        rows={5}
                        name={"job-description"}
                        placeholder={"Job Description"}
                        id={"job-description"}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="uploader">Upload Resume</FieldLabel>
                      <FileUploader onFileSelect={handleFileSelect} />
                    </Field>

                    <Field orientation={"horizontal"}>
                      <Button type={"submit"} variant={"default"}>
                        Analyze Resume
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
