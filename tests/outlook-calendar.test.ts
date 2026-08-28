import { describe, expect, it } from "vitest";
import { busyDatesFromIcs } from "@/lib/outlook-calendar";

const calendar = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:single
DTSTART:20260812T140000Z
DTEND:20260812T150000Z
SUMMARY:Private meeting
END:VEVENT
BEGIN:VEVENT
UID:recurring
DTSTART:20260803T150000Z
DTEND:20260803T160000Z
RRULE:FREQ=WEEKLY;COUNT=4
SUMMARY:Recurring appointment
END:VEVENT
BEGIN:VEVENT
UID:transparent
DTSTART:20260820T140000Z
DTEND:20260820T150000Z
TRANSP:TRANSPARENT
SUMMARY:Free time
END:VEVENT
END:VCALENDAR`;

describe("busyDatesFromIcs", () => {
  it("returns only busy dates and expands recurring events", () => {
    expect(busyDatesFromIcs(calendar, 2026, 8)).toEqual([
      "2026-08-03",
      "2026-08-10",
      "2026-08-12",
      "2026-08-17",
      "2026-08-24",
    ]);
  });
});
