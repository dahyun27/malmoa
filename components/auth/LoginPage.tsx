"use client";

import { BookOpenText, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuthErrorMessage } from "@/lib/authMessages";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Notice = {
  tone: "error" | "success";
  text: string;
};

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length >= 6;

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    const supabase = createSupabaseBrowserClient();
    const authResult =
      mode === "sign-in"
        ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
        : await supabase.auth.signUp({ email: email.trim(), password });

    setIsSubmitting(false);

    if (authResult.error) {
      setNotice({ tone: "error", text: getAuthErrorMessage(authResult.error.message) });
      return;
    }

    if (mode === "sign-up" && !authResult.data.session) {
      setNotice({ tone: "success", text: "가입 확인 메일을 보냈습니다. 메일 인증을 완료한 뒤 로그인해주세요." });
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
            onClick={() => {
              setMode("sign-in");
              setNotice(null);
            }}
            type="button"
          >
            로그인
          </button>
          <button
            className={`h-10 rounded-md text-sm font-bold ${mode === "sign-up" ? "bg-white text-ink shadow-soft" : "text-ink/55"}`}
            onClick={() => {
              setMode("sign-up");
              setNotice(null);
            }}
            type="button"
          >
            회원가입
          </button>
        </div>

        <p className="mb-5 rounded-md bg-linen p-3 text-sm leading-6 text-ink/65">
          {mode === "sign-in"
            ? "가입한 선생님 계정으로 로그인하면 학생 정보를 불러옵니다."
            : "선생님 계정을 새로 만듭니다. Supabase 설정에 따라 이메일 인증이 필요할 수 있습니다."}
        </p>

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

        {notice && (
          <p
            className={`mt-4 rounded-md p-3 text-sm font-semibold ${
              notice.tone === "success" ? "bg-sage text-ink" : "bg-linen text-coral"
            }`}
          >
            {notice.text}
          </p>
        )}

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
