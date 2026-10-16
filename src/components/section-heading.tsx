export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
      )}
      <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 text-sm text-muted sm:text-base">{description}</p>}
    </div>
  );
}
