import { Check, Clipboard } from "lucide-react";
import type { GeneratedMessage } from "@/types/message";

type MessageResultCardProps = {
  copiedId: string;
  result: GeneratedMessage;
  onCopy: (id: string, value: string) => void;
};

export function MessageResultCard({ copiedId, result, onCopy }: MessageResultCardProps) {
  const isCopied = copiedId === result.id;

  return (
    <article className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-bold text-ink">{result.title}</h3>
        <button
          className="inline-flex h-9 items-center gap-2 rounded-md border border-black/10 px-3 text-sm font-semibold text-ink hover:bg-sage"
          onClick={() => onCopy(result.id, result.value)}
          type="button"
        >
          {isCopied ? <Check size={16} /> : <Clipboard size={16} />}
          {isCopied ? "복사됨" : "복사"}
        </button>
      </div>
      <p className="whitespace-pre-line text-sm leading-7 text-ink/78">{result.value}</p>
    </article>
  );
}
