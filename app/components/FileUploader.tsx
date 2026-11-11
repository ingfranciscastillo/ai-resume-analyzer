import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FilePdfIcon, UploadSimpleIcon, XIcon } from "@phosphor-icons/react";
import { formatSize, cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export const MAX_FILE_SIZE = 20 * 1024 * 1024;

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
  invalid?: boolean;
  id?: string;
}

export default function FileUploader({ onFileSelect, invalid, id }: FileUploaderProps) {
  const { t } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [rejected, setRejected] = useState(false);

  const onDrop = useCallback(
    (accepted: File[], rejections: unknown[]) => {
      const next = accepted[0] ?? null;
      setRejected(!next && rejections.length > 0);
      setFile(next);
      onFileSelect?.(next);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: MAX_FILE_SIZE,
    maxFiles: 1,
  });

  const clear = () => {
    setFile(null);
    setRejected(false);
    onFileSelect?.(null);
  };

  if (file) {
    return (
      <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-text">
          <FilePdfIcon className="size-6" weight="duotone" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="font-mono text-xs text-muted-foreground tabular">{formatSize(file.size)}</p>
        </div>
        <button
          type="button"
          onClick={clear}
          aria-label={t.upload.remove}
          className="grid size-10 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <XIcon className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        {...getRootProps({
          className: cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center transition-colors outline-none",
            "hover:border-foreground/40 hover:bg-accent/50 focus-visible:ring-[3px] focus-visible:ring-ring/50",
            isDragActive && "border-brand bg-brand-soft",
            (invalid || rejected) && "border-destructive"
          ),
        })}
      >
        <input {...getInputProps({ id })} />
        <div className="grid size-11 place-items-center rounded-full border bg-background">
          <UploadSimpleIcon className="size-5" />
        </div>
        <p className="mt-4 text-sm font-medium">{t.upload.dropTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t.upload.dropOr}</p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">{t.upload.dropHint(formatSize(MAX_FILE_SIZE))}</p>
      </div>
      {rejected && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {t.upload.fileRejected}
        </p>
      )}
    </div>
  );
}
