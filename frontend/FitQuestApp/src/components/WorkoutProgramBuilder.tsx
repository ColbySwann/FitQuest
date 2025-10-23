import { useState } from "react";
import { Card, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";

export type WorkoutExercise = { exerciseId: string; exerciseName: string; duration: number };
export type WorkoutProgram = {
    id: string; name: string; description: string;
    exercises: WorkoutExercise[]; totalDuration: number; estimatedCalories: number; estimatedXP: number;
};

export default function WorkoutProgramBuilder({
                                                  programs = [],
                                                  currentProgram = null,
                                                  onSaveProgram = (p: WorkoutProgram) => {},
                                                  onDeleteProgram = (id: string) => {},
                                                  onSelectProgram = (p: WorkoutProgram | null) => {},
                                                  onStartWorkout = (p: WorkoutProgram) => {},
  }: {
    programs?: WorkoutProgram[];
    currentProgram?: WorkoutProgram | null;
    onSaveProgram?: (p: WorkoutProgram) => void;
    onDeleteProgram?: (id: string) => void;
    onSelectProgram?: (p: WorkoutProgram | null) => void;
    onStartWorkout?: (p: WorkoutProgram) => void;
}) {
    const [draft, setDraft] = useState<WorkoutProgram | null>(currentProgram);

    return (
        <Card>
            <CardTitle>Workout Programs</CardTitle>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Programs list */}
                <div className="space-y-3">
                    {programs.length === 0 ? (
                        <p className="text-sm text-[var(--fg-muted)]">No saved programs.</p>
                    ) : programs.map((p) => (
                        <div key={p.id}
                             className={`rounded-md p-3 border ${draft?.id === p.id ? "border-[var(--gold)]" : "border-[var(--border)]"} bg-[var(--panel-muted)]`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold">{p.name}</div>
                                    <div className="text-xs text-[var(--fg-muted)]">{p.description}</div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" onClick={() => { setDraft(p); onSelectProgram(p); }}>Edit</Button>
                                    <Button variant="danger" onClick={() => onDeleteProgram(p.id)}>Delete</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Editor */}
                <div className="space-y-3">
                    <div className="bg-[var(--panel-muted)] border border-[var(--border)] rounded-md p-4">
                        <div className="flex gap-2">
                            <input
                                className="flex-1 bg-transparent border border-[var(--border)] rounded-md px-3 py-2 text-sm outline-none focus:ring-gold"
                                placeholder="Program name"
                                value={draft?.name ?? ""}
                                onChange={(e) => draft && setDraft({ ...draft, name: e.target.value })}
                            />
                            <Button onClick={() => {
                                if (!draft) return;
                                onSaveProgram(draft);
                            }}>Save</Button>
                        </div>
                        <textarea
                            className="mt-2 w-full bg-transparent border border-[var(--border)] rounded-md px-3 py-2 text-sm outline-none"
                            rows={3}
                            placeholder="Description"
                            value={draft?.description ?? ""}
                            onChange={(e) => draft && setDraft({ ...draft, description: e.target.value })}
                        />
                        <div className="mt-3">
                            <div className="text-xs text-[var(--fg-muted)] mb-2">Exercises</div>
                            <div className="space-y-2">
                                {draft?.exercises.map((ex, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="flex-1 text-sm">{ex.exerciseName}</div>
                                        <input
                                            type="number"
                                            className="w-24 bg-transparent border border-[var(--border)] rounded-md px-2 py-1 text-sm"
                                            value={ex.duration}
                                            onChange={(e) => {
                                                const d = Number(e.target.value || 0);
                                                if (!draft) return;
                                                const updated = [...draft.exercises];
                                                updated[idx] = { ...ex, duration: d };
                                                setDraft({ ...draft, exercises: updated });
                                            }}
                                        />
                                        <Button variant="ghost" onClick={() => {
                                            if (!draft) return;
                                            setDraft({ ...draft, exercises: draft.exercises.filter((_, i) => i !== idx) });
                                        }}>Remove</Button>
                                    </div>
                                ))}
                                {(!draft || draft.exercises.length === 0) && (
                                    <p className="text-xs text-[var(--fg-muted)]">No exercises added yet.</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2 justify-end">
                            {draft && <Button onClick={() => onStartWorkout(draft)}>Start Workout</Button>}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
