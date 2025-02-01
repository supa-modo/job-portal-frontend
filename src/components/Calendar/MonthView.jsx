import {
  getMonthDays,
  formatDate,
  isSameMonth,
  isSameDay,
} from "../../utils/dateUtils";

const MonthView = ({ currentDate, events, onSelectDate }) => {
  const monthDays = getMonthDays(currentDate);

  return (
    <div className="grid grid-cols-7 gap-1 bg-white rounded-xl shadow-sm p-4">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-center font-semibold p-2 text-gray-500">
          {day}
        </div>
      ))}
      {monthDays.map((day) => {
        const dayEvents = events.filter((event) =>
          isSameDay(new Date(event.start), day)
        );
        return (
          <div
            key={day.toISOString()}
            className={`p-2 border rounded-lg transition-all duration-200 ${
              isSameMonth(day, currentDate)
                ? "bg-white hover:bg-gray-50"
                : "bg-gray-100"
            } ${
              isSameDay(day, new Date())
                ? "border-blue-500 shadow-md"
                : "border-gray-200"
            }`}
            onClick={() => onSelectDate(day)}
          >
            <div className="font-semibold text-right text-sm">
              {formatDate(day, "d")}
            </div>
            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="text-xs p-1 rounded-md truncate cursor-pointer transition-colors duration-200"
                  style={{
                    backgroundColor: event.color || "#3b82f6",
                    color: "#ffffff",
                  }}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-500 text-center">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;
