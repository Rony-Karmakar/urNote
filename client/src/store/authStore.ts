import type { User } from "@/types/user"
import { create } from "zustand"

type AuthState = {
    user: User | null
    isLoggedIn: boolean

    login: (user: User) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,

    login: (userData) => set({ user: userData, isLoggedIn: true }),
    logout: () => set({ user: null, isLoggedIn: false })
}))