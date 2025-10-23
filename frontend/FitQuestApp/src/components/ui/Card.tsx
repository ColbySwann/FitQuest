
export const Card = ({ className = "", children }: React.PropsWithChildren<{ className?: string} >) => {
    return(
        <div
            className={`bg-[#14141E]/80 backdrop-blur-sm border border-[#2A2A3A] 
      rounded-2xl p-6 shadow-lg shadow-black/30 ${className}`}
        >
            {children}
        </div>
    )
}

export const CardTitle = ({children}: React.PropsWithChildren) => {
    return <h2 className={"text-[var(--gold)] font-semibold mb-2"}>{children}</h2>
}

export const CardSubtle = ({children}: React.PropsWithChildren ) => {
    return <p className={"text-xs text-[var(--fg-muted)]"}>{children}</p>;
}