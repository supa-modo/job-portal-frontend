import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import EventForm from "./Calendar/EventForm";

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
    start: "2025-02-05T10:30",
    startTime: "10:30",
    end: "2025-02-05T11:30",
    endTime: "11:30",
    type: "Portfolio Review",
    location: "Main Branch Office",
    interviewer: "Marvin McKinney",
    color: "#e3f2fd",
  },
  {
    id: 2,
    title: "Stage 3 Interview - Live Design",
    start: "2025-02-05T14:00",
    startTime: "14:00",
    end: "2025-02-05T15:00",
    endTime: "15:00",
    type: "Live Design",
    location: "Main Lobby Office",
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
    location: "Ballroom Premium",
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
    { id: 1, name: "Online", color: "#2196f3" },
    { id: 2, name: "Main Branch Office", color: "#4caf50" },
    { id: 3, name: "Main Lobby Office", color: "#ff9800" },
    { id: 4, name: "Guest Room", color: "#9c27b0" },
    { id: 5, name: "First Class Guest Room", color: "#f44336" },
    { id: 6, name: "Ballroom Premium", color: "#795548" },
    { id: 7, name: "Main Branch Meeting Room", color: "#607d8b" },
  ];

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

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map((day) => (
            <div
              key={day}
              className="bg-gray-50 p-4 text-center font-medium text-gray-700"
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const dayEvents = events.filter(
              (event) =>
                new Date(event.start).toDateString() === day.toDateString()
            );

            return (
              <div
                key={index}
                className={`bg-white min-h-[120px] p-2 ${
                  day.getMonth() === currentDate.getMonth()
                    ? "bg-white"
                    : "bg-gray-50"
                }`}
                onClick={() => handleTimeSlotClick(day, 9)}
              >
                <div
                  className={`text-right ${
                    day.getMonth() === currentDate.getMonth()
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {day.getDate()}
                </div>
                <div className="mt-1 space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded-md truncate"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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

    const hours = Array.from({ length: 12 }, (_, i) => i + 9);

    const getEventsForDayAndHour = (date, hour) => {
      return events.filter((event) => {
        const eventDate = new Date(event.start);
        return (
          eventDate.toDateString() === date.toDateString() &&
          eventDate.getHours() === hour
        );
      });
    };

    return (
      <div className="mt-4">
        <div className="grid grid-cols-8 gap-px bg-gray-200 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-gray-50 p-4 font-medium text-gray-500 text-center">
            Time
          </div>

          {days.map((day) => (
            <div key={day.toISOString()} className="bg-gray-50 p-4 text-center">
              <div className="font-medium text-gray-900">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div className="text-sm text-gray-500">{day.getDate()}</div>
            </div>
          ))}

          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="bg-white p-4 text-gray-500 text-right border-t">
                {`${hour}:00`}
              </div>

              {days.map((day) => (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className="relative bg-white border-t min-h-[100px] group hover:bg-gray-50 transition-colors cursor-pointer"
                  onMouseDown={() => handleDragStart(day, hour)}
                  onMouseUp={() => handleDragEnd(day, hour)}
                  onClick={() => handleTimeSlotClick(day, hour)}
                >
                  {getEventsForDayAndHour(day, hour).map((event) => (
                    <div
                      key={event.id}
                      className="absolute inset-x-0 mx-1 p-2 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                      style={{
                        backgroundColor: event.color,
                        top: "4px",
                        minHeight: "80px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src="/api/placeholder/32/32"
                          alt={event.interviewer}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {event.interviewer}
                          </div>
                          <div className="text-sm text-gray-600">
                            {event.type}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const DayView = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 9);

    const getEventsForHour = (hour) => {
      return events.filter((event) => {
        const eventDate = new Date(event.start);
        return (
          eventDate.toDateString() === currentDate.toDateString() &&
          eventDate.getHours() === hour
        );
      });
    };

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b text-center">
          <div className="font-medium text-gray-900">
            {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
          </div>
          <div className="text-sm text-gray-500">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="divide-y">
          {hours.map((hour) => (
            <div
              key={hour}
              className="flex min-h-[100px] group hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleTimeSlotClick(currentDate, hour)}
            >
              <div className="w-32 py-4 px-4 text-right text-gray-500">
                {`${hour}:00`}
              </div>
              <div className="flex-1 p-2 relative">
                {getEventsForHour(hour).map((event) => (
                  <div
                    key={event.id}
                    className="p-2 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                    style={{ backgroundColor: event.color }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src="/api/placeholder/32/32"
                        alt={event.interviewer}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {event.interviewer}
                        </div>
                        <div className="text-sm text-gray-600">
                          {event.type}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {event.startTime} - {event.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  //   const EventForm = ({ onClose }) => {
  //     const [formData, setFormData] = useState({
  //       title: "",
  //       date: selectedTimeSlot?.toISOString().split("T")[0] || "",
  //       startTime: "",
  //       endTime: "",
  //       location: "",
  //       interviewer: "",
  //       type: "",
  //     });

  //     const handleSubmit = (e) => {
  //       e.preventDefault();
  //       const newEvent = {
  //         id: Date.now(),
  //         title: formData.title,
  //         start: `${formData.date}T${formData.startTime}`,
  //         startTime: formData.startTime,
  //         end: `${formData.date}T${formData.endTime}`,
  //         endTime: formData.endTime,
  //         type: formData.type,
  //         location: formData.location,
  //         interviewer: formData.interviewer,
  //         color:
  //           locations.find((l) => l.name === formData.location)?.color ||
  //           "#e3f2fd",
  //       };
  //       setEvents([...events, newEvent]);
  //       onClose();
  //     };

  //     return (
  //       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  //         <div className="bg-white rounded-xl w-[500px] max-h-[90vh] overflow-y-auto">
  //           <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
  //             <h2 className="text-xl font-semibold text-gray-900">
  //               Schedule Interview
  //             </h2>
  //           </div>

  //           <form onSubmit={handleSubmit} className="p-6 space-y-6">
  //             <div className="space-y-2">
  //               <label className="block text-sm font-medium text-gray-700">
  //                 Title
  //               </label>
  //               <input
  //                 type="text"
  //                 value={formData.title}
  //                 onChange={(e) =>
  //                   setFormData({ ...formData, title: e.target.value })
  //                 }
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //                 placeholder="Interview Title"
  //               />
  //             </div>

  //             <div className="space-y-2">
  //               <label className="block text-sm font-medium text-gray-700">
  //                 Date
  //               </label>
  //               <input
  //                 type="date"
  //                 value={formData.date}
  //                 onChange={(e) =>
  //                   setFormData({ ...formData, date: e.target.value })
  //                 }
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>

  //             <div className="grid grid-cols-2 gap-4">
  //               <div className="space-y-2">
  //                 <label className="block text-sm font-medium text-gray-700">
  //                   Start Time
  //                 </label>
  //                 <input
  //                   type="time"
  //                   value={formData.startTime}
  //                   onChange={(e) =>
  //                     setFormData({ ...formData, startTime: e.target.value })
  //                   }
  //                   className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //                 />
  //               </div>
  //               <div className="space-y-2">
  //                 <label className="block text-sm font-medium text-gray-700">
  //                   End Time
  //                 </label>
  //                 <input
  //                   type="time"
  //                   value={formData.endTime}
  //                   onChange={(e) =>
  //                     setFormData({ ...formData, endTime: e.target.value })
  //                   }
  //                   className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //                 />
  //               </div>
  //             </div>

  //             <div className="space-y-2">
  //               <label className="block text-sm font-medium text-gray-700">
  //                 Location
  //               </label>
  //               <select
  //                 value={formData.location}
  //                 onChange={(e) =>
  //                   setFormData({ ...formData, location: e.target.value })
  //                 }
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //               >
  //                 <option value="">Select Location</option>
  //                 {locations.map((location) => (
  //                   <option key={location.id} value={location.name}>
  //                     {location.name}
  //                   </option>
  //                 ))}
  //               </select>
  //             </div>

  //             <div className="space-y-2">
  //               <label className="block text-sm font-medium text-gray-700">
  //                 Interviewer
  //               </label>
  //               <input
  //                 type="text"
  //                 value={formData.interviewer}
  //                 onChange={(e) =>
  //                   setFormData({ ...formData, interviewer: e.target.value })
  //                 }
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //                 placeholder="Interviewer Name"
  //               />
  //             </div>

  //             <div className="space-y-2">
  //               <label className="block text-sm font-medium text-gray-700">
  //                 Interview Type
  //               </label>
  //               <input
  //                 type="text"
  //                 value={formData.type}
  //                 onChange={(e) =>
  //                   setFormData({ ...formData, type: e.target.value })
  //                 }
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //                 placeholder="e.g., Portfolio Review, Technical Interview"
  //               />
  //             </div>

  //             <div className="flex justify-end gap-3 pt-4">
  //               <button
  //                 type="button"
  //                 onClick={onClose}
  //                 className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
  //               >
  //                 Cancel
  //               </button>
  //               <button
  //                 type="submit"
  //                 className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
  //               >
  //                 Schedule Interview
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     );
  //   };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => navigateDate("prev")}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateDate("next")}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
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
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  view === v
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowEventForm(true)}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
          >
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Location Legend */}
      <div className="flex gap-4 mb-6 flex-wrap bg-white p-4 rounded-xl shadow-sm">
        {locations.map((location) => (
          <div key={location.id} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: location.color }}
            />
            <span className="text-sm text-gray-600">{location.name}</span>
          </div>
        ))}
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
        />
      )}
    </div>
  );
};

export default Calendar;
