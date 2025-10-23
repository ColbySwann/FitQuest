
export default function Layout( { children }: {children: React.ReactNode} ) {
    return (
        <div className={"min-h-screen w-full bg-gradient-to-br from-[var(--bg)] via-[var(--bg)] to-[var(--panel-muted)] relative justify-items-center"}>
            <div className={"w-fit mx-auto px-4 md:px-6 py-8 "}>{children}</div>
        </div>
    )
}