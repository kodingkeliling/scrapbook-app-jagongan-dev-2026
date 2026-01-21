"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memorySchema, MemoryFormValues } from "@/schemas/memory-schema";
import { useAuthStore } from "@/stores/use-auth-store";
import { uploadFileToDrive } from "@/lib/google-drive";
import axios from "axios";
import { toast } from "sonner";
import CyberButton from "@/components/shared/cyber-button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MemoryFormProps {
    onSuccess?: () => void;
}

export default function MemoryForm({ onSuccess }: MemoryFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const { accessToken, user, logout } = useAuthStore();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<MemoryFormValues>({
        resolver: zodResolver(memorySchema),
    });

    const onSubmit = async (data: MemoryFormValues) => {
        if (!accessToken || !user) {
            toast.error("Please connect your Google Drive first");
            return;
        }

        setIsUploading(true);
        const loadingToast = toast.loading("Uploading to your Neural Link (Drive)...");

        try {
            // 1. Upload to Google Drive
            const driveResult = await uploadFileToDrive(data.image, accessToken);

            // 2. Save to our Database
            await axios.post("/api/memories", {
                caption: data.caption,
                imageUrl: driveResult.imageUrl,
                userName: user?.name || null,
                userAvatar: user?.picture || null,
            });

            toast.success("Memory encoded successfully!");
            setIsOpen(false);
            reset();
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error("Upload Error:", error);
            toast.error("Process aborted: " + (error.response?.data?.error || "Unknown error"));

            if (error.response?.status === 401) {
                logout();
            }
        } finally {
            setIsUploading(false);
            toast.dismiss(loadingToast);
        }
    };

    const handleConnectDrive = () => {
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            "/api/auth/google/login",
            "google-oauth",
            `width=${width},height=${height},left=${left},top=${top}`
        );

        // Listener for the callback page's message
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === "AUTH_SUCCESS") {
                toast.success("Neural Link Established!");
                // Re-hydrate store might be needed or handled by Zustand persist
                // but just in case, we can manually trigger a state check if needed
                window.removeEventListener("message", handleMessage);
            }
        };
        window.addEventListener("message", handleMessage);

        // Also listen for window focus as a fallback to ensure state is fresh
        const handleFocus = () => {
            // Small delay to allow localStorage to be updated by the other tab
            setTimeout(() => {
                useAuthStore.persist.rehydrate();
            }, 500);
        };
        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("message", handleMessage);
            window.removeEventListener("focus", handleFocus);
        };
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <CyberButton className="text-sm">Capture Memory</CyberButton>
            </DialogTrigger>
            <DialogContent className="bg-black border-2 border-primary text-primary sm:max-w-[425px] clip-path-cyber-inv scale-100">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold uppercase glitch-text">
                        Initialize Upload
                    </DialogTitle>
                </DialogHeader>

                {!accessToken ? (
                    <div className="flex flex-col items-center py-8">
                        <p className="mb-6 text-sm text-center text-cyan-400 animate-pulse">
                            [SYSTEM ERROR]: Neural Link required to access Google Drive storage.
                        </p>
                        <CyberButton variant="secondary" onClick={handleConnectDrive}>
                            Establish Connection
                        </CyberButton>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-xs uppercase tracking-widest">
                                Data Stream (Image)
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="bg-zinc-900 border-zinc-700 text-yellow-200 file:bg-primary file:text-black file:font-bold file:border-none cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setValue("image", file);
                                }}
                            />
                            {errors.image && (
                                <p className="text-[10px] text-accent uppercase">{String(errors.image.message)}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="caption" className="text-xs uppercase tracking-widest">
                                Encrypted Log (Caption)
                            </Label>
                            <Textarea
                                id="caption"
                                placeholder="Log your memory here..."
                                className="bg-zinc-900 border-zinc-700 text-yellow-200 min-h-[100px]"
                                {...register("caption")}
                            />
                            {errors.caption && (
                                <p className="text-[10px] text-accent uppercase">{errors.caption.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end pt-4">
                            <CyberButton
                                type="submit"
                                disabled={isUploading}
                                className={isUploading ? "animate-pulse opacity-50" : ""}
                            >
                                {isUploading ? "Uploading..." : "Execute Upload"}
                            </CyberButton>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
