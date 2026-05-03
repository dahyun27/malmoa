"use client";

import { Edit3, Trash2 } from "lucide-react";
import type { Student } from "@/types/student";

type StudentListProps = {
  students: Student[];
  onDelete: (studentId: string) => void;
  onEdit: (student: Student) => void;
};

export function StudentList({ students, onDelete, onEdit }: StudentListProps) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-ink">학생 목록</h2>
          <p className="mt-1 text-sm text-ink/60">현재 {students.length}명의 학생이 등록되어 있습니다.</p>
        </div>
      </div>

      <div className="space-y-3">
        {students.map((student) => (
          <article className="rounded-md border border-black/10 bg-linen p-4" key={student.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-ink">{student.name}</h3>
                  <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-moss">{student.grade || "학년 미입력"}</span>
                  <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-moss">{student.subject}</span>
                </div>
                <p className="mt-2 text-sm text-ink/65">
                  {student.school || "학교 미입력"} · {student.parentTitle}
                </p>
                {student.memo && <p className="mt-3 text-sm leading-6 text-ink/75">{student.memo}</p>}
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  aria-label={`${student.name} 학생 수정`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-white text-ink hover:bg-sage"
                  onClick={() => onEdit(student)}
                  type="button"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  aria-label={`${student.name} 학생 삭제`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-white text-coral hover:bg-white/70"
                  onClick={() => onDelete(student.id)}
                  type="button"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
