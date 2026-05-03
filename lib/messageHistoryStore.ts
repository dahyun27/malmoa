import type { MessageHistoryRecord } from "@/types/message";

const STORAGE_KEY = "malmoa.messageHistory";

function parseRecords(value: string | null): MessageHistoryRecord[] {
  if (!value) {
    return [];
  }

  try {
    const records = JSON.parse(value);
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}

export function getMessageHistoryRecords(): MessageHistoryRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  return parseRecords(window.localStorage.getItem(STORAGE_KEY));
}

export function saveMessageHistoryRecord(record: MessageHistoryRecord) {
  if (typeof window === "undefined") {
    return;
  }

  const records = getMessageHistoryRecords();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...records].slice(0, 30)));
}

export function deleteMessageHistoryRecord(recordId: string) {
  if (typeof window === "undefined") {
    return [];
  }

  const records = getMessageHistoryRecords().filter((record) => record.id !== recordId);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return records;
}
