import ICAL from "ical.js";

const DAY_MS = 86_400_000;

function dateKey(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function addDateRange(
  dates: Set<string>,
  start: Date,
  end: Date,
  monthPrefix: string,
  timeZone: string,
) {
  const safeEnd = end.getTime() > start.getTime() ? new Date(end.getTime() - 1) : start;
  const first = dateKey(start, timeZone);
  const last = dateKey(safeEnd, timeZone);
  let cursor = new Date(`${first}T12:00:00Z`);
  const final = new Date(`${last}T12:00:00Z`);

  while (cursor <= final) {
    const key = cursor.toISOString().slice(0, 10);
    if (key.startsWith(monthPrefix)) dates.add(key);
    cursor = new Date(cursor.getTime() + DAY_MS);
  }
}

export function busyDatesFromIcs(
  source: string,
  year: number,
  month: number,
  timeZone = "America/New_York",
) {
  const calendar = new ICAL.Component(ICAL.parse(source));
  const dates = new Set<string>();
  const monthPrefix = `${year}-${String(month).padStart(2, "0")}`;
  const rangeStart = new Date(Date.UTC(year, month - 1, 1) - 2 * DAY_MS);
  const rangeEnd = new Date(Date.UTC(year, month, 1) + 2 * DAY_MS);

  for (const component of calendar.getAllSubcomponents("vevent")) {
    const status = String(component.getFirstPropertyValue("status") ?? "").toUpperCase();
    const transparency = String(component.getFirstPropertyValue("transp") ?? "").toUpperCase();
    if (status === "CANCELLED" || transparency === "TRANSPARENT") continue;

    const event = new ICAL.Event(component);
    if (!event.isRecurring()) {
      addDateRange(dates, event.startDate.toJSDate(), event.endDate.toJSDate(), monthPrefix, timeZone);
      continue;
    }

    const iterator = event.iterator();
    let occurrence = iterator.next();
    let safety = 0;
    while (occurrence && safety < 10_000) {
      const details = event.getOccurrenceDetails(occurrence);
      const start = details.startDate.toJSDate();
      if (start >= rangeEnd) break;
      if (details.endDate.toJSDate() >= rangeStart) {
        addDateRange(dates, start, details.endDate.toJSDate(), monthPrefix, timeZone);
      }
      occurrence = iterator.next();
      safety += 1;
    }
  }

  return [...dates].sort();
}
