"use client";

import { Check, RotateCcw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { tones } from "@/lib/demoData";
import { defaultSettings, getAppSettings, saveAppSettings } from "@/lib/settingsStore";
import type { AppSettings } from "@/types/settings";

export function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [savedLabel, setSavedLabel] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSettings(getAppSettings());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const updateField = (field: keyof AppSettings, value: string) => {
    setSettings((currentSettings) => ({ ...currentSettings, [field]: value }));
  };

  const handleSave = () => {
    const cleanedSettings = {
      academyName: settings.academyName.trim() || defaultSettings.academyName,
      ownerName: settings.ownerName.trim() || defaultSettings.ownerName,
      defaultTone: settings.defaultTone,
      messageSignature: settings.messageSignature.trim(),
    };

    setSettings(cleanedSettings);
    saveAppSettings(cleanedSettings);
    setSavedLabel("설정이 저장되었습니다");
    window.setTimeout(() => setSavedLabel(""), 1800);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    saveAppSettings(defaultSettings);
    setSavedLabel("기본값으로 되돌렸습니다");
    window.setTimeout(() => setSavedLabel(""), 1800);
  };

  return (
    <>
      <PageHeader
        action={
          <div className="flex flex-col gap-2 sm:items-end">
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white shadow-soft hover:bg-moss"
              onClick={handleSave}
              type="button"
            >
              {savedLabel ? <Check size={18} /> : <Save size={18} />}
              저장
            </button>
            {savedLabel && <p className="text-xs font-semibold text-moss">{savedLabel}</p>}
          </div>
        }
        eyebrow="설정"
        title="말모아 기본값 설정"
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.65fr)]">
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-ink">학원 정보</h2>
            <p className="mt-1 text-sm text-ink/60">연락문 인사말과 기본 생성값에 사용할 정보를 저장합니다.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">학원명</span>
              <input
                className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
                onChange={(event) => updateField("academyName", event.target.value)}
                placeholder="예: 루트업 영어학원"
                value={settings.academyName}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">원장명</span>
              <input
                className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
                onChange={(event) => updateField("ownerName", event.target.value)}
                placeholder="예: 김다현"
                value={settings.ownerName}
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-semibold text-ink">기본 톤</span>
              <select
                className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
                onChange={(event) => updateField("defaultTone", event.target.value)}
                value={settings.defaultTone}
              >
                {tones.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-sm font-semibold text-ink">연락문 서명</span>
            <textarea
              className="min-h-32 w-full resize-none rounded-md border border-black/15 bg-white p-3 text-sm leading-6 outline-none focus:border-moss"
              onChange={(event) => updateField("messageSignature", event.target.value)}
              placeholder="예: 루트업 영어학원 원장 드림"
              value={settings.messageSignature}
            />
          </label>

          <div className="mt-5 flex gap-2">
            <button
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-coral px-4 text-sm font-bold text-white shadow-soft hover:bg-[#bf584c]"
              onClick={handleSave}
              type="button"
            >
              <Save size={18} />
              설정 저장
            </button>
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-black/10 px-4 text-sm font-semibold text-ink hover:bg-linen"
              onClick={handleReset}
              type="button"
            >
              <RotateCcw size={17} />
              기본값
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">미리보기</h2>
          <div className="mt-5 space-y-4 text-sm text-ink/75">
            <div className="rounded-md bg-linen p-4">
              <p className="text-xs font-bold text-moss">인사말</p>
              <p className="mt-2">{`어머니, 안녕하세요. ${settings.academyName || defaultSettings.academyName}입니다.`}</p>
            </div>
            <div className="rounded-md bg-linen p-4">
              <p className="text-xs font-bold text-moss">기본 톤</p>
              <p className="mt-2">{settings.defaultTone}</p>
            </div>
            <div className="rounded-md bg-linen p-4">
              <p className="text-xs font-bold text-moss">서명</p>
              <p className="mt-2 whitespace-pre-line">{settings.messageSignature || "서명 없음"}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
