import type { Note } from "@/types/note";
import { useRef } from "react";

export const useAutoSave = (callback: (value: Note) => void, delay = 1000) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const trigger = (value: Note | null) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        timeoutRef.current = value && setTimeout(() => callback(value), delay)
    }

    return trigger
}