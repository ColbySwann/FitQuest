import { Card, CardTitle } from "./ui/Card";

export default function RewardsSystem({
                                          rewards = ["Strength Champion", "Endurance Hero", "Halloween Horror", "Thanksgiving Champion"],
                                      }: { rewards?: string[] }) {
    return (
        <Card>
            <CardTitle>Achievements</CardTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {rewards.map((r) => (
                    <div key={r} className="bg-[var(--panel-muted)] border border-[var(--border)] rounded-md text-center py-6">
                        <p className="text-sm">{r}</p>
                        <p className="text-[10px] text-purple-400 mt-1">Epic</p>
                        <p className="text-[10px] text-[var(--fg-muted)] mt-1">Complete {r.split(" ")[0]} event</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}
