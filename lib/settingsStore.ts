import type { AppSettings } from "@/types/settings";

const STORAGE_KEY = "malmoa.settings";

export const defaultSettings: AppSettings = {
  academyName: "루트업 영어학원",
  ownerName: "원장",
  defaultTone: "부드럽게",
  messageSignature: "",
};

function isSettings(value: unknown): value is Partial<AppSettings> {
  return Boolean(value) && typeof value === "object";
}

export function getAppSettings(): AppSettings {
  if (typeof window === "undefined") {
    return defaultSettings;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return defaultSettings;
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    return isSettings(parsedValue) ? { ...defaultSettings, ...parsedValue } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveAppSettings(settings: AppSettings) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
