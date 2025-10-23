import { Card, CardTitle } from "./ui/Card";

export type LeaderboardEntry = { id: string; name: string; points: number };
export default function Leaderboard({
                                        entries = [
                                            { id: "u1", name: "IronWarrior", points: 8600 },
                                            { id: "u2", name: "SwiftRunner", points: 7200 },
                                            { id: "u3", name: "MightyBeast", points: 6500 },
                                            { id: "u4", name: "ShadowNinja", points: 5400 },
                                            { id: "u5", name: "ThunderFist", points: 4800 },
                                            { id: "u6", name: "PhoenixRise", points: 3900 },
                                        ],
                                    }: { entries?: LeaderboardEntry[] }) {
    return (
        <Card>
            <CardTitle>Leaderboard</CardTitle>
            <ul className="divide-y divide-[var(--border)]">
                {entries.map((e, i) => (
                    <li
                        key={e.id}
                        className={`flex justify-between py-2 px-3 rounded-md transition
              ${i === 0 ? "bg-yellow-900/30" : "hover:bg-[var(--panel-muted)]"}`}
                    >
                        <span className="font-medium">{i + 1}. {e.name}</span>
                        <span className="text-[var(--gold)] font-semibold">{e.points} pts</span>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
