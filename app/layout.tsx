import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "말모아",
  description: "수업 메모를 학부모 연락문으로 정리하는 AI 운영 보조 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
