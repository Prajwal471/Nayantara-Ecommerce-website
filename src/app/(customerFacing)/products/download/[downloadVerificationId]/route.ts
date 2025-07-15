import db from "@/db/db"
import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"

export async function GET(
    req: NextRequest,
    {
        params: { downloadVerificationId },
    }: { params: { downloadVerificationId: string } }
) {
    const data = await db.downloadVerification.
        findUnique({
            where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
            select: { product: { select: { filePath: true, name: true } } },
        })
    return new NextResponse
}