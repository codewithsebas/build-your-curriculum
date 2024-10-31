"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { useGlobalStore } from "@/app/store/useGlobalStore";

const SelectedRole = () => {
    const { role, origin, name, setRole, setOrigin, setName } = useGlobalStore();
    const [activeField, setActiveField] = useState<"role" | "origin" | null>(null);
    const [activeInfo, setActiveInfo] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false); // Estado para verificar si el proceso está completo

    const fields = {
        role: { label: "¿Cuál es tu rol actual de trabajo?", options: ["Desarrollador Frontend", "Desarrollador Backend", "Desarrollador Full Stack", "Diseñador UX/UI", "DevOps Engineer", "QA Tester", "Otro"] },
        origin: { label: "¿De qué App vienes?", options: ["LinkedIn", "GitHub", "Instagram", "WhatsApp", "Twitter", "Otro"] }
    };

    const closeDropdown = () => setActiveField(null);

    const handleSelect = (field: "role" | "origin", value: string) => {
        if (field === "role") setRole(value);
        else if (field === "origin") setOrigin(value);
        closeDropdown();
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (!event.composedPath().some((el) => (el as HTMLElement).dataset?.dropdown)) closeDropdown();
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    // Cargar estado inicial desde localStorage
    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        const storedOrigin = localStorage.getItem("origin");
        const storedName = localStorage.getItem("name");
        const storedIsCompleted = localStorage.getItem("isCompleted");

        if (storedRole) setRole(storedRole);
        if (storedOrigin) setOrigin(storedOrigin);
        if (storedName) setName(storedName);
        if (storedIsCompleted === "true") setIsCompleted(true);
    }, [setRole, setOrigin, setName]);

    if (isCompleted) {
        return null;
    }

    const handleReady = () => {
        localStorage.setItem("name", name);
        localStorage.setItem("role", role);
        localStorage.setItem("origin", origin);
        localStorage.setItem("isCompleted", "true");
        setActiveInfo(true);
        setIsCompleted(true);
    };

    return (
        <div className={`fixed top-0 z-20 w-full min-h-screen bg-white flex items-center justify-center duration-200 ${activeInfo && 'opacity-0 -translate-y-10 pointer-events-none'}`}>
            <div className="w-full h-full max-w-sm flex flex-col gap-10">
                <Header />
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Escribe tu nombre"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-slate-50 p-3 py-2.5 outline-none border border-transparent rounded-md placeholder:text-slate-500 "
                    />
                    {Object.keys(fields).map((field) => (
                        <SelectableField
                            key={field}
                            label={(field === "role" ? role : origin) || fields[field as keyof typeof fields].label}
                            options={fields[field as keyof typeof fields].options}
                            isOpen={activeField === field}
                            onSelect={(value) => handleSelect(field as "role" | "origin", value)}
                            onToggle={() => setActiveField(activeField === field ? null : (field as "role" | "origin"))}
                            isSelected={!!(field === "role" ? role : origin)}
                        />
                    ))}
                    <Button onClick={handleReady} variant="customizable" disabled={!name || !role || !origin} className="py-5">
                        Listo
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Header = () => (
    <div className="flex flex-col items-center gap-5">
        <figure>
            <Image src="/favicon.svg" alt="Logo" width={100} height={100} priority />
        </figure>
        <div className="flex flex-col items-center gap-1">
            <h3 className="font-medium text-xl">Bienvenido a Build Curriculum</h3>
            <p className="text-black/50 font-medium">Háblanos de ti</p>
        </div>
    </div>
);

type SelectableFieldProps = {
    label: string;
    options: string[];
    isOpen: boolean;
    onSelect: (value: string) => void;
    onToggle: () => void;
    isSelected: boolean;
};

const SelectableField: React.FC<SelectableFieldProps> = ({ label, options, isOpen, onSelect, onToggle, isSelected }) => (
    <div
        className={`select-none flex items-center gap-2 justify-between bg-slate-50 p-3 py-2 rounded-md cursor-pointer border border-transparent relative duration-200 ${isSelected && 'bg-white !border !border-customizable/50'}`}
        onClick={onToggle}
        data-dropdown="true"
    >
        <span className={`text-slate-500 ${isSelected && "text-slate-600"}`}>{label}</span>
        <ChevronDown className={`text-slate-600 duration-200 ${isOpen && 'rotate-180'}`} size={20} />
        {isOpen && (
            <div className="bg-slate-50 rounded-md overflow-hidden absolute top-full mt-1 left-0 w-full z-10" data-dropdown="true">
                {options.map((option) => (
                    <div
                        key={option}
                        className="text-slate-500 py-2 px-3 cursor-pointer hover:bg-slate-100"
                        onClick={() => onSelect(option)}
                        data-dropdown="true"
                    >
                        {option}
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default SelectedRole;
