"use client";

import { Check, Plus, X } from "lucide-react";
import type { Student, StudentFormValues } from "@/types/student";

const emptyValues: StudentFormValues = {
  name: "",
  grade: "",
  school: "",
  parentTitle: "어머니",
  subject: "",
  memo: "",
};

type StudentFormProps = {
  editingStudent: Student | null;
  isSubmitting?: boolean;
  values: StudentFormValues;
  onCancelEdit: () => void;
  onChange: (values: StudentFormValues) => void;
  onSubmit: () => void;
};

export function StudentForm({ editingStudent, isSubmitting = false, values, onCancelEdit, onChange, onSubmit }: StudentFormProps) {
  const canSubmit = values.name.trim().length > 0 && values.subject.trim().length > 0;

  const updateField = (field: keyof StudentFormValues, value: string) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-ink">{editingStudent ? "학생 정보 수정" : "학생 등록"}</h2>
          <p className="mt-1 text-sm text-ink/60">연락문 생성에 필요한 기본 정보를 저장합니다.</p>
        </div>
        {editingStudent && (
          <button
            className="inline-flex h-9 items-center gap-2 rounded-md border border-black/10 px-3 text-sm font-semibold text-ink hover:bg-linen"
            onClick={onCancelEdit}
            type="button"
          >
            <X size={16} />
            취소
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">학생 이름</span>
          <input
            className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="예: 정원"
            value={values.name}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">학년</span>
          <input
            className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
            onChange={(event) => updateField("grade", event.target.value)}
            placeholder="예: 중2"
            value={values.grade}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">학교</span>
          <input
            className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
            onChange={(event) => updateField("school", event.target.value)}
            placeholder="예: 루트중"
            value={values.school}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">과목</span>
          <input
            className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
            onChange={(event) => updateField("subject", event.target.value)}
            placeholder="예: 영어"
            value={values.subject}
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-ink">보호자 호칭</span>
          <select
            className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
            onChange={(event) => updateField("parentTitle", event.target.value)}
            value={values.parentTitle}
          >
            <option value="어머니">어머니</option>
            <option value="아버님">아버님</option>
            <option value="보호자님">보호자님</option>
          </select>
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-semibold text-ink">학생 메모</span>
        <textarea
          className="min-h-28 w-full resize-none rounded-md border border-black/15 bg-white p-3 text-sm leading-6 outline-none focus:border-moss"
          onChange={(event) => updateField("memo", event.target.value)}
          placeholder="학습 성향, 주의할 점, 자주 쓰는 표현 등을 적어두세요."
          value={values.memo}
        />
      </label>

      <div className="mt-5 flex gap-2">
        <button
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-coral px-4 text-sm font-bold text-white shadow-soft hover:bg-[#bf584c] disabled:bg-ink/25"
          disabled={!canSubmit || isSubmitting}
          onClick={onSubmit}
          type="button"
        >
          {editingStudent ? <Check size={18} /> : <Plus size={18} />}
          {isSubmitting ? "저장 중" : editingStudent ? "수정 저장" : "학생 추가"}
        </button>
        {!editingStudent && (
          <button
            className="inline-flex h-11 items-center justify-center rounded-md border border-black/10 px-4 text-sm font-semibold text-ink hover:bg-linen"
            onClick={() => onChange(emptyValues)}
            type="button"
          >
            초기화
          </button>
        )}
      </div>
    </section>
  );
}

export function createEmptyStudentFormValues(): StudentFormValues {
  return emptyValues;
}
