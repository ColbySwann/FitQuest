import {useState, useRef, useEffect} from "react";

export const Dropdown = ({
    label,
    items,
    onSelect,}
: {
    label: string;
    items: string[];
    onSelect: (item: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="px-3 py-2 rounded-md bg-[var(--gold)] text-black hover:brightness-110"
            >
                {label}
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--panel)] border border-[var(--gold-weak)] rounded-md overflow-hidden shadow-xl">
                    {items.map((it) => (
                        <button
                            key={it}
                            onClick={() => {
                                onSelect(it);
                                setOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--panel-muted)]"
                        >
                            {it}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}