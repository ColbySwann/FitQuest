import {Card, CardTitle} from "./ui/Card.tsx";

export type Exercise = {
    id: string; name: string; category: string;
    difficulty: string; description: string;
    caloriesPerMin: number; xpPerMin: number; equipment: string[];
};

export default function ExerciseLibrary({
    exercises = [],
    onAddToWorkout = (ex: Exercise) => {},
}:{
    exercises?: Exercise[];
    onAddToWorkout?: (ex: Exercise) => void;
}) {
    return (
        <Card>
            <CardTitle>Exercise Library</CardTitle>
            
        </Card>
    )
}