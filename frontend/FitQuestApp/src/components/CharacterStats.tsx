
import { Card, CardTitle, CardSubtle} from "./ui/Card.tsx";
import { ProgressBar } from "./ui/ProgressBar.tsx";

export default function CharacterStats({
    level = 1,
    currentXP = 0,
    xpToNextLevel = 500,
    strength = 10,
    endurance = 10,
    agility = 10,
    totalPoints = 0,
}: {
    level?: number; currentXP?: number; xpToNextLevel?: number;
    strength?: number; endurance?: number; agility?: number;
    totalPoints?: number;
}) {
    return (
        <Card>
            <CardTitle>Warrior Level</CardTitle>
            <div className={"text-2xl font-bold"}>{level}</div>
            <CardSubtle>{currentXP} / {xpToNextLevel} XP</CardSubtle>
            <div className={"mt-3"}>
                <ProgressBar value={currentXP} max={xpToNextLevel} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-5 text-center">
                <div>
                    <div className="text-red-400 text-xl font-bold">{strength}</div>
                    <div className="text-xs text-[var(--fg-muted)]">Strength</div>
                </div>
                <div>
                    <div className="text-red-400 text-xl font-bold">{endurance}</div>
                    <div className="text-xs text-[var(--fg-muted)]">Endurance</div>
                </div>
                <div>
                    <div className="text-red-400 text-xl font-bold">{agility}</div>
                    <div className="text-xs text-[var(--fg-muted)]">Agility</div>
                </div>
            </div>
            <div className="mt-4 text-xs text-[var(--fg-muted)]">
                Total Quest Points: <span className="text-[var(--fg)] font-semibold">{totalPoints}</span>
            </div>
        </Card>
    )
}