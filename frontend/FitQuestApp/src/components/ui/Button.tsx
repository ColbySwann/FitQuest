
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "danger";
}

export const Button = ({ className = "", variant = "primary", ...props}: Props) => {
    const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition focus:outline-none";
    const variants = {
        primary: "bg-[var(--gold)] text-black hover:brightness-110 px-4 py-2",
        ghost: "bg-transparent text-[var(--fg_] hover:bg-[var(--panel-muted)] border border-[var(--border)] px-3 py-2",
        danger: "bg-[var(--danger)] text-white hover:brightness-110 px-4 py-2",
    } as const;

    return <button className={`${base} ${variants[variant]} ${className}`} {...props}/>
}