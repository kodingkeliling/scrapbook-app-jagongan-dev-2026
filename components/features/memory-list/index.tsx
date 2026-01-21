"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import MemoryCard from "@/components/features/memory-card";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Memory {
    id: string;
    caption: string;
    imageUrl: string;
    userName: string | null;
    userAvatar: string | null;
    createdAt: string;
}

interface MemoryListProps {
    refreshKey: number;
}

export default function MemoryList({ refreshKey }: MemoryListProps) {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMemories = async () => {
        try {
            const response = await axios.get("/api/memories");
            setMemories(response.data);
        } catch (error) {
            console.error("Failed to fetch memories", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMemories();
    }, [refreshKey]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-primary font-mono animate-pulse">DECRYPTING MEMORY BANK...</p>
            </div>
        );
    }

    if (memories.length === 0) {
        return (
            <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-lg">
                <p className="text-muted-foreground uppercase text-sm tracking-[0.2em]">
                    No memories found in the neural network.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
                {memories.map((memory, index) => (
                    <motion.div
                        key={memory.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <MemoryCard memory={memory} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
