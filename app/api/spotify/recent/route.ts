import { NextResponse } from "next/server";
import { getRecentlyPlayed } from "@/lib/spotify";

export async function GET() {
  return NextResponse.json(await getRecentlyPlayed());
}
