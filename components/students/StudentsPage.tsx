"use client";

import { LogIn, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { createEmptyStudentFormValues, StudentForm } from "@/components/students/StudentForm";
import { StudentList } from "@/components/students/StudentList";
import { mapStudentFormValues, mapStudentRow, type StudentRow } from "@/lib/studentsMapper";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Student, StudentFormValues } from "@/types/student";

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<StudentFormValues>(createEmptyStudentFormValues());
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const editingStudent = useMemo(
    () => students.find((student) => student.id === editingStudentId) ?? null,
    [editingStudentId, students],
  );

  const loadStudents = async () => {
    setIsLoading(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setUserId("");
      setStudents([]);
      setIsLoading(false);
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from("students")
      .select("id,name,grade,school,parent_title,subject,memo")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    setStudents(((data ?? []) as StudentRow[]).map(mapStudentRow));
    setIsLoading(false);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadStudents();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const resetForm = () => {
    setEditingStudentId(null);
    setFormValues(createEmptyStudentFormValues());
  };

  const handleEdit = (student: Student) => {
    setEditingStudentId(student.id);
    setFormValues({
      name: student.name,
      grade: student.grade,
      school: student.school,
      parentTitle: student.parentTitle,
      subject: student.subject,
      memo: student.memo,
    });
  };

  const handleSubmit = async () => {
    const cleanedValues = mapStudentFormValues(formValues);

    if (!cleanedValues.name || !cleanedValues.subject || !userId) {
      return;
    }

    setIsSaving(true);
    setMessage("");
    const supabase = createSupabaseBrowserClient();

    if (editingStudentId) {
      const { error } = await supabase.from("students").update(cleanedValues).eq("id", editingStudentId);
      setIsSaving(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      await loadStudents();
      resetForm();
      return;
    }

    const { error } = await supabase.from("students").insert({ ...cleanedValues, user_id: userId });
    setIsSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    await loadStudents();
    resetForm();
  };

  const handleDelete = async (studentId: string) => {
    setMessage("");
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from("students").delete().eq("id", studentId);

    if (error) {
      setMessage(error.message);
      return;
    }

    await loadStudents();

    if (studentId === editingStudentId) {
      resetForm();
    }
  };

  if (!isLoading && !userId) {
    return (
      <>
        <PageHeader eyebrow="학생 관리" title="로그인이 필요합니다" />
        <section className="rounded-lg border border-black/10 bg-white p-6 shadow-soft">
          <p className="text-sm leading-6 text-ink/70">학생 정보는 사용자별로 분리해서 저장합니다. 먼저 로그인한 뒤 학생을 등록해주세요.</p>
          <Link
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white shadow-soft hover:bg-moss"
            href="/login"
          >
            <LogIn size={18} />
            로그인하기
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        action={
          <button
            className="inline-flex h-10 items-center gap-2 rounded-md border border-black/10 bg-white px-4 text-sm font-semibold text-ink hover:bg-linen"
            onClick={() => void loadStudents()}
            type="button"
          >
            <RefreshCw size={17} />
            새로고침
          </button>
        }
        eyebrow="학생 관리"
        title="연락문에 쓸 학생 정보를 관리"
      />

      {message && <p className="mb-4 rounded-md bg-linen p-3 text-sm font-semibold text-ink/70">{message}</p>}

      {isLoading ? (
        <section className="rounded-lg border border-black/10 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-ink/65">학생 정보를 불러오는 중입니다.</p>
        </section>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[minmax(360px,0.85fr)_minmax(0,1.15fr)]">
          <StudentForm
            editingStudent={editingStudent}
            isSubmitting={isSaving}
            onCancelEdit={resetForm}
            onChange={setFormValues}
            onSubmit={() => void handleSubmit()}
            values={formValues}
          />
          <StudentList onDelete={(studentId) => void handleDelete(studentId)} onEdit={handleEdit} students={students} />
        </div>
      )}
    </>
  );
}
