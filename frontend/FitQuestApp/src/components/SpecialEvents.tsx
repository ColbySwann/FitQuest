import { Card, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";

export type SpecialEvent = {
    id: string; name: string; description: string; theme: string;
    startDate: string; endDate: string; xpMultiplier: number; pointsMultiplier: number;
    specialReward: string; active: boolean;
};

export default function SpecialEvents({
                                          events = [],
                                          onParticipate = (id: string) => {},
                                      }: {
    events?: SpecialEvent[];
    onParticipate?: (id: string) => void;
}) {
    return (
        <Card>
            <CardTitle>Special Events</CardTitle>
            <div className="grid md:grid-cols-2 gap-4">
                {events.map((e) => (
                    <div key={e.id} className={`p-4 rounded-lg border ${e.active ? "border-[var(--gold)] glow-gold" : "border-[var(--border)]"} bg-[var(--panel-muted)]`}>
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">{e.name}</div>
                            <span className={`text-[10px] px-2 py-1 rounded border ${e.active ? "border-[var(--gold)] text-[var(--gold)]" : "border-[var(--border)] text-[var(--fg-muted)]"}`}>
                {e.active ? "Active" : "Upcoming"}
              </span>
                        </div>
                        <p className="text-xs text-[var(--fg-muted)] mt-1">{e.description}</p>
                        <p className="text-xs mt-2">
                            <span className="text-[var(--accent)]">XP x{e.xpMultiplier}</span>
                            <span className="mx-2 text-[var(--fg-muted)]">•</span>
                            <span className="text-[var(--gold)]">Points x{e.pointsMultiplier}</span>
                        </p>
                        <p className="text-[10px] text-[var(--fg-muted)] mt-1">
                            {e.startDate} – {e.endDate} • Reward: {e.specialReward}
                        </p>
                        <div className="mt-3">
                            <Button onClick={() => onParticipate(e.id)} variant="ghost">Participate</Button>
                        </div>
                    </div>
                ))}
                {events.length === 0 && <p className="text-sm text-[var(--fg-muted)]">No events to show.</p>}
            </div>
        </Card>
    );
}
