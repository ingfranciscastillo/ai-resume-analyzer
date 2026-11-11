import { useCallback, useEffect, useState } from "react";
import { CheckCircleIcon, CircleNotchIcon, FileIcon, TrashIcon, WarningIcon } from "@phosphor-icons/react";
import type { Route } from "./+types/wipe";
import Navbar from "@/components/layout/navbar";
import FooterSection from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { usePuterStore } from "@/lib/puter";
import { metaDictionary, useI18n } from "@/lib/i18n";
import { useRequireAuth } from "@/lib/use-require-auth";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: metaDictionary(matches).meta.wipeTitle }];
}

export default function Wipe() {
  const { fs, kv } = usePuterStore();
  const { t } = useI18n();
  const { ready } = useRequireAuth();
  const [files, setFiles] = useState<FSItem[] | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [state, setState] = useState<"idle" | "deleting" | "done">("idle");

  const loadFiles = useCallback(async () => {
    setFiles(((await fs.readDir("./")) as FSItem[] | undefined) ?? []);
  }, [fs]);

  useEffect(() => {
    if (ready) loadFiles();
  }, [ready, loadFiles]);

  const handleDelete = async () => {
    setState("deleting");
    for (const file of files ?? []) {
      await fs.delete(file.path);
    }
    await kv.flush();
    await loadFiles();
    setConfirming(false);
    setState("done");
  };

  const w = t.wipe;

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[70svh] max-w-2xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid size-12 place-items-center rounded-xl bg-danger-soft text-danger">
          <TrashIcon className="size-6" weight="duotone" />
        </div>
        <h1 className="font-display mt-6 text-5xl">{w.title}</h1>
        <p className="mt-4 text-muted-foreground">{w.body}</p>

        <div className="mt-10 rounded-2xl border bg-card">
          <div className="border-b px-6 py-4 text-sm text-muted-foreground">
            {files === null ? t.common.loading : files.length ? w.files(files.length) : w.empty}
          </div>
          {files && files.length > 0 && (
            <ul className="max-h-64 divide-y overflow-y-auto">
              {files.map((file) => (
                <li key={file.id} className="flex items-center gap-3 px-6 py-3 text-sm">
                  <FileIcon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate font-mono text-xs">{file.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {state === "done" && (
          <p role="status" className="mt-6 flex items-center gap-2 text-sm text-success">
            <CheckCircleIcon className="size-5" weight="fill" />
            {w.done}
          </p>
        )}

        {files && files.length > 0 && (
          <div className="mt-8">
            {confirming ? (
              <div role="alertdialog" aria-labelledby="wipe-confirm" className="rounded-2xl border border-destructive/40 bg-danger-soft p-6">
                <p id="wipe-confirm" className="flex items-start gap-2 text-sm">
                  <WarningIcon className="mt-0.5 size-5 shrink-0 text-danger" weight="fill" />
                  {w.body}
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Button variant="destructive" onClick={handleDelete} disabled={state === "deleting"}>
                    {state === "deleting" ? <CircleNotchIcon className="animate-spin" /> : <TrashIcon />}
                    {state === "deleting" ? w.deleting : w.confirm}
                  </Button>
                  <Button variant="ghost" onClick={() => setConfirming(false)} disabled={state === "deleting"}>
                    {t.common.cancel}
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-danger-soft hover:text-destructive" onClick={() => setConfirming(true)}>
                <TrashIcon />
                {w.confirm}
              </Button>
            )}
          </div>
        )}
      </main>
      <FooterSection />
    </>
  );
}
