

export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
    const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
    return (
        <div className="w-full h-3 bg-[var(--panel-muted)] border border-[var(--border)] rounded overflow-hidden">
            <div
                className="h-full bg-[var(--gold)] transition-all"
                style={{ width: `${pct}%` }}
            />
        </div>
    );
}
