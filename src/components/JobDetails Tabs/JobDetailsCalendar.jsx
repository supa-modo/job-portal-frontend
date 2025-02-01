import React, { useState } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  addDays,
  isSameMonth,
  isSameDay,
  parse,
  getHours,
  setHours,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

const ViewType = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState(ViewType.MONTH);
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: null,
    end: null,
  });

  // Navigation functions
  const nextPeriod = () => {
    switch (viewType) {
      case ViewType.MONTH:
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case ViewType.WEEK:
      case ViewType.DAY:
        setCurrentDate(addDays(currentDate, 7));
        break;
    }
  };

  const prevPeriod = () => {
    switch (viewType) {
      case ViewType.MONTH:
        setCurrentDate(addMonths(currentDate, -1));
        break;
      case ViewType.WEEK:
      case ViewType.DAY:
        setCurrentDate(addDays(currentDate, -7));
        break;
    }
  };

  // Get days to display based on view type
  const getDaysToDisplay = () => {
    switch (viewType) {
      case ViewType.MONTH:
        return eachDayOfInterval({
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate),
        });
      case ViewType.WEEK:
        return eachDayOfInterval({
          start: startOfWeek(currentDate),
          end: endOfWeek(currentDate),
        });
      case ViewType.DAY:
        return [currentDate];
    }
  };

  // Generate time slots for day view
  const getTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push(setHours(new Date(), i));
    }
    return slots;
  };

  // Handle slot click
  const handleSlotClick = (date, hour = null) => {
    const selectedDate = hour !== null ? setHours(date, hour) : date;
    setSelectedSlot(selectedDate);
    setNewEvent({
      title: "",
      start: selectedDate,
      end: addDays(selectedDate, 1),
    });
    setShowEventModal(true);
  };

  // Handle event creation
  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents([...events, newEvent]);
      setShowEventModal(false);
      setNewEvent({ title: "", start: null, end: null });
    }
  };

  // Render month view
  const MonthView = () => {
    const days = getDaysToDisplay();
    return (
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
        {days.map((day, idx) => (
          <div
            key={idx}
            onClick={() => handleSlotClick(day)}
            className={`
              min-h-24 p-2 border border-gray-200 cursor-pointer
              ${!isSameMonth(day, currentDate) ? "bg-gray-50" : "bg-white"}
              ${isSameDay(day, new Date()) ? "bg-blue-50" : ""}
              hover:bg-gray-50 transition-colors
            `}
          >
            <div className="font-medium text-sm">{format(day, "d")}</div>
            <div className="mt-1">
              {events
                .filter((event) =>
                  isSameDay(parse(event.start, "PP", new Date()), day)
                )
                .map((event, eventIdx) => (
                  <div
                    key={eventIdx}
                    className="text-xs p-1 mb-1 bg-blue-500 text-white rounded truncate"
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render week view
  const WeekView = () => {
    const days = getDaysToDisplay();
    const timeSlots = getTimeSlots();

    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-8 border-b">
          <div className="p-2 text-center font-semibold text-gray-600">
            Time
          </div>
          {days.map((day, idx) => (
            <div
              key={idx}
              className="p-2 text-center font-semibold text-gray-600"
            >
              {format(day, "EEE d")}
            </div>
          ))}
        </div>
        <div className="flex-1">
          {timeSlots.map((time, timeIdx) => (
            <div key={timeIdx} className="grid grid-cols-8 border-b">
              <div className="p-2 text-right text-sm text-gray-600">
                {format(time, "HH:mm")}
              </div>
              {days.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  onClick={() => handleSlotClick(day, getHours(time))}
                  className="p-2 border-l cursor-pointer hover:bg-gray-50"
                >
                  {events
                    .filter(
                      (event) =>
                        isSameDay(parse(event.start, "PP", new Date()), day) &&
                        getHours(parse(event.start, "PP", new Date())) ===
                          getHours(time)
                    )
                    .map((event, eventIdx) => (
                      <div
                        key={eventIdx}
                        className="text-xs p-1 bg-blue-500 text-white rounded truncate"
                      >
                        {event.title}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render day view
  const DayView = () => {
    const timeSlots = getTimeSlots();

    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 text-center font-semibold text-gray-600">
            Time
          </div>
          <div className="p-2 text-center font-semibold text-gray-600">
            {format(currentDate, "EEEE, MMMM d")}
          </div>
        </div>
        {timeSlots.map((time, idx) => (
          <div key={idx} className="grid grid-cols-2 border-b">
            <div className="p-2 text-right text-sm text-gray-600">
              {format(time, "HH:mm")}
            </div>
            <div
              onClick={() => handleSlotClick(currentDate, getHours(time))}
              className="p-2 border-l cursor-pointer hover:bg-gray-50"
            >
              {events
                .filter(
                  (event) =>
                    isSameDay(
                      parse(event.start, "PP", new Date()),
                      currentDate
                    ) &&
                    getHours(parse(event.start, "PP", new Date())) ===
                      getHours(time)
                )
                .map((event, eventIdx) => (
                  <div
                    key={eventIdx}
                    className="text-xs p-1 bg-blue-500 text-white rounded truncate"
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevPeriod}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPeriod}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {format(currentDate, "MMMM yyyy")}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewType(ViewType.MONTH)}
              className={`px-4 py-2 rounded ${
                viewType === ViewType.MONTH
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewType(ViewType.WEEK)}
              className={`px-4 py-2 rounded ${
                viewType === ViewType.WEEK
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewType(ViewType.DAY)}
              className={`px-4 py-2 rounded ${
                viewType === ViewType.DAY
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Day
            </button>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="p-4">
          {viewType === ViewType.MONTH && <MonthView />}
          {viewType === ViewType.WEEK && <WeekView />}
          {viewType === ViewType.DAY && <DayView />}
        </div>

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
              <form onSubmit={handleCreateEvent}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
