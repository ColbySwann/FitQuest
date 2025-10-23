

export const Tabs = ({ tabs, value, onChange}:{tabs: string[]; value: string; onChange: (v: string) => void;}) => {
    return(
        <div className={"flex bg[#1B1B27] border border-[#2A2A3A] rounded-full overflow-hidden shadow-inner"}>
            {tabs.map((t) => {
                const active = t === value;
                return (
                    <button
                        key={t}
                        onClick={() => onChange(t)}
                        className={`px-4 py-2 text-sm transition border-r border-[var(--gold-weak)] last:border-none
                         ${active ? "bg-[#D4AF37] text-black" : "text-gray-300 hover:bg-[#2A2A3A]"}`}
                        >
                        {t}
                    </button>
                );
            })}
        </div>
    )
}