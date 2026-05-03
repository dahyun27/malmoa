import { Sparkles } from "lucide-react";
import type { Student } from "@/types/student";

type MessageCreateFormProps = {
  memo: string;
  selectedStudent: string;
  situation: string;
  students: Student[];
  situations: string[];
  tone: string;
  tones: string[];
  onGenerate: () => void;
  onMemoChange: (value: string) => void;
  onSituationChange: (value: string) => void;
  onStudentChange: (value: string) => void;
  onToneChange: (value: string) => void;
};

export function MessageCreateForm({
  memo,
  selectedStudent,
  situation,
  students,
  situations,
  tone,
  tones,
  onGenerate,
  onMemoChange,
  onSituationChange,
  onStudentChange,
  onToneChange,
}: MessageCreateFormProps) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-ink">연락문 입력</h2>
        <p className="mt-1 text-sm text-ink/60">학생, 상황, 톤을 고르고 수업 메모를 입력하세요.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">학생</span>
          <select
            className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
            onChange={(event) => onStudentChange(event.target.value)}
            value={selectedStudent}
          >
            {students.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} · {item.grade} · {item.subject}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">상황</span>
          <select
            className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
            onChange={(event) => onSituationChange(event.target.value)}
            value={situation}
          >
            {situations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-ink">톤</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tones.map((item) => (
            <button
              className={`h-10 rounded-md border px-3 text-sm font-semibold ${
                tone === item ? "border-moss bg-sage text-ink" : "border-black/10 bg-white text-ink/65 hover:bg-black/5"
              }`}
              key={item}
              onClick={() => onToneChange(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-semibold text-ink">수업 메모</span>
        <textarea
          className="min-h-44 w-full resize-none rounded-md border border-black/15 bg-white p-3 text-sm leading-6 outline-none focus:border-moss"
          onChange={(event) => onMemoChange(event.target.value)}
          value={memo}
        />
      </label>

      <button
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-coral px-4 text-sm font-bold text-white shadow-soft hover:bg-[#bf584c]"
        onClick={onGenerate}
        type="button"
      >
        <Sparkles size={18} />
        연락문 생성하기
      </button>
    </section>
  );
}
