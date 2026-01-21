import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const memories = await prisma.memory.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(memories);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch memories" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { caption, imageUrl, userName, userAvatar } = body;

        const memory = await prisma.memory.create({
            data: {
                caption,
                imageUrl,
                userName: userName || null,
                userAvatar: userAvatar || null,
            },
        });

        return NextResponse.json(memory);
    } catch (error) {
        console.error("Save Memory Error:", error);
        return NextResponse.json({ error: "Failed to save memory" }, { status: 500 });
    }
}
