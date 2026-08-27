import { NextResponse } from "next/server";
import { getTopArtists } from "@/lib/spotify";

export async function GET() {
  return NextResponse.json(await getTopArtists());
}
