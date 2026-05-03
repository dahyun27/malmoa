"use client";

import { Check, Clipboard, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { deleteMessageHistoryRecord, getMessageHistoryRecords } from "@/lib/messageHistoryStore";
import type { MessageHistoryRecord } from "@/types/message";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function MessageHistoryPage() {
  const [records, setRecords] = useState<MessageHistoryRecord[]>([]);
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setRecords(getMessageHistoryRecords());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return records;
    }

    return records.filter((record) =>
      [record.studentName, record.studentGrade, record.situation, record.tone, record.inputMemo]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, records]);

  const handleCopy = async (record: MessageHistoryRecord) => {
    await navigator.clipboard.writeText(record.softMessage);
    setCopiedId(record.id);
    window.setTimeout(() => setCopiedId(""), 1500);
  };

  const handleDelete = (recordId: string) => {
    setRecords(deleteMessageHistoryRecord(recordId));
  };

  return (
    <>
      <PageHeader eyebrow="생성 기록" title="이전에 만든 연락문" />

      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink">저장된 연락문</h2>
            <p className="mt-1 text-sm text-ink/60">최근 생성 기록 최대 30개를 이 브라우저에 저장합니다.</p>
          </div>
          <input
            className="h-10 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss md:w-72"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="학생, 상황, 메모 검색"
            value={query}
          />
        </div>

        <div className="mt-5 space-y-3">
          {filteredRecords.length === 0 ? (
            <div className="rounded-md border border-dashed border-black/15 bg-linen p-6 text-center">
              <p className="font-semibold text-ink">아직 저장된 생성 기록이 없습니다.</p>
              <p className="mt-2 text-sm text-ink/60">연락문 생성 화면에서 생성 버튼을 누르면 이곳에 기록됩니다.</p>
            </div>
          ) : (
            filteredRecords.map((record) => {
              const isCopied = copiedId === record.id;

              return (
                <article className="rounded-md border border-black/10 bg-linen p-4" key={record.id}>
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-ink">{record.studentName}</h3>
                        <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-moss">
                          {record.studentGrade}
                        </span>
                        <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-moss">
                          {record.situation}
                        </span>
                        <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-moss">
                          {record.tone}
                        </span>
                      </div>
                      <p className="mt-2 text-xs font-semibold text-ink/50">{formatDateTime(record.createdAt)}</p>
                      <p className="mt-3 text-sm leading-6 text-ink/65">{record.inputMemo}</p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        className="inline-flex h-9 items-center gap-2 rounded-md border border-black/10 bg-white px-3 text-sm font-semibold text-ink hover:bg-sage"
                        onClick={() => handleCopy(record)}
                        type="button"
                      >
                        {isCopied ? <Check size={16} /> : <Clipboard size={16} />}
                        {isCopied ? "복사됨" : "복사"}
                      </button>
                      <button
                        aria-label={`${record.studentName} 기록 삭제`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-white text-coral hover:bg-white/70"
                        onClick={() => handleDelete(record.id)}
                        type="button"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-md bg-white p-4">
                    <p className="whitespace-pre-line text-sm leading-7 text-ink/78">{record.softMessage}</p>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
