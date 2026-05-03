export type Student = {
  id: string;
  name: string;
  grade: string;
  school: string;
  parentTitle: string;
  subject: string;
  memo: string;
};

export type StudentFormValues = Omit<Student, "id">;
