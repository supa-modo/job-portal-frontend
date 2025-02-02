import React, { useState } from "react";
import { Link, Clock, MapPin, User, Calendar, ChevronDown } from "lucide-react";

const locations = [
  { id: 1, name: "Online", color: "#c8e5fc" },
  { id: 2, name: "Main Conference Room", color: "#c6e6c7" },
  { id: 3, name: "Room 205", color: "#ffe7c4" },
  { id: 4, name: "Room 300", color: "#9c27b0" },
  { id: 5, name: "Virtual Conference Room", color: "#fccecb" },
  // { id: 6, name: "Ballroom Premium", color: "#795548" },
  // { id: 7, name: "Main Branch Meeting Room", color: "#607d8b" },
];

const EventForm = ({ onClose, selectedTimeSlot, setEvents }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    candidate: "",
    interviewer: "",
    meetingLink: "",
    date: selectedTimeSlot ? selectedTimeSlot.toISOString().split("T")[0] : "",
    startTime: selectedTimeSlot
      ? selectedTimeSlot.toTimeString().substring(0, 5)
      : "09:00",
    endTime: selectedTimeSlot
      ? new Date(selectedTimeSlot.getTime() + 60 * 60 * 1000)
          .toTimeString()
          .substring(0, 5)
      : "10:00",
    location: "Online",
    type: "Portfolio Review",
    color: "#e3f2fd",
  });

  const handleSave = () => {
    const newEvent = {
      id: Date.now(),
      title: formData.title,
      start: `${formData.date}T${formData.startTime}`,
      end: `${formData.date}T${formData.endTime}`,
      startTime: formData.startTime,
      endTime: formData.endTime,
      type: formData.type,
      location: formData.location,
      interviewer: formData.interviewer,
      color:
        locations.find((loc) => loc.name === formData.location)?.color ||
        "#e3f2fd",
    };

    setEvents((prev) => [...prev, newEvent]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[480px] max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Schedule Interview
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="First Stage Interview"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Participants */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <User className="w-4 h-4" /> Candidate
              </label>
              <input
                type="text"
                value={formData.candidate}
                onChange={(e) =>
                  setFormData({ ...formData, candidate: e.target.value })
                }
                placeholder="Kristi Sipes"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <User className="w-4 h-4" /> Interviewer
              </label>
              <input
                type="text"
                value={formData.interviewer}
                onChange={(e) =>
                  setFormData({ ...formData, interviewer: e.target.value })
                }
                placeholder="Raihan Fikri"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Clock className="w-4 h-4" /> Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Location
            </label>
            <div className="relative">
              <select
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Meeting Link */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Link className="w-4 h-4" /> Meeting Link
            </label>
            <input
              type="text"
              value={formData.meetingLink}
              onChange={(e) =>
                setFormData({ ...formData, meetingLink: e.target.value })
              }
              placeholder="meet.google.com/uix-2htb-zez"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Schedule Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
