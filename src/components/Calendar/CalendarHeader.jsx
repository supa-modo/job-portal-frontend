import React from "react";
import { formatDate } from "../../utils/dateUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarHeader = ({ currentDate, view, onViewChange, onNavigate }) => {
  return (
    <header className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {formatDate(currentDate, "MMMM yyyy")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {formatDate(currentDate, "EEEE, MMMM d")}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2">
          <button
            onClick={() => onNavigate("prev")}
            className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onNavigate("next")}
            className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-all"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
          {["day", "week", "month"].map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                view === v
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
