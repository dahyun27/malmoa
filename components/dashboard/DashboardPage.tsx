"use client";

import { ArrowRight, History, MessageSquareText, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { students } from "@/lib/demoData";
import { getMessageHistoryRecords } from "@/lib/messageHistoryStore";
import { defaultSettings, getAppSettings } from "@/lib/settingsStore";
import type { MessageHistoryRecord } from "@/types/message";
import type { AppSettings } from "@/types/settings";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function DashboardPage() {
  const [records, setRecords] = useState<MessageHistoryRecord[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setRecords(getMessageHistoryRecords());
      setSettings(getAppSettings());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const monthlyRecordCount = useMemo(() => {
    const now = new Date();

    return records.filter((record) => {
      const createdAt = new Date(record.createdAt);
      return createdAt.getFullYear() === now.getFullYear() && createdAt.getMonth() === now.getMonth();
    }).length;
  }, [records]);

  const recentRecords = records.slice(0, 3);

  const metrics = [
    { label: "이번 달 생성", value: `${monthlyRecordCount}건`, detail: "브라우저 저장 기록 기준" },
    { label: "등록 학생", value: `${students.length}명`, detail: "현재 더미 데이터 기준" },
    { label: "기본 톤", value: settings.defaultTone, detail: settings.academyName },
  ];

  const quickActions = [
    { href: "/messages/new", label: "연락문 생성", description: "수업 메모로 학부모 연락문 만들기", Icon: MessageSquareText },
    { href: "/students", label: "학생 관리", description: "학생 정보와 보호자 호칭 정리", Icon: Users },
    { href: "/messages/history", label: "생성 기록", description: "최근 연락문 다시 확인하고 복사", Icon: History },
    { href: "/settings", label: "설정", description: "학원명, 기본 톤, 서명 관리", Icon: Settings },
  ];

  return (
    <>
      <PageHeader eyebrow="대시보드" title="운영 현황을 한눈에" />

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft" key={metric.label}>
            <p className="text-sm font-semibold text-moss">{metric.label}</p>
            <p className="mt-3 text-3xl font-bold text-ink">{metric.value}</p>
            <p className="mt-2 text-sm text-ink/55">{metric.detail}</p>
          </section>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(380px,0.75fr)]">
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-ink">빠른 작업</h2>
            <p className="mt-1 text-sm text-ink/60">자주 쓰는 흐름으로 바로 이동합니다.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {quickActions.map(({ href, label, description, Icon }) => (
              <Link
                className="group rounded-md border border-black/10 bg-linen p-4 transition hover:border-moss hover:bg-sage"
                href={href}
                key={href}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-moss">
                    <Icon size={19} />
                  </div>
                  <ArrowRight className="text-ink/35 transition group-hover:translate-x-0.5 group-hover:text-ink" size={18} />
                </div>
                <h3 className="mt-4 font-bold text-ink">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/65">{description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-ink">최근 생성 기록</h2>
              <p className="mt-1 text-sm text-ink/60">최근 3개 연락문을 보여줍니다.</p>
            </div>
            <Link className="text-sm font-bold text-moss hover:text-ink" href="/messages/history">
              전체 보기
            </Link>
          </div>

          <div className="space-y-3">
            {recentRecords.length === 0 ? (
              <div className="rounded-md border border-dashed border-black/15 bg-linen p-5">
                <p className="font-semibold text-ink">아직 생성 기록이 없습니다.</p>
                <p className="mt-2 text-sm leading-6 text-ink/60">연락문을 생성하면 이곳에서 바로 확인할 수 있습니다.</p>
              </div>
            ) : (
              recentRecords.map((record) => (
                <Link
                  className="block rounded-md border border-black/10 bg-linen p-4 hover:bg-sage"
                  href="/messages/history"
                  key={record.id}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-ink">{record.studentName}</span>
                    <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-moss">{record.situation}</span>
                    <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-moss">{record.tone}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/65">{record.softMessage}</p>
                  <p className="mt-2 text-xs font-semibold text-ink/45">{formatDateTime(record.createdAt)}</p>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}
