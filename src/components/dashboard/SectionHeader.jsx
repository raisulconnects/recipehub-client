export default function SectionHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}