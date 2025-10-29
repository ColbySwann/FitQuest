import CharacterStats from "../components/CharacterStats";
import LivePointsTracker from "../components/LivePointsTracker";
import WeeklyChallenges from "../components/WeeklyChallenge";
import RewardsSystem from "../components/RewardSystem";
import Leaderboard from "../components/Leaderboard";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";



export default function DashboardPage() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const [user, setUser] = useState({
        id: 0,
        level: 1,
        currentXp: 0,
        xpToNextLevel: 500,
        strength: 10,
        endurance: 10,
        agility: 10,
        totalPoints: 0
    });

    useEffect(() => {
        if (!username) {
            navigate("/login")
            return;
        }
        axios.get(`http://localhost:8080/api/users/username/${username}`)
            .then(res => {
                console.log(res.data)
                setUser({
                    id: res.data.id,
                    level: res.data.level,
                    currentXp: res.data.currentXp,
                    xpToNextLevel: res.data.xpToNextLevel,
                    strength: res.data.strength,
                    endurance: res.data.endurance,
                    agility: res.data.agility,
                    totalPoints: res.data.totalPoints
                })
            })
            .catch((err) => {
                console.error("Error loading Character Stats: ", err);
            })
    }, [username])

    const handleClick = () => {
        const addXp = {xp: 20};
        axios.post(`http://localhost:8080/api/users/${user.id}/add-xp`,  addXp)
            .then(res => {
                console.log(res.data)
            })
            .catch((err) => {
                console.error("Error adding xp", err);
            })
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <CharacterStats />
                <div className="lg:col-span-2">
                    <LivePointsTracker />
                </div>
                <div>
                    <button onClick={handleClick}>Add 20 Xp</button>
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
