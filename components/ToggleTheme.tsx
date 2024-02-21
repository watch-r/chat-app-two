"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export function ToggleTheme() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            className="h-8 w-8 "
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <Sun className="h-4 w-4 absolute rotate-0 scale-100 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="h-4 w-4 absolute rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    );
}
