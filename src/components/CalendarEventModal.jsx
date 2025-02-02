import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import EventForm from "./Calendar/EventForm";
import { MapPin } from "lucide-react";
import {
  TbCalendarCheck,
  TbCalendarPlus,
  TbCalendarTime,
} from "react-icons/tb";
import { FaAngleLeft, FaAngleRight, FaUser } from "react-icons/fa";

// Helper functions for date manipulation
const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];

  // Add previous month's days
  for (let i = 0; i < firstDay.getDay(); i++) {
    const prevDate = new Date(year, month, -i);
    days.unshift(prevDate);
  }

  // Add current month's days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Add next month's days to complete the grid
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
};

const sampleEvents = [
  {
    id: 1,
    title: "First Stage Interview - Portfolio Review",
    start: "2025-02-05T09:30",
    startTime: "09:30",
    end: "2025-02-05T11:45",
    endTime: "10:45",
    type: "Portfolio Review",
    location: "Virtual Conference Room",
    interviewer: "Marvin McKinney",
    color: "#e3f2fd",
  },
  {
    id: 6,
    title: "First Stage Interview - Portfolio Review",
    start: "2025-02-03T08:30",
    startTime: "09:30",
    end: "2025-02-03T10:35",
    endTime: "10:45",
    type: "Portfolio Review",
    location: "Main Conference Room",
    interviewer: "Marvin McKinney",
    color: "#e3f2fd",
  },
  {
    id: 4,
    title: "Final Stage Interview - Psychological Testing",
    start: "2025-02-06T08:30",
    startTime: "13:00",
    end: "2025-02-06T10:00",
    endTime: "14:30",
    type: "Psychological Testing",
    location: "Online",
    interviewer: "Dave Newjeans",
    color: "#fff3e0",
  },
  {
    id: 2,
    title: "Stage 3 Interview - Live Design",
    start: "2025-02-05T14:00",
    startTime: "14:00",
    end: "2025-02-05T15:00",
    endTime: "15:00",
    type: "Live Design",
    location: "Room 205",
    interviewer: "Randy Dibbert",
    color: "#e8f5e9",
  },
  {
    id: 5,
    title: "Stage 3 Interview - Live Design",
    start: "2025-02-04T11:00",
    startTime: "14:00",
    end: "2025-02-04T13:00",
    endTime: "15:00",
    type: "Live Design",
    location: "Room 205",
    interviewer: "Randy Dibbert",
    color: "#e8f5e9",
  },
  {
    id: 3,
    title: "Final Stage Interview - Psychological Testing",
    start: "2025-02-07T13:00",
    startTime: "13:00",
    end: "2025-02-07T14:30",
    endTime: "14:30",
    type: "Psychological Testing",
    location: "Online",
    interviewer: "Dave Newjeans",
    color: "#fff3e0",
  },
  {
    id: 7,
    title: "Final Stage Interview - Psychological Testing",
    start: "2025-02-05T11:00",
    startTime: "13:00",
    end: "2025-02-05T13:30",
    endTime: "14:30",
    type: "Psychological Testing",
    location: "Online",
    interviewer: "Dave Newjeans",
    color: "#fff3e0",
  },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("week");
  const [events, setEvents] = useState(sampleEvents);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const locations = [
    { id: 1, name: "Online", color: "#c8e5fc" },
    { id: 2, name: "Main Conference Room", color: "#c6e6c7" },
    { id: 3, name: "Room 205", color: "#ffe7c4" },
    { id: 4, name: "Room 300", color: "#9c27b0" },
    { id: 5, name: "Virtual Conference Room", color: "#fccecb" },
    // { id: 6, name: "Ballroom Premium", color: "#795548" },
    // { id: 7, name: "Main Branch Meeting Room", color: "#607d8b" },
  ];

  const getLocationColor = (locationName) => {
    const location = locations.find((loc) => loc.name === locationName);
    return location ? location.color : "#e0e0e0"; // Default color if location not found
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    switch (view) {
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
        break;
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        break;
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
        break;
    }
    setCurrentDate(newDate);
  };

  const handleTimeSlotClick = (date, hour) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(hour);
    setSelectedTimeSlot(selectedDate);
    setShowEventForm(true);
  };

  const handleDragStart = (date, hour) => {
    setIsDragging(true);
    setDragStart({ date, hour });
  };

  const handleDragEnd = (date, hour) => {
    if (isDragging) {
      setIsDragging(false);
      setDragEnd({ date, hour });
      setSelectedTimeSlot({ start: dragStart, end: { date, hour } });
      setShowEventForm(true);
    }
  };

  const MonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const sortEventsByTime = (events) => {
      return events.sort((a, b) => {
        const aTime = new Date(a.start);
        const bTime = new Date(b.start);
        return aTime - bTime;
      });
    };

    const isEventPassed = (eventStart) => {
      const now = new Date();
      const eventTime = new Date(eventStart);
      return eventTime < now;
    };

    return (
      <div className="bg-white  rounded-b-2xl overflow-hidden">
        <div className="grid grid-cols-7 bg-white">
          {weekDays.map((day) => (
            <div
              key={day}
              className="h-16 border-b border-r border-gray-200 text-center font-nunito p-4 sticky top-0 bg-cal-header"
            >
              <span className="font-bold text-gray-500">{day}</span>
            </div>
          ))}
          {days.map((day, index) => {
            let dayEvents = events.filter(
              (event) =>
                new Date(event.start).toDateString() === day.toDateString()
            );

            // Sort events by time and separate passed events
            const sortedEvents = sortEventsByTime(dayEvents);
            const passedEvents = sortedEvents.filter((event) =>
              isEventPassed(event.start)
            );
            const upcomingEvents = sortedEvents.filter(
              (event) => !isEventPassed(event.start)
            );

            // Combine events with passed events at the end
            dayEvents = [...upcomingEvents, ...passedEvents];

            return (
              <div
                key={index}
                className={`min-h-[120px] border-b border-r border-gray-200 p-2 transition-all duration-200 hover:bg-gray-50 ${
                  day.getMonth() === currentDate.getMonth()
                    ? "bg-white"
                    : "bg-gray-50"
                }`}
                onClick={() => handleTimeSlotClick(day, 9)}
              >
                <div
                  className={`text-right font-nunito font-bold ${
                    day.getMonth() === currentDate.getMonth()
                      ? day.toDateString() === new Date().toDateString()
                        ? "text-amber-700"
                        : "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  {day.getDate()}
                </div>
                <div className="mt-2 relative">
                  {dayEvents.map((event, eventIndex) => {
                    const isPassed = isEventPassed(event.start);
                    const stackOffset = (dayEvents.length - eventIndex - 1) * 8; // Increased offset for better visibility
                    const isTopCard = eventIndex === 0;

                    return (
                      <div
                        key={event.id}
                        className={`absolute w-full rounded-lg shadow-sm transition-all duration-200 
                          ${
                            isTopCard
                              ? "hover:scale-[1.02] hover:shadow-md cursor-pointer z-10"
                              : ""
                          }
                          ${isPassed ? "opacity-60" : ""}`}
                        style={{
                          backgroundColor: getLocationColor(event.location),
                          top: `${stackOffset}px`,
                          zIndex: isTopCard
                            ? 10
                            : dayEvents.length - eventIndex,
                          height: isTopCard ? "70px" : "24px", // Increased height for background cards
                          opacity: isTopCard ? 1 : 0.96, // Slightly more visible background cards
                        }}
                      >
                        {isTopCard ? (
                          // Top card with full details
                          <div className="p-2">
                            <div className="text-[0.82rem] font-bold font-nunito text-primary truncate">
                              {event.title}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {new Date(event.start).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        ) : (
                          // Background cards now show a minimal hint of event title
                          <div className="h-full rounded-lg px-2 py-1"></div>
                        )}
                      </div>
                    );
                  })}
                  {/* Adjusted spacer div for new card heights */}
                  {dayEvents.length > 0 && (
                    <div
                      style={{ height: `${(dayEvents.length - 1) * 8 + 70}px` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const DayView = () => {
    // Adjusted to show only 8 AM to 8 PM (13 hours) like week view
    const hours = Array.from({ length: 13 }, (_, i) => i + 8);

    const getEventsForHour = (hour) => {
      return events.filter((event) => {
        const eventDate = new Date(event.start);
        return (
          eventDate.toDateString() === currentDate.toDateString() &&
          eventDate.getHours() === hour
        );
      });
    };

    const calculateEventPosition = (event) => {
      const startTime = new Date(event.start);
      const endTime = new Date(event.end);

      const startHour = startTime.getHours() + startTime.getMinutes() / 60;
      const endHour = endTime.getHours() + endTime.getMinutes() / 60;
      const duration = endHour - startHour;

      return {
        top: `${(startHour - 8) * 100}px`,
        height: `${duration * 100}px`,
      };
    };

    return (
      <div className="flex bg-white rounded-b-2xl overflow-hidden">
        {/* Time labels column */}
        <div className="w-[10%] border-x border-gray-200 bg-white">
          <div className="h-16 border-b border-gray-200" />
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-[100px] border-b border-gray-200 pr-2 relative"
            >
              <span className="absolute top-3 right-2 text-[0.8rem] font-nunito font-bold text-gray-400">
                {hour === 0
                  ? "12 AM"
                  : hour < 12
                  ? `${hour} AM`
                  : hour === 12
                  ? "12 PM"
                  : `${hour - 12} PM`}
              </span>
            </div>
          ))}
        </div>

        {/* Events column */}
        <div className="relative w-full">
          <div className="h-16 border-b border-gray-200 text-center font-nunito p-4 sticky top-0 bg-cal-header">
            <div className="font-bold text-gray-500">
              {currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[100px] border-b border-gray-200"
                onDoubleClick={() => handleTimeSlotClick(currentDate, hour)}
              >
                <div className="h-[50px] border-b border-gray-100" />
              </div>
            ))}

            {events
              .filter(
                (event) =>
                  new Date(event.start).toDateString() ===
                  currentDate.toDateString()
              )
              .map((event) => {
                const position = calculateEventPosition(event);
                return (
                  <div
                    key={event.id}
                    className="absolute left-1 right-1 rounded-lg shadow-sm p-2 transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer"
                    style={{
                      ...position,
                      backgroundColor: getLocationColor(event.location),
                    }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="text-sm font-bold font-nunito text-primary truncate">
                        {event.title}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-700">
                          {event.interviewer}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  };

  const WeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    // Adjusted to show only 8 AM to 8 PM (13 hours)
    const hours = Array.from({ length: 13 }, (_, i) => i + 8);

    const getEventsForDay = (date) => {
      return events.filter((event) => {
        const eventDate = new Date(event.start);
        return eventDate.toDateString() === date.toDateString();
      });
    };

    const calculateEventPosition = (event) => {
      const startTime = new Date(event.start);
      const endTime = new Date(event.end);

      const startHour = startTime.getHours() + startTime.getMinutes() / 60;
      const endHour = endTime.getHours() + endTime.getMinutes() / 60;
      const duration = endHour - startHour;

      // Adjust position calculation for 8 AM start time and new row height
      return {
        top: `${(startHour - 8) * 100}px`, // Adjusted for new row height
        height: `${duration * 100}px`, // Adjusted for new row height
      };
    };

    const formatTime = (dateString) => {
      return new Date(dateString).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    };

    return (
      <div className="">
        <div className="grid grid-cols-8 bg-white rounded-b-2xl overflow-hidden">
          {/* Time labels column */}
          <div className="border-x border-gray-200 bg-white">
            <div className="h-16 border-b border-gray-200" />{" "}
            {/* Increased header height */}
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[100px] border-b border-gray-200 pr-2 relative" // Increased row height
              >
                <span className="absolute top-3 right-2 text-[0.8rem] font-nunito font-bold text-gray-400">
                  {hour === 0
                    ? "12 AM"
                    : hour < 12
                    ? `${hour} AM`
                    : hour === 12
                    ? "12 PM"
                    : `${hour - 12} PM`}
                </span>
              </div>
            ))}
          </div>

          {/* Days columns with vertical grid lines */}
          {days.map((day, dayIndex) => (
            <div key={day.toISOString()} className="relative">
              {/* Day header */}
              <div className="h-16 border-b border-gray-200 text-center font-nunito p-4 sticky top-0 bg-cal-header z-10">
                {/* Increased padding and height */}
                <div
                  className={`font-bold flex items-center gap-2 ${
                    day.toDateString() === new Date().toDateString()
                      ? "text-amber-700"
                      : "text-gray-500"
                  }`}
                >
                  <span>
                    {day.toLocaleDateString("en-US", { weekday: "long" })},
                  </span>
                  <span>{day.getDate()}</span>
                </div>
              </div>

              {/* Time grid */}
              <div className="relative border-r">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-[100px] border-b border-gray-200" // Increased row height
                    onDoubleClick={() => handleTimeSlotClick(day, hour)}
                  >
                    {/* Half-hour marker */}
                    <div className="h-[50px] border-b border-gray-100"></div>{" "}
                    {/* Adjusted half-hour marker */}
                  </div>
                ))}

                {/* Events */}
                {getEventsForDay(day).map((event) => {
                  const position = calculateEventPosition(event);
                  return (
                    <div
                      key={event.id}
                      className="absolute left-1 right-1 rounded-lg shadow-sm p-2 transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer overflow-hidden"
                      style={{
                        ...position,
                        backgroundColor: getLocationColor(event.location),
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="text-[0.85rem] font-bold font-nunito text-primary truncate">
                          {event.title}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {formatTime(event.start)} - {formatTime(event.end)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-700">
                            {event.interviewer}
                          </span>
                        </div>
                        {position.height > 100 && ( // Adjusted threshold for showing additional info
                          <>
                            <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <img
                                src={<FaUser />}
                                alt={event.interviewer}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-xs text-gray-700">
                                {event.interviewer}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl bg-gray-200 border">
      {/* Header */}
      <div className="pt-4 pb-2 px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-10">
            <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
              <button
                onClick={() => navigateDate("prev")}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <FaAngleLeft size={22} className="" />
              </button>
              <button
                onClick={() => navigateDate("next")}
                className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <FaAngleRight size={22} className="" />
              </button>
            </div>
            <div>
              <h1 className="text-xl font-extrabold font-nunito text-gray-600">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h1>
              <p className="text-sm text-gray-500">
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-white p-1 rounded-lg shadow-sm">
              {["day", "week", "month"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 rounded-md text-sm font-nunito font-bold capitalize transition-colors ${
                    view === v
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowEventForm(true)}
              className="flex items-center gap-2 px-4 py-2 text-white font-semibold bg-amber-600 rounded-lg hover:bg-amber-700 shadow-sm"
            >
              <TbCalendarPlus size={20} />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>

        {/* Location Legend */}
        <div className="flex gap-4 flex-wrap p-4  rounded-xl ">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center gap-2">
              <div
                className="w-5 h-3 rounded-xl border border-gray-300"
                style={{ backgroundColor: location.color }}
              />
              <span className="text-sm font-semibold font-nunito  text-gray-600">
                {location.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Views */}
      {view === "month" && <MonthView />}
      {view === "week" && <WeekView />}
      {view === "day" && <DayView />}

      {/* Event Form Modal */}
      {showEventForm && (
        <EventForm
          onClose={() => {
            setShowEventForm(false);
            setSelectedTimeSlot(null);
          }}
          selectedTimeSlot={selectedTimeSlot}
          setEvents={setEvents}
        />
      )}
    </div>
  );
};

export default Calendar;
