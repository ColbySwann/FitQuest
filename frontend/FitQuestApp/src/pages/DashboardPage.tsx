import CharacterStats from "../components/CharacterStats";
import LivePointsTracker from "../components/LivePointsTracker";
import WeeklyChallenges from "../components/WeeklyChallenge";
import RewardsSystem from "../components/RewardSystem";
import Leaderboard from "../components/Leaderboard";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <CharacterStats />
                <div className="lg:col-span-2">
                    <LivePointsTracker />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                <WeeklyChallenges />
                <RewardsSystem />
            </div>
            <div>
                <Leaderboard />
            </div>
        </div>
    );
}
