import React from "react";

const JobDetailsCalendar = () => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const period = hour >= 12 ? "pm" : "am";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00${period}`;
  });

  const days = [
    { date: "04", day: "Sunday" },
    { date: "05", day: "Monday" },
    { date: "06", day: "Tuesday" },
    { date: "07", day: "Wednesday" },
    { date: "08", day: "Thursday" },
    { date: "09", day: "Friday" },
    { date: "10", day: "Saturday" },
  ];

  const locations = [
    { id: "online", label: "Online", color: "bg-green-500" },
    { id: "main-branch", label: "Main Branch Office", color: "bg-purple-500" },
    { id: "main-lobby", label: "Main Lobby Office", color: "bg-blue-500" },
    { id: "guest", label: "Guest Room", color: "bg-gray-300" },
    {
      id: "first-class",
      label: "First Class Guest Room",
      color: "bg-gray-400",
    },
    { id: "ballroom", label: "Ballroom Premium", color: "bg-amber-500" },
    {
      id: "meeting",
      label: "Main Branch Meeting Room",
      color: "bg-orange-500",
    },
  ];

  const interviews = [
    {
      id: 1,
      candidate: "Randy Dibbert",
      avatar: "/api/placeholder/32/32",
      type: "Stage 3 Interview - Live design",
      time: "10:00am - 11:30am",
      day: "Monday",
      location: "online",
      color: "bg-blue-100",
    },
    {
      id: 2,
      candidate: "Cameron Dickens",
      avatar: "/api/placeholder/32/32",
      type: "First Stage Interview",
      time: "09:45am - 10:45am",
      day: "Wednesday",
      location: "main-lobby",
      color: "bg-blue-100",
    },
    {
      id: 3,
      candidate: "Kristi Sipes",
      avatar: "/api/placeholder/32/32",
      type: "Technical Assessment",
      time: "08:00am - 09:00am",
      day: "Wednesday",
      location: "main-lobby",
      color: "bg-blue-100",
    },
    {
      id: 4,
      candidate: "Isadora Martinez",
      avatar: "/api/placeholder/32/32",
      type: "First Stage Interview - Psychological testing",
      time: "09:45am - 10:45am",
      day: "Tuesday",
      location: "online",
      color: "bg-yellow-100",
    },
    {
      id: 5,
      candidate: "Brooklyn Simmons",
      avatar: "/api/placeholder/32/32",
      type: "Technical Interview",
      time: "09:45am - 10:45am",
      day: "Thursday",
      location: "online",
      color: "bg-blue-100",
    },
  ];

  const getInterviewPosition = (time) => {
    const [startTime] = time.split(" - ");
    const [hours, minutes] = startTime.split(":");
    const hour = parseInt(hours);
    const minute = parseInt(minutes);
    return (hour - 9) * 64 + (minute / 60) * 64;
  };

  const getInterviewDuration = (time) => {
    const [startTime, endTime] = time.split(" - ");
    const [startHours, startMinutes] = startTime.split(":");
    const [endHours, endMinutes] = endTime.split(":");

    const start = parseInt(startHours) + parseInt(startMinutes) / 60;
    const end = parseInt(endHours) + parseInt(endMinutes) / 60;

    return (end - start) * 64;
  };

  const getInterviewColumn = (day) => {
    return days.findIndex((d) => d.day === day) + 1;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button className="px-4 py-1.5 text-sm font-medium rounded bg-gray-900 text-white">
                Week
              </button>
              <button className="px-4 py-1.5 text-sm font-medium rounded hover:bg-gray-100">
                Month
              </button>
              <button className="px-4 py-1.5 text-sm font-medium rounded hover:bg-gray-100">
                Day
              </button>
            </div>
            <div className="text-lg font-medium">October 2023</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button className="p-1.5 rounded hover:bg-gray-100">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="p-1.5 rounded hover:bg-gray-100">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <button className="px-4 py-1.5 text-sm font-medium rounded hover:bg-gray-100">
              Today
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center space-x-2">
              <div className={`w-3 h-3 ${location.color} rounded-sm`}></div>
              <span className="text-sm text-gray-600">{location.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-8 border-b">
        <div className="p-4 border-r text-sm text-gray-500">Time</div>
        {days.map((day) => (
          <div key={day.date} className="p-4 border-r">
            <div className="font-medium">{day.day}</div>
            <div className="text-gray-500">{day.date}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="grid grid-cols-8">
          <div className="border-r">
            {timeSlots.slice(9, 17).map((time) => (
              <div
                key={time}
                className="h-28 border-b p-2 text-sm text-gray-500"
              >
                {time}
              </div>
            ))}
          </div>
          {days.map((day) => (
            <div key={day.date} className="border-r">
              {timeSlots.slice(9, 17).map((_, idx) => (
                <div key={idx} className="h-28 border-b">
                  <div className="border-t border-gray-100 border-dashed relative top-1/2"></div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Time indicator line */}
        <div
          className="absolute left-0 right-0 border-t-2 border-red-500"
          style={{ top: "24px" }}
        >
          <div className="absolute -left-2 -top-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>

        {/* Interview Blocks */}
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className={`absolute rounded-lg p-3 ${interview.color} shadow-sm`}
            style={{
              top: `${getInterviewPosition(interview.time)}px`,
              height: `${getInterviewDuration(interview.time)}px`,
              left: `${getInterviewColumn(interview.day) * 12.5}%`,
              width: "11%",
            }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <img
                src={interview.avatar}
                alt={interview.candidate}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium">{interview.candidate}</span>
            </div>
            <div className="text-xs text-gray-600">{interview.type}</div>
            <div className="text-xs text-gray-500 mt-1">{interview.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDetailsCalendar;
