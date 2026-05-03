"use client";

import { BookOpenText, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length >= 6;

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    const authResult =
      mode === "sign-in"
        ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
        : await supabase.auth.signUp({ email: email.trim(), password });

    setIsSubmitting(false);

    if (authResult.error) {
      setMessage(authResult.error.message);
      return;
    }

    if (mode === "sign-up" && !authResult.data.session) {
      setMessage("가입 확인 메일을 확인한 뒤 다시 로그인해주세요.");
      return;
    }

    router.push("/students");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <section className="w-full max-w-md rounded-lg border border-black/10 bg-white p-6 shadow-soft">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white">
            <BookOpenText size={22} />
          </div>
          <div>
            <p className="text-xl font-bold text-ink">말모아</p>
            <p className="text-sm text-ink/55">학생 정보를 안전하게 저장합니다.</p>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 rounded-md bg-linen p-1">
          <button
            className={`h-10 rounded-md text-sm font-bold ${mode === "sign-in" ? "bg-white text-ink shadow-soft" : "text-ink/55"}`}
            onClick={() => setMode("sign-in")}
            type="button"
          >
            로그인
          </button>
          <button
            className={`h-10 rounded-md text-sm font-bold ${mode === "sign-up" ? "bg-white text-ink shadow-soft" : "text-ink/55"}`}
            onClick={() => setMode("sign-up")}
            type="button"
          >
            회원가입
          </button>
        </div>

        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-ink">이메일</span>
            <input
              className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              type="email"
              value={email}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-ink">비밀번호</span>
            <input
              className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm outline-none focus:border-moss"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="6자 이상"
              type="password"
              value={password}
            />
          </label>
        </div>

        {message && <p className="mt-4 rounded-md bg-linen p-3 text-sm font-semibold text-ink/70">{message}</p>}

        <button
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-coral px-4 text-sm font-bold text-white shadow-soft hover:bg-[#bf584c] disabled:bg-ink/25"
          disabled={!canSubmit || isSubmitting}
          onClick={handleSubmit}
          type="button"
        >
          {mode === "sign-in" ? <LogIn size={18} /> : <UserPlus size={18} />}
          {isSubmitting ? "처리 중" : mode === "sign-in" ? "로그인" : "회원가입"}
        </button>
      </section>
    </main>
  );
}
