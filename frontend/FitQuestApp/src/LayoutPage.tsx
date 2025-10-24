import {Tabs} from "./components/ui/Tabs.tsx";
import Layout from "./Layout.tsx";
import {useState} from "react";
import DashboardPage from "./pages/DashboardPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";

const PAGES = [
    "Dashboard",
    "Quests",
    "Exercises",
    "Programs",
    "Events",
    "Character",
    "Account",
] as const;

type Page = typeof PAGES[number];

function QuestsPage() {
    return null;
}

export default function LayoutPage() {
    const [active, setActive] = useState("Dashboard");
    return (
        <div>
            {/*<LoginButton />*/}
            {/*<RegisterButton />*/}
            <Layout>
                <header className={"text-center mb-8"}>
                    <h1 className={"text-5xl font-extrabold tracking-widest text-[var(--gold(] drop-shadow"}>FITQUEST</h1>
                    <p className={"text-sm text-[var(--fg-muted)] mt-2"}>
                        Embark on your legendary fitness journey
                    </p>
                </header>
                <div className={"flex justify-center mb-8"}>
                    <Tabs tabs={PAGES as unknown as string[]} value={active} onChange={v => setActive(v as Page)} />
                </div>

                {active === "Dashboard" && <DashboardPage />}
                {active === "Quests" && <QuestsPage />}
                {active === "Account" && <AccountPage />}
                {/*{active === "Exercises" && <ExercisesPage />}*/}
                {/*{active === "Programs" && <ProgramsPage />}*/}
                {/*{active === "Events" && <EventsPage />}*/}
                {/*{active === "Character" && <CharacterPage />}*/}
            </Layout>
        </div>

    );
}
