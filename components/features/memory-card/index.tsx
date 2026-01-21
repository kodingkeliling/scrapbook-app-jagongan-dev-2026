import React from "react";
import NeonCard from "@/components/shared/neon-card";
import { formatDistanceToNow } from "date-fns";

interface MemoryCardProps {
    memory: {
        id: string;
        caption: string;
        imageUrl: string;
        userName: string | null;
        userAvatar: string | null;
        createdAt: Date | string;
    };
}

export default function MemoryCard({ memory }: MemoryCardProps) {
    return (
        <NeonCard glowColor="cyan" className="mb-6">
            <div className="flex items-center gap-3 mb-4">
                {memory.userAvatar && (
                    <img
                        src={memory.userAvatar}
                        alt={memory.userName || "User"}
                        className="w-10 h-10 rounded-full border-2 border-secondary"
                        referrerPolicy="no-referrer"
                    />
                )}
                <div>
                    <h3 className="text-secondary font-bold text-sm uppercase tracking-tighter">
                        {memory.userName || "Unknown Runner"}
                    </h3>
                    <p className="text-[10px] text-muted-foreground uppercase">
                        {formatDistanceToNow(new Date(memory.createdAt))} ago
                    </p>
                </div>
            </div>

            <div className="aspect-video relative overflow-hidden border border-muted mb-4 bg-black/50">
                <img
                    src={memory.imageUrl}
                    alt={memory.caption}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x225?text=ENCRYPTED+DATA";
                    }}
                />
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
            </div>

            <p className="text-primary font-mono text-sm leading-relaxed border-l-2 border-primary pl-3">
                {memory.caption}
            </p>
        </NeonCard>
    );
}
