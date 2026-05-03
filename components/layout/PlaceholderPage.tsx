import { Sparkles } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

export function PlaceholderPage({ eyebrow, title, description, items }: PlaceholderPageProps) {
  return (
    <>
      <PageHeader
        action={
          <Link
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white shadow-soft hover:bg-moss"
            href="/messages/new"
          >
            <Sparkles size={18} />
            연락문 생성
          </Link>
        }
        eyebrow={eyebrow}
        title={title}
      />

      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <p className="max-w-2xl text-sm leading-6 text-ink/70">{description}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <div className="rounded-md border border-black/10 bg-linen p-4 text-sm font-semibold text-ink" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
