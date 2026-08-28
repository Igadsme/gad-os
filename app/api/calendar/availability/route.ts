import { busyDatesFromIcs } from "@/lib/outlook-calendar";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const now = new Date();
  const year = Number(searchParams.get("year") ?? now.getFullYear());
  const month = Number(searchParams.get("month") ?? now.getMonth() + 1);

  if (!Number.isInteger(year) || year < 2020 || year > 2100 || !Number.isInteger(month) || month < 1 || month > 12) {
    return Response.json({ error: "Invalid calendar month." }, { status: 400 });
  }

  const calendarUrl = process.env.OUTLOOK_CALENDAR_ICS_URL;
  if (!calendarUrl) {
    return Response.json({ connected: false, year, month, busyDates: [] });
  }

  try {
    const response = await fetch(calendarUrl, {
      headers: { Accept: "text/calendar" },
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error(`Outlook returned ${response.status}`);

    const source = await response.text();
    const busyDates = busyDatesFromIcs(source, year, month);
    return Response.json(
      { connected: true, year, month, busyDates },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  } catch {
    return Response.json(
      { connected: true, available: false, year, month, busyDates: [] },
      { status: 502 },
    );
  }
}
