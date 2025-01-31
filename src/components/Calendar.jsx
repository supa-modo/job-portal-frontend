import { TbCalendarCheck } from "react-icons/tb";

const Calendar = ({ interviews, locations, days, timeSlots }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex space-x-2">
            <button className="px-4 py-1 text-sm rounded bg-gray-900 text-white">
              Week
            </button>
            <button className="px-4 py-1 text-sm rounded hover:bg-gray-100">
              Month
            </button>
          </div>
          <div className="text-lg font-medium">October 2023</div>
          <div className="flex space-x-2">
            <button className="px-2 py-1 rounded hover:bg-gray-100">
              &lt;
            </button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">
              &gt;
            </button>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center space-x-1">
              <div className={`w-3 h-3 ${location.color} rounded-sm`}></div>
              <span className="text-xs text-gray-600">{location.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-8 border-b">
        <div className="p-2 border-r text-sm text-gray-500">Time</div>
        {days.map((day) => (
          <div key={day.date} className="p-2 border-r text-sm">
            <div className="font-medium">{day.day}</div>
            <div className="text-gray-500">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="relative">
        <div className="grid grid-cols-8">
          <div className="border-r">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-16 border-b p-2 text-xs text-gray-500"
              >
                {time}
              </div>
            ))}
          </div>
          {days.map((day) => (
            <div key={day.date} className="border-r">
              {timeSlots.map((_, idx) => (
                <div key={idx} className="h-16 border-b"></div>
              ))}
            </div>
          ))}
        </div>

        {/* Interview Blocks */}
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="absolute bg-blue-100 rounded p-2 left-1/4 w-1/8"
            style={{ top: "40px", height: "80px" }}
          >
            <div className="text-xs font-medium">{interview.candidate}</div>
            <div className="text-xs text-gray-600">{interview.type}</div>
            <div className="text-xs text-gray-500">{interview.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
