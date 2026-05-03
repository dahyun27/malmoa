"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MessageCreateForm } from "@/components/messages/MessageCreateForm";
import { MessageResultsPanel } from "@/components/messages/MessageResultsPanel";
import { sampleMemo, situations, students, tones } from "@/lib/demoData";
import { generateParentMessages } from "@/lib/generateParentMessages";
import { saveMessageHistoryRecord } from "@/lib/messageHistoryStore";
import { defaultSettings, getAppSettings } from "@/lib/settingsStore";
import type { GeneratedMessage } from "@/types/message";
import type { AppSettings } from "@/types/settings";

export function MessageCreatePage() {
  const [selectedStudent, setSelectedStudent] = useState(students[0].id);
  const [situation, setSituation] = useState(situations[0]);
  const [tone, setTone] = useState(tones[0]);
  const [memo, setMemo] = useState(sampleMemo);
  const [copiedId, setCopiedId] = useState("");
  const [hasGenerated, setHasGenerated] = useState(true);
  const [savedLabel, setSavedLabel] = useState("");
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const loadedSettings = getAppSettings();
      setSettings(loadedSettings);
      setTone(loadedSettings.defaultTone);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const student = useMemo(
    () => students.find((item) => item.id === selectedStudent) ?? students[0],
    [selectedStudent],
  );

  const generated = useMemo(
    () =>
      generateParentMessages(student.name, student.parentTitle, situation, memo, {
        academyName: settings.academyName,
        signature: settings.messageSignature,
      }),
    [memo, settings.academyName, settings.messageSignature, situation, student.name, student.parentTitle],
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

  const handleGenerate = () => {
    const now = new Date();

    saveMessageHistoryRecord({
      id: `message-${now.getTime()}`,
      studentName: student.name,
      studentGrade: student.grade,
      parentTitle: student.parentTitle,
      situation,
      tone,
      inputMemo: memo,
      shortMessage: generated.shortMessage,
      softMessage: generated.softMessage,
      firmMessage: generated.firmMessage,
      createdAt: now.toISOString(),
    });
    setHasGenerated(true);
    setSavedLabel("생성 기록에 저장됨");
    window.setTimeout(() => setSavedLabel(""), 1800);
  };

  return (
    <>
      <PageHeader
        action={
          <div className="flex flex-col gap-2 sm:items-end">
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white shadow-soft hover:bg-moss"
              type="button"
            >
              <Sparkles size={18} />
              무료 MVP
            </button>
            {savedLabel && <p className="text-xs font-semibold text-moss">{savedLabel}</p>}
          </div>
        }
        eyebrow="학부모 연락문 생성"
        title="오늘 수업 메모를 바로 보낼 문장으로"
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
        <MessageCreateForm
          memo={memo}
          onGenerate={handleGenerate}
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
