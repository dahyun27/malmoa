"use client";

import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MessageCreateForm } from "@/components/messages/MessageCreateForm";
import { MessageResultsPanel } from "@/components/messages/MessageResultsPanel";
import { sampleMemo, situations, students, tones } from "@/lib/demoData";
import { generateParentMessages } from "@/lib/generateParentMessages";
import type { GeneratedMessage } from "@/types/message";

export function MessageCreatePage() {
  const [selectedStudent, setSelectedStudent] = useState(students[0].id);
  const [situation, setSituation] = useState(situations[0]);
  const [tone, setTone] = useState(tones[0]);
  const [memo, setMemo] = useState(sampleMemo);
  const [copiedId, setCopiedId] = useState("");
  const [hasGenerated, setHasGenerated] = useState(true);

  const student = useMemo(
    () => students.find((item) => item.id === selectedStudent) ?? students[0],
    [selectedStudent],
  );

  const generated = useMemo(
    () => generateParentMessages(student.name, student.parentTitle, situation, memo),
    [memo, situation, student.name, student.parentTitle],
  );

  const results: GeneratedMessage[] = [
    { id: "short", title: "짧은 문자 버전", value: generated.shortMessage },
    { id: "soft", title: "부드러운 버전", value: generated.softMessage },
    { id: "firm", title: "단호한 버전", value: generated.firmMessage },
  ];

  const handleCopy = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(""), 1500);
  };

  return (
    <>
      <PageHeader
        action={
          <button
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white shadow-soft hover:bg-moss"
            type="button"
          >
            <Sparkles size={18} />
            무료 MVP
          </button>
        }
        eyebrow="학부모 연락문 생성"
        title="오늘 수업 메모를 바로 보낼 문장으로"
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
        <MessageCreateForm
          memo={memo}
          onGenerate={() => setHasGenerated(true)}
          onMemoChange={setMemo}
          onSituationChange={setSituation}
          onStudentChange={setSelectedStudent}
          onToneChange={setTone}
          selectedStudent={selectedStudent}
          situation={situation}
          situations={situations}
          students={students}
          tone={tone}
          tones={tones}
        />
        <MessageResultsPanel
          copiedId={copiedId}
          hasGenerated={hasGenerated}
          onCopy={handleCopy}
          results={results}
          student={student}
          tone={tone}
        />
      </div>
    </>
  );
}
