"use client";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
    maxFiles: 1,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const file = selectedFile;

  return (
    <div
      className={
        "bg-secondary hover:bg-accent p-4 rounded-lg transition duration-300"
      }
    >
      <div {...getRootProps()}>
        {(() => {
          const inputProps = getInputProps();
          const originalRef = (inputProps as any).ref;
          const combinedRef = (node: HTMLInputElement | null) => {
            inputRef.current = node;
            if (typeof originalRef === "function") originalRef(node);
            else if (originalRef && typeof originalRef === "object")
              (originalRef as any).current = node;
          };
          return <input {...inputProps} ref={combinedRef} />;
        })()}

        <div className={"space-y-4 cursor-pointer"}>
          {file ? (
            <div
              className={"bg-white rounded-2xl p-2 flex justify-between"}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <img
                className={"size-10"}
                src={"images/pdf.png"}
                alt={"pdf file"}
              />
              <div className={"flex justify-between items-center space-x-3"}>
                <div>
                  <p
                    className={
                      "text-sm text-gray-700 font-medium truncate max-w-xs"
                    }
                  >
                    {file.name}
                  </p>
                  <p className={"text-sm text-gray-500"}>
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                variant={"ghost"}
                type="button"
                className={"p-2 cursor-pointer"}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  try {
                    if (inputRef.current) inputRef.current.value = "";
                  } catch (err) {
                    /* ignore */
                  }
                  onFileSelect?.(null);
                }}
              >
                <img
                  src={"images/cross.png"}
                  alt={"remove"}
                  className={"size-4"}
                />
              </Button>
            </div>
          ) : (
            <div>
              <div
                className={"mx-auto size-12 flex items-center justify-center"}
              >
                <img className={"size-8"} src={"images/info.png"} alt={""} />
              </div>
              <p className={"text-md text-gray-500"}>
                <span className={"font-semibold"}>Click to upload </span>
                or drag and drop
              </p>
              <p className={"text-sm text-gray-500"}>
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FileUploader;
