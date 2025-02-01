import { formatDate, getEventStyle } from "../../utils/dateUtils";

const DayView = ({ currentDate, events, onSelectDate }) => {
  return (
    <div className="grid grid-cols-1 gap-1 bg-white rounded-xl shadow-sm p-4">
      {Array.from({ length: 24 }).map((_, hour) => {
        const hourEvents = events.filter(
          (event) =>
            new Date(event.start).getDate() === currentDate.getDate() &&
            new Date(event.start).getHours() === hour
        );
        return (
          <div
            key={hour}
            className="flex border-t border-gray-200 relative group"
            style={{ height: "60px" }}
            onClick={() => onSelectDate(new Date(currentDate.setHours(hour)))}
          >
            <div className="w-20 text-right pr-4 py-2 text-sm text-gray-500">
              {hour}:00
            </div>
            <div className="flex-grow relative">
              {hourEvents.map((event) => (
                <div
                  key={event.id}
                  className="absolute w-full p-2 rounded-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md"
                  style={{
                    ...getEventStyle(event),
                    backgroundColor: event.color || "#3b82f6",
                    color: "#ffffff",
                  }}
                >
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-xs">
                    {formatDate(new Date(event.start), "HH:mm")} -{" "}
                    {formatDate(new Date(event.end), "HH:mm")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayView;
