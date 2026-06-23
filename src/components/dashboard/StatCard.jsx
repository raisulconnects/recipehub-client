import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  iconClass = "",
}) {
  return (
    <Card className="border-white/20 bg-white/70 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
            <h3 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              {value}
            </h3>
            {hint ? (
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                {hint}
              </p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
            <Icon className={`text-xl text-emerald-500 ${iconClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
