import React, { useState } from "react";
import { Link, Clock, Repeat, MoreHorizontal } from "lucide-react";

const EventForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    candidate: "",
    interviewer: "",
    meetingLink: "",
    education: false,
    experience: false,
    date: "",
    startTime: "",
    endTime: "",
    timezone: "(UTC+07:00)",
    isAllDay: false,
    repeat: false,
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[460px] max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        {/* Header */}
        <div className="space-y-3 border-b pb-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="First Stage Interview"
            className="w-full text-2xl font-bold text-gray-900 bg-transparent border-none focus:outline-none"
          />
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Briefly describe the event..."
            className="w-full text-gray-500 bg-transparent border-none focus:outline-none resize-none"
          />
        </div>

        {/* Content */}
        <div className="py-4 space-y-6">
          {/* Participants */}
          <div className="space-y-3">
            {[
              {
                label: "Candidate",
                field: "candidate",
                placeholder: "Kristi Sipes",
              },
              {
                label: "Interviewer",
                field: "interviewer",
                placeholder: "Raihan Fikri",
              },
            ].map(({ label, field, placeholder }) => (
              <div className="flex items-center gap-4" key={field}>
                <div className="w-24 text-gray-500 text-sm font-medium">
                  {label}
                </div>
                <input
                  type="text"
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  placeholder={placeholder}
                  className="flex-1 py-2 border-b focus:outline-none text-gray-900"
                />
              </div>
            ))}
          </div>

          {/* Meeting Link */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Link className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.meetingLink}
              onChange={(e) =>
                setFormData({ ...formData, meetingLink: e.target.value })
              }
              placeholder="meet.google.com/uix-2htb-zez"
              className="flex-1 bg-transparent border-none focus:outline-none"
            />
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm font-medium">
              Online
            </span>
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            {["education", "experience"].map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setFormData({ ...formData, [tag]: !formData[tag] })
                }
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  formData[tag]
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tag === "education"
                  ? "Relevant Education"
                  : "Research Experience"}
              </button>
            ))}
          </div>

          {/* Time Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="text-gray-900 border-b focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="text-gray-900 border-b focus:outline-none"
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="text-gray-900 border-b focus:outline-none"
              />
              <span className="text-gray-500">{formData.timezone}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
