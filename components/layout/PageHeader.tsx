type PageHeaderProps = {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, action }: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 border-b border-black/10 pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-moss">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-bold text-ink md:text-3xl">{title}</h1>
      </div>
      {action}
    </header>
  );
}
