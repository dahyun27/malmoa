"use client";

import { BookOpenText, History, LayoutDashboard, LogIn, LogOut, MessageSquareText, Settings, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const navigation: Array<{ href: string; label: string; Icon: LucideIcon }> = [
  { href: "/dashboard", label: "대시보드", Icon: LayoutDashboard },
  { href: "/messages/new", label: "연락문 생성", Icon: MessageSquareText },
  { href: "/students", label: "학생 관리", Icon: Users },
  { href: "/messages/history", label: "생성 기록", Icon: History },
  { href: "/settings", label: "설정", Icon: Settings },
];

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const supabase = createSupabaseBrowserClient();
      void supabase.auth.getUser().then(({ data }) => {
        setUserEmail(data.user?.email ?? "");
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setUserEmail("");
    router.push("/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-black/10 bg-white/70 px-5 py-6 backdrop-blur lg:block">
          <Link className="mb-9 flex items-center gap-3" href="/messages/new">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-white">
              <BookOpenText size={21} />
            </div>
            <div>
              <p className="text-lg font-bold text-ink">말모아</p>
              <p className="text-xs text-ink/55">AI 운영 보조</p>
            </div>
          </Link>

          <nav className="space-y-1">
            {navigation.map(({ href, label, Icon }) => {
              const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

              return (
                <Link
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm ${
                    isActive ? "bg-sage text-ink" : "text-ink/65 hover:bg-black/5"
                  }`}
                  href={href}
                  key={href}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-black/10 pt-4">
            {userEmail ? (
              <div className="space-y-3">
                <p className="break-all text-xs font-semibold text-ink/55">{userEmail}</p>
                <button
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-ink/65 hover:bg-black/5"
                  onClick={handleSignOut}
                  type="button"
                >
                  <LogOut size={18} />
                  로그아웃
                </button>
              </div>
            ) : (
              <Link className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-ink/65 hover:bg-black/5" href="/login">
                <LogIn size={18} />
                로그인
              </Link>
            )}
          </div>
        </aside>

        <section className="flex-1 px-5 py-5 md:px-8 lg:px-10">{children}</section>
      </div>
    </main>
  );
}
