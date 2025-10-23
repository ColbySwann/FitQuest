import { Card, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { useState } from "react";

export default function CharacterCustomization({
                                                   initial = { name: "Brave Warrior", class: "warrior", color: "#d4af37", avatar: "⚔️" },
                                                   onSave = (c: { name: string; class: string; color: string; avatar: string }) => {},
                                               }: {
    initial?: { name: string; class: string; color: string; avatar: string };
    onSave?: (c: { name: string; class: string; color: string; avatar: string }) => void;
}) {
    const [form, setForm] = useState(initial);
    return (
        <Card>
            <CardTitle>Character Customization</CardTitle>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <label className="text-xs">Name</label>
                    <input className="w-full bg-transparent border border-[var(--border)] rounded-md px-3 py-2 text-sm"
                           value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <label className="text-xs">Class</label>
                    <select
                        className="w-full bg-transparent border border-[var(--border)] rounded-md px-3 py-2 text-sm"
                        value={form.class}
                        onChange={(e) => setForm({ ...form, class: e.target.value })}
                    >
                        <option value="warrior">Warrior</option>
                        <option value="rogue">Rogue</option>
                        <option value="paladin">Paladin</option>
                    </select>
                    <label className="text-xs">Color</label>
                    <input type="color" className="w-16 h-10 p-1 bg-transparent border border-[var(--border)] rounded-md"
                           value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                    <label className="text-xs">Avatar</label>
                    <input className="w-full bg-transparent border border-[var(--border)] rounded-md px-3 py-2 text-sm"
                           placeholder="Emoji or URL" value={form.avatar}
                           onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
                    <div className="pt-2">
                        <Button onClick={() => onSave(form)}>Save Character</Button>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-44 h-44 rounded-xl border-2 border-[var(--gold)] flex flex-col items-center justify-center glow-gold">
                        <div className="text-5xl">{form.avatar}</div>
                        <div className="mt-2 text-[var(--gold)] font-semibold">{form.name}</div>
                        <div className="text-xs text-[var(--fg-muted)] capitalize">{form.class}</div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
