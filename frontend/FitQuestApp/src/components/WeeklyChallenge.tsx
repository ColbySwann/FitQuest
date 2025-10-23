import { Card, CardTitle, CardSubtle } from "./ui/Card";

export default function WeeklyChallenges({
                                             endsIn = "6 days 12 hours",
                                             challenges = [
                                                 { id: "w1", name: "Weekly Warrior", progress: "0 / 5", xp: 500, pts: 2000 },
                                                 { id: "w2", name: "Endurance Marathon", progress: "0 / 180", xp: 800, pts: 3000 },
                                                 { id: "w3", name: "Point Collector", progress: "0 / 3000", xp: 600, pts: 2500 },
                                             ],
                                         }: {
    endsIn?: string;
    challenges?: { id: string; name: string; progress: string; xp: number; pts: number }[];
}) {
    return (
        <Card>
            <CardTitle>Weekly Challenges</CardTitle>
            <CardSubtle>Ends in {endsIn}</CardSubtle>
            <div className="mt-4 space-y-3">
                {challenges.map((c) => (
                    <div key={c.id} className="p-3 bg-[var(--panel-muted)] rounded-md border border-[var(--border)]">
                        <div className="text-sm font-semibold">{c.name}</div>
                        <div className="text-xs text-[var(--fg-muted)]">Progress: {c.progress}</div>
                        <div className="text-xs text-[var(--accent)] mt-1">+{c.xp} XP • +{c.pts} pts</div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
