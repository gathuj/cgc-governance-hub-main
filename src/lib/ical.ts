// Generate iCal (.ics) file content for an event
export function generateICalEvent(event: {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
}): string {
  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };

  // Parse time range like "9:00 AM - 4:00 PM"
  const parseTime = (timeStr: string, baseDate: Date): { start: Date; end: Date } => {
    const parts = timeStr.split("-").map((s) => s.trim());
    const start = new Date(baseDate);
    const end = new Date(baseDate);

    const setTime = (d: Date, t: string) => {
      const match = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (match) {
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3].toUpperCase();
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        d.setHours(hours, minutes, 0, 0);
      }
    };

    setTime(start, parts[0] || "9:00 AM");
    setTime(end, parts[1] || parts[0] || "5:00 PM");
    return { start, end };
  };

  const { start, end } = parseTime(event.time, event.date);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CGC//Events//EN",
    "BEGIN:VEVENT",
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    `UID:${Date.now()}-${Math.random().toString(36).substr(2, 9)}@cgc.co.ke`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

export function downloadICalFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(event: {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
}): string {
  const parseTime = (timeStr: string, baseDate: Date) => {
    const parts = timeStr.split("-").map((s) => s.trim());
    const start = new Date(baseDate);
    const end = new Date(baseDate);

    const setTime = (d: Date, t: string) => {
      const match = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (match) {
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3].toUpperCase();
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        d.setHours(hours, minutes, 0, 0);
      }
    };

    setTime(start, parts[0] || "9:00 AM");
    setTime(end, parts[1] || parts[0] || "5:00 PM");
    return { start, end };
  };

  const { start, end } = parseTime(event.time, event.date);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}