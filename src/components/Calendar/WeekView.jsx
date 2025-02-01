import React from "react";
import { getWeekDays, formatDate, getEventStyle } from "../../utils/dateUtils";

const WeekView = ({ currentDate, events, onSelectDate }) => {
  const weekDays = getWeekDays(currentDate);

  return (
    <div className="grid grid-cols-8 gap-0.5 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="col-span-1 bg-gray-50"></div>
      {weekDays.map((day) => (
        <div
          key={day.toISOString()}
          className="text-center font-semibold p-3 text-gray-700 bg-gray-50 border-b border-gray-200"
        >
          {formatDate(day, "EEE d")}
        </div>
      ))}
      <div className="col-span-8 grid grid-cols-8 border border-gray-200 rounded-lg overflow-hidden">
        {Array.from({ length: 24 }).map((_, hour) => (
          <React.Fragment key={hour}>
            <div className="text-right pr-3 py-2 text-sm text-gray-500 bg-gray-50 border-r border-gray-200">
              {hour}:00
            </div>
            {weekDays.map((day) => {
              const hourEvents = events.filter(
                (event) =>
                  new Date(event.start).getDate() === day.getDate() &&
                  new Date(event.start).getHours() === hour
              );
              return (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className="border-t border-r border-gray-200 relative hover:bg-gray-50 transition-colors group"
                  style={{ height: "60px" }}
                  onClick={() => onSelectDate(new Date(day.setHours(hour)))}
                >
                  <div className="absolute inset-0 border-b border-gray-200 group-last:border-b-0"></div>
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className="absolute w-[calc(100%-4px)] m-0.5 p-2 rounded-md text-xs overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md"
                      style={{
                        ...getEventStyle(event),
                        backgroundColor: event.color || "#3b82f6",
                        color: "#ffffff",
                      }}
                    >
                      <div className="font-semibold">{event.title}</div>
                      <div>
                        {formatDate(new Date(event.start), "HH:mm")} -{" "}
                        {formatDate(new Date(event.end), "HH:mm")}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
