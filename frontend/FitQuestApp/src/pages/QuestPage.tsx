
import QuestLog, {type Quest } from "../components/QuestLog.tsx";

const sampleQuests: Quest[] = [
    {id: "q1", name: "Morning Run", description: "Run 5km", xpReward: 150, pointsReward: 500, difficulty: "Common", category: "endurance", duration: 30},
    {id: "q2", name: "Warrior Strength", description: "3 sets heavy lifts", xpReward: 200, pointsReward: 750, difficulty: "Rare", category: "strength", duration: 45},
];

export default function QuestPage() {
    return <QuestLog quests={sampleQuests} onCompleteQuest={(q) => console.log("Complete:", q)} />
}