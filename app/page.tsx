"use client";

import {
  BookOpenText,
  Check,
  Clipboard,
  History,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { generateParentMessages } from "@/lib/generateParentMessages";

const students = [
  { name: "정원", grade: "중2", parentTitle: "어머니", subject: "영어" },
  { name: "예진", grade: "초6", parentTitle: "어머니", subject: "수학" },
  { name: "도영", grade: "중1", parentTitle: "아버님", subject: "영어" },
];

const situations = ["숙제 미이행", "결석/지각", "시험 피드백", "칭찬 연락", "교재 안내", "일반 수업 피드백"];

const tones = ["부드럽게", "단호하게", "전문적으로", "짧게"];

const navigation: Array<{ label: string; Icon: LucideIcon }> = [
  { label: "대시보드", Icon: LayoutDashboard },
  { label: "연락문 생성", Icon: MessageSquareText },
  { label: "학생 관리", Icon: Users },
  { label: "생성 기록", Icon: History },
  { label: "설정", Icon: Settings },
];

const sampleMemo =
  "최근 숙제를 2주 연속 해오지 않았습니다. 개념 이해는 가능하지만 반복 연습이 부족하고, 특히 서술형 적용 연습이 더 필요합니다.";

export default function Home() {
  const [selectedStudent, setSelectedStudent] = useState(students[0].name);
  const [situation, setSituation] = useState(situations[0]);
  const [tone, setTone] = useState(tones[0]);
  const [memo, setMemo] = useState(sampleMemo);
  const [copied, setCopied] = useState("");
  const [hasGenerated, setHasGenerated] = useState(true);

  const student = useMemo(
    () => students.find((item) => item.name === selectedStudent) ?? students[0],
    [selectedStudent],
  );

  const generated = useMemo(
    () => generateParentMessages(student.name, student.parentTitle, situation, memo),
    [memo, situation, student.name, student.parentTitle],
  );

  const results = [
    { id: "short", title: "짧은 문자 버전", value: generated.shortMessage },
    { id: "soft", title: "부드러운 버전", value: generated.softMessage },
    { id: "firm", title: "단호한 버전", value: generated.firmMessage },
  ];

  const handleCopy = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(""), 1500);
  };

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-black/10 bg-white/70 px-5 py-6 backdrop-blur lg:block">
          <div className="mb-9 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-white">
              <BookOpenText size={21} />
            </div>
            <div>
              <p className="text-lg font-bold text-ink">말모아</p>
              <p className="text-xs text-ink/55">AI 운영 보조</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navigation.map(({ label, Icon }) => (
              <button
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm ${
                  label === "연락문 생성" ? "bg-sage text-ink" : "text-ink/65 hover:bg-black/5"
                }`}
                key={label}
                type="button"
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex-1 px-5 py-5 md:px-8 lg:px-10">
          <header className="mb-6 flex flex-col gap-4 border-b border-black/10 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-moss">학부모 연락문 생성</p>
              <h1 className="mt-1 text-2xl font-bold text-ink md:text-3xl">오늘 수업 메모를 바로 보낼 문장으로</h1>
            </div>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white shadow-soft hover:bg-moss" type="button">
              <Sparkles size={18} />
              무료 MVP
            </button>
          </header>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
            <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-ink">연락문 입력</h2>
                <p className="mt-1 text-sm text-ink/60">학생, 상황, 톤을 고르고 수업 메모를 입력하세요.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-ink">학생</span>
                  <select className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss" value={selectedStudent} onChange={(event) => setSelectedStudent(event.target.value)}>
                    {students.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name} · {item.grade} · {item.subject}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-ink">상황</span>
                  <select className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss" value={situation} onChange={(event) => setSituation(event.target.value)}>
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
                      type="button"
                      onClick={() => setTone(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-semibold text-ink">수업 메모</span>
                <textarea className="min-h-44 w-full resize-none rounded-md border border-black/15 bg-white p-3 text-sm leading-6 outline-none focus:border-moss" value={memo} onChange={(event) => setMemo(event.target.value)} />
              </label>

              <button className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-coral px-4 text-sm font-bold text-white shadow-soft hover:bg-[#bf584c]" type="button" onClick={() => setHasGenerated(true)}>
                <Sparkles size={18} />
                연락문 생성하기
              </button>
            </section>

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
                  <article className="rounded-lg border border-black/10 bg-white p-5 shadow-soft" key={result.id}>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="font-bold text-ink">{result.title}</h3>
                      <button className="inline-flex h-9 items-center gap-2 rounded-md border border-black/10 px-3 text-sm font-semibold text-ink hover:bg-sage" type="button" onClick={() => handleCopy(result.id, result.value)}>
                        {copied === result.id ? <Check size={16} /> : <Clipboard size={16} />}
                        {copied === result.id ? "복사됨" : "복사"}
                      </button>
                    </div>
                    <p className="whitespace-pre-line text-sm leading-7 text-ink/78">{result.value}</p>
                  </article>
                ))}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
