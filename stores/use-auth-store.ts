import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    user: {
        name: string;
        email: string;
        picture: string;
    } | null;
    setAuth: (accessToken: string, user: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            user: null,
            setAuth: (accessToken, user) => set({ accessToken, user }),
            logout: () => set({ accessToken: null, user: null }),
        }),
        {
            name: "kenangan-auth",
        }
    )
);
