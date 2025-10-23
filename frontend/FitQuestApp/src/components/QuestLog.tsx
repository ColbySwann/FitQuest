import { Card, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";

export type Quest = {
    id: string; name: string; description: string;
    xpReward: number; pointsReward: number;
    difficulty: "Common"|"Rare"|"Epic"|"Legendary";
    category: "strength"|"endurance"|"agility"|"cardio"; duration: number;
};

export default function QuestLog({
                                     quests = [],
                                     onCompleteQuest = (q: Quest) => {},
                                 }: { quests?: Quest[]; onCompleteQuest?: (q: Quest) => void }) {
    return (
        <Card>
            <CardTitle>Quest Log</CardTitle>
            {quests.length === 0 ? (
                <p className="text-sm text-[var(--fg-muted)]">No available quests.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {quests.map((q) => (
                        <div key={q.id} className="border border-[var(--border)] rounded-lg p-4 bg-[var(--panel-muted)]">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="font-semibold">{q.name}</div>
                                    <div className="text-xs text-[var(--fg-muted)]">{q.description}</div>
                                    <div className="text-xs mt-2">
                                        <span className="text-[var(--accent)] font-medium">+{q.xpReward} XP</span>
                                        <span className="mx-2 text-[var(--fg-muted)]">•</span>
                                        <span className="text-[var(--gold)] font-medium">+{q.pointsReward} pts</span>
                                    </div>
                                </div>
                                <span className="text-[10px] px-2 py-1 rounded bg-[var(--panel)] border border-[var(--border)]">
                  {q.difficulty}
                </span>
                            </div>
                            <div className="mt-3 flex justify-end">
                                <Button onClick={() => onCompleteQuest(q)}>Complete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
