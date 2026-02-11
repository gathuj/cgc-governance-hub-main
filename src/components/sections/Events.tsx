import { useState, useCallback } from "react";
import { isSameDay } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Monitor, Building2, Download, ExternalLink } from "lucide-react";
import { useCSVData } from "@/hooks/useCSVData";
import { Skeleton } from "@/components/ui/skeleton";
import { generateICalEvent, downloadICalFile, getGoogleCalendarUrl } from "@/lib/ical";
import EventRegistrationForm from "@/components/events/EventRegistrationForm";
import type { Event } from "@/types/models";

const getEventTypeColor = (type: Event["type"]) => {
  switch (type) {
    case "training":
      return "bg-primary text-primary-foreground";
    case "workshop":
      return "bg-foreground text-background";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const EventCard = ({ event }: { event: Event }) => {
  const [regOpen, setRegOpen] = useState(false);

  const handleDownloadIcal = () => {
    const ical = generateICalEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
    });
    downloadICalFile(ical, event.title.replace(/\s+/g, "-").toLowerCase());
  };

  const googleUrl = getGoogleCalendarUrl({
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
  });

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge className={getEventTypeColor(event.type)} variant="secondary">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {event.meetingOption === "online" ? <Monitor size={12} /> : <Building2 size={12} />}
                  {event.meetingOption.charAt(0).toUpperCase() + event.meetingOption.slice(1)}
                </Badge>
                <Badge
                  variant={event.status === "upcoming" ? "default" : "secondary"}
                  className={event.status === "upcoming" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
                {/* Price Badge */}
                <Badge
                  className={event.price === "free" 
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300" 
                    : "bg-amber-100 text-amber-800 border-amber-300"}
                  variant="outline"
                >
                  {event.price === "free" ? "Free" : `KES ${typeof event.price === "number" ? event.price.toLocaleString() : event.price}`}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription className="text-sm leading-relaxed">
            {event.description}
          </CardDescription>
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays size={16} className="text-primary" />
              <span>{event.date.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} className="text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} className="text-primary" />
              <span>{event.location}</span>
            </div>
          </div>
          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
            {event.status === "upcoming" && (
              <Button size="sm" onClick={() => setRegOpen(true)}>
                Book Now
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleDownloadIcal} className="text-xs">
              <Download size={14} className="mr-1" />
              Download .ics
            </Button>
            <a href={googleUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink size={14} className="mr-1" />
                Add to Google Calendar
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      <EventRegistrationForm event={event} open={regOpen} onOpenChange={setRegOpen} />
    </>
  );
};

const Events = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("upcoming");

  const parseEvents = useCallback((rows: string[][]): Event[] => {
    return rows.map((row, index) => {
      const dateStr = row[3] || "";
      const dateParts = dateStr.split("-");
      const eventDate = dateParts.length === 3
        ? new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]))
        : new Date();

      const priceRaw = (row[8] || "free").trim().toLowerCase();
      const price: "free" | number = priceRaw === "free" ? "free" : parseInt(priceRaw) || 0;

      return {
        id: String(index + 1),
        title: row[0] || "",
        type: (row[1]?.toLowerCase() || "training") as "training" | "workshop",
        description: row[2] || "",
        date: eventDate,
        time: row[4] || "",
        location: row[5] || "",
        meetingOption: (row[6]?.toLowerCase() || "physical") as "online" | "physical",
        status: (row[7]?.toLowerCase() || "upcoming") as "upcoming" | "past",
        price,
        meetingLink: row[9] || undefined,
        meetingId: row[10] || undefined,
      };
    });
  }, []);

  const { data: events, loading, error } = useCSVData<Event>("/data/events.csv", parseEvents);

  const upcomingEvents = events.filter((event) => event.status === "upcoming");
  const pastEvents = events.filter((event) => event.status === "past");
  const eventDates = events.map((event) => event.date);

  const selectedDateEvents = selectedDate
    ? events.filter((event) => isSameDay(event.date, selectedDate))
    : [];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const eventsOnDate = events.filter((event) => isSameDay(event.date, date));
      if (eventsOnDate.length > 0) {
        const hasUpcoming = eventsOnDate.some(e => e.status === "upcoming");
        const hasPast = eventsOnDate.some(e => e.status === "past");
        if (hasUpcoming && !hasPast) setActiveTab("upcoming");
        else if (hasPast && !hasUpcoming) setActiveTab("past");
        else setActiveTab("all");
      }
    }
  };

  if (error) {
    return (
      <section id="events" className="section-padding bg-secondary">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">Unable to load events.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="section-padding bg-secondary">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">Stay Updated</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">Events & Training</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join our governance training sessions, workshops, and seminars designed to enhance your professional capabilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Event Calendar</CardTitle>
                <CardDescription>Select a date to view events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border pointer-events-auto"
                  modifiers={{ hasEvent: eventDates }}
                  modifiersStyles={{
                    hasEvent: {
                      fontWeight: "bold",
                      backgroundColor: "hsl(358 79% 43% / 0.15)",
                      color: "hsl(358 79% 43%)",
                      borderRadius: "50%",
                    },
                  }}
                />
                {selectedDate && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-sm mb-2">
                      Events on {selectedDate.toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" })}
                    </h4>
                    {selectedDateEvents.length > 0 ? (
                      <div className="space-y-2">
                        {selectedDateEvents.map((event) => (
                          <div key={event.id} className="text-sm p-3 rounded-lg bg-primary/10 border-l-4 border-primary">
                            <p className="font-medium">{event.title}</p>
                            <p className="text-muted-foreground text-xs mt-1">{event.time}</p>
                            <div className="flex gap-1 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {event.status === "upcoming" ? "Upcoming" : "Past"}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {event.price === "free" ? "Free" : `KES ${typeof event.price === "number" ? event.price.toLocaleString() : event.price}`}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No events on this date.</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Events Tabs */}
          <div className="lg:col-span-2">
            {selectedDateEvents.length > 0 ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold">
                    Events on {selectedDate?.toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" })}
                  </h3>
                </div>
                <div className="space-y-4">
                  {selectedDateEvents.sort((a, b) => a.date.getTime() - b.date.getTime()).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past Events</TabsTrigger>
                </TabsList>

                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48" />)}
                  </div>
                ) : (
                  <>
                    <TabsContent value="all" className="space-y-4">
                      {events.length > 0 ? events.sort((a, b) => a.date.getTime() - b.date.getTime()).map((event) => <EventCard key={event.id} event={event} />) : <p className="text-center text-muted-foreground py-8">No events scheduled.</p>}
                    </TabsContent>
                    <TabsContent value="upcoming" className="space-y-4">
                      {upcomingEvents.length > 0 ? upcomingEvents.sort((a, b) => a.date.getTime() - b.date.getTime()).map((event) => <EventCard key={event.id} event={event} />) : <p className="text-center text-muted-foreground py-8">No upcoming events scheduled.</p>}
                    </TabsContent>
                    <TabsContent value="past" className="space-y-4">
                      {pastEvents.length > 0 ? pastEvents.sort((a, b) => b.date.getTime() - a.date.getTime()).map((event) => <EventCard key={event.id} event={event} />) : <p className="text-center text-muted-foreground py-8">No past events.</p>}
                    </TabsContent>
                  </>
                )}
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
