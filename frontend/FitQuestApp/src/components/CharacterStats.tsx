
import { Card, CardTitle, CardSubtle} from "./ui/Card.tsx";
import { ProgressBar } from "./ui/ProgressBar.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function CharacterStats({
//     level = 1,
//     currentXP = 0,
//     xpToNextLevel = 500,
//     strength = 10,
//     endurance = 10,
//     agility = 10,
//     totalPoints = 0,
// }: {
//     level?: number; currentXP?: number; xpToNextLevel?: number;
//     strength?: number; endurance?: number; agility?: number;
//     totalPoints?: number;
}) {

    const [user, setUser] = useState({
        level: 1,
        currentXp: 0,
        xpToNextLevel: 500,
        strength: 10,
        endurance: 10,
        agility: 10,
        totalPoints: 0,
    });

    const username = localStorage.getItem("username")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/username/${username}`)
            .then(res => {
                console.log(res.data)
                setUser({
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


    return (
        <Card>
            <CardTitle>Warrior Level</CardTitle>
            <div className={"text-2xl font-bold"}>{user.level}</div>
            <CardSubtle>{user.currentXp} / {user.xpToNextLevel} XP</CardSubtle>
            <div className={"mt-3"}>
                <ProgressBar value={user.currentXp} max={user.xpToNextLevel} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-5 text-center">
                <div>
                    <div className="text-red-400 text-xl font-bold">{user.strength}</div>
                    <div className="text-xs text-[var(--fg-muted)]">Strength</div>
                </div>
                <div>
                    <div className="text-red-400 text-xl font-bold">{user.endurance}</div>
                    <div className="text-xs text-[var(--fg-muted)]">Endurance</div>
                </div>
                <div>
                    <div className="text-red-400 text-xl font-bold">{user.agility}</div>
                    <div className="text-xs text-[var(--fg-muted)]">Agility</div>
                </div>
            </div>
            <div className="mt-4 text-xs text-[var(--fg-muted)]">
                Total Quest Points: <span className="text-[var(--fg)] font-semibold">{user.totalPoints}</span>
            </div>
        </Card>
    )
}