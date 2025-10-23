import { Card, CardTitle } from "./ui/Card";

export default function LivePointsTracker({
                                              session = 0, today = 0, week = 0
                                          }: { session?: number; today?: number; week?: number; }) {
    const Item = ({ label, value }: { label: string; value: number }) => (
        <div className="bg-[var(--panel-muted)] border border-[var(--border)] rounded-md py-6 text-center">
            <div className="text-3xl font-extrabold text-[var(--gold)]">{value}</div>
            <div className="text-xs text-[var(--fg-muted)] mt-1">{label}</div>
        </div>
    );
    return (
        <Card>
            <CardTitle>Live Points Tracker</CardTitle>
            <div className="grid grid-cols-3 gap-4">
                <Item label="Session" value={session} />
                <Item label="Today" value={today} />
                <Item label="Week" value={week} />
            </div>
        </Card>
    );
}
