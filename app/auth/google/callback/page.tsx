"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";
import { getUserInfo } from "@/lib/google-drive";

function AuthCallbackContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const code = searchParams.get("code");
    const setAuth = useAuthStore((state) => state.setAuth);

    useEffect(() => {
        const handleAuth = async (accessToken: string) => {
            try {
                const user = await getUserInfo(accessToken);
                setAuth(accessToken, user);

                if (window.opener) {
                    window.opener.postMessage({ type: "AUTH_SUCCESS", token: accessToken, user }, "*");
                    window.close();
                } else {
                    window.location.href = "/";
                }
            } catch (err) {
                console.error("Failed to process auth:", err);
            }
        };

        if (token) {
            handleAuth(token);
        } else if (code) {
            // Exchange code for token via API
            fetch(`/api/auth/google/callback?code=${code}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.access_token) {
                        handleAuth(data.access_token);
                    } else {
                        console.error("No access token returned from API");
                    }
                })
                .catch((err) => console.error("API Exchange failed:", err));
        }
    }, [token, code, setAuth]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-yellow-400">
            <div className="text-2xl font-bold animate-pulse glitch-text">SYNCHRONIZING WITH DRIVE...</div>
            <div className="mt-4 text-cyan-400 font-mono text-sm tracking-widest">[ CODE EXCHANGE IN PROGRESS ]</div>
            <div className="mt-2 text-zinc-500 text-[10px] uppercase">Establishing secure neural connection...</div>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthCallbackContent />
        </Suspense>
    );
}
