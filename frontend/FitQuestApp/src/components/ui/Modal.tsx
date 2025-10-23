
import {useEffect} from "react";
import React from "react";

export const Modal = ({open, onClose, title, children,}: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) => {
    useEffect(() => {
        function onEsc(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [open, onClose()]);

    if (!open) return null;

    return (
        <div className={"fixed inset-0 z-50 flex items-center justify-center"}>
            <div className={"absolute inset-0 bg-black/70"} onClick={onClose} />
            <div className={"relative bg-[var(--panel)] border border-[var(--gold-weak)] rounded-lg p-6 w-full max-w-md mx-4"}>
                <h3 className={"text-lg font-bold text-[var(--gold)] mb-3"}>{title}</h3>
                {children}
                <div className={"mt-4 flex justify-end"}>
                    <button
                        onClick={onClose}
                        className={"px-4 py-2 rounded-md bg-[var(--gold)] text-black hover:brightness-110"}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}