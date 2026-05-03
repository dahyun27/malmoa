"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { createEmptyStudentFormValues, StudentForm } from "@/components/students/StudentForm";
import { StudentList } from "@/components/students/StudentList";
import { students as demoStudents } from "@/lib/demoData";
import type { Student, StudentFormValues } from "@/types/student";

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(demoStudents);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<StudentFormValues>(createEmptyStudentFormValues());

  const editingStudent = useMemo(
    () => students.find((student) => student.id === editingStudentId) ?? null,
    [editingStudentId, students],
  );

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

  const handleSubmit = () => {
    const cleanedValues = {
      name: formValues.name.trim(),
      grade: formValues.grade.trim(),
      school: formValues.school.trim(),
      parentTitle: formValues.parentTitle,
      subject: formValues.subject.trim(),
      memo: formValues.memo.trim(),
    };

    if (!cleanedValues.name || !cleanedValues.subject) {
      return;
    }

    if (editingStudentId) {
      setStudents((currentStudents) =>
        currentStudents.map((student) =>
          student.id === editingStudentId ? { ...student, ...cleanedValues } : student,
        ),
      );
      resetForm();
      return;
    }

    setStudents((currentStudents) => [
      {
        id: `student-${Date.now()}`,
        ...cleanedValues,
      },
      ...currentStudents,
    ]);
    resetForm();
  };

  const handleDelete = (studentId: string) => {
    setStudents((currentStudents) => currentStudents.filter((student) => student.id !== studentId));

    if (studentId === editingStudentId) {
      resetForm();
    }
  };

  return (
    <>
      <PageHeader eyebrow="학생 관리" title="연락문에 쓸 학생 정보를 관리" />

      <div className="grid gap-5 xl:grid-cols-[minmax(360px,0.85fr)_minmax(0,1.15fr)]">
        <StudentForm
          editingStudent={editingStudent}
          onCancelEdit={resetForm}
          onChange={setFormValues}
          onSubmit={handleSubmit}
          values={formValues}
        />
        <StudentList onDelete={handleDelete} onEdit={handleEdit} students={students} />
      </div>
    </>
  );
}
