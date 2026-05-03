import { MessageResultCard } from "@/components/messages/MessageResultCard";
import type { GeneratedMessage } from "@/types/message";
import type { Student } from "@/types/student";

type MessageResultsPanelProps = {
  copiedId: string;
  hasGenerated: boolean;
  results: GeneratedMessage[];
  student: Student;
  tone: string;
  onCopy: (id: string, value: string) => void;
};

export function MessageResultsPanel({ copiedId, hasGenerated, results, student, tone, onCopy }: MessageResultsPanelProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-ink">생성 결과</h2>
            <p className="mt-1 text-sm text-ink/60">
              {student.parentTitle}께 보낼 {tone} 톤의 초안입니다.
            </p>
          </div>
          <span className="rounded-md bg-linen px-3 py-1 text-xs font-bold text-moss">{student.name} 학생</span>
        </div>
      </div>

      {hasGenerated &&
        results.map((result) => (
          <MessageResultCard copiedId={copiedId} key={result.id} onCopy={onCopy} result={result} />
        ))}
    </section>
  );
}
