import React, { useState } from 'react';
import { FaChevronLeft, FaUsers } from 'react-icons/fa';
import { TbShare3, TbCalendarCheck } from 'react-icons/tb';
import { MdLocationPin } from 'react-icons/md';

const JobDetails = () => {
  const [activeTab, setActiveTab] = useState('candidates');
  
  const tabItems = [
    { id: 'candidates', label: 'Candidates', count: '45' },
    { id: 'job-info', label: 'Job Info' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'score-card', label: 'Score Card' },
    { id: 'activity', label: 'Activity' },
    { id: 'application-form', label: 'Application Form' },
    { id: 'automation', label: 'Automation', count: '5' }
  ];

  const timeSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = 9 + i;
    return `${hour}:00`;
  });

  const days = [
    { date: '04', day: 'Sunday' },
    { date: '05', day: 'Monday' },
    { date: '06', day: 'Tuesday' },
    { date: '07', day: 'Wednesday' },
    { date: '08', day: 'Thursday' },
    { date: '09', day: 'Friday' },
    { date: '10', day: 'Saturday' }
  ];

  const locations = [
    { id: 'online', label: 'Online', color: 'bg-green-500' },
    { id: 'main-branch', label: 'Main Branch Office', color: 'bg-purple-500' },
    { id: 'lobby', label: 'Main Lobby Office', color: 'bg-blue-500' },
    { id: 'guest', label: 'Guest Room', color: 'bg-gray-300' },
    { id: 'first-class', label: 'First Class Guest Room', color: 'bg-gray-400' },
    { id: 'ballroom', label: 'Ballroom Premium', color: 'bg-amber-500' },
    { id: 'meeting', label: 'Main Branch Meeting Room', color: 'bg-orange-500' }
  ];

  const interviews = [
    {
      id: 1,
      candidate: 'Randy Dibbert',
      type: 'Stage 3 Interview - Live design',
      time: '10:00 - 11:30',
      day: 'Monday',
      location: 'online'
    },
    {
      id: 2,
      candidate: 'Cameron Dickens',
      type: 'First Stage Interview',
      time: '09:00 - 10:30',
      day: 'Wednesday',
      location: 'main-branch'
    }
  ];

  const CalendarView = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex space-x-2">
            <button className="px-4 py-1 text-sm rounded bg-gray-900 text-white">Week</button>
            <button className="px-4 py-1 text-sm rounded hover:bg-gray-100">Month</button>
            <button className="px-4 py-1 text-sm rounded hover:bg-gray-100">Day</button>
          </div>
          <div className="text-lg font-medium">October 2023</div>
          <div className="flex space-x-2">
            <button className="px-2 py-1 rounded hover:bg-gray-100">&lt;</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">&gt;</button>
          </div>
          <button className="px-4 py-1 text-sm rounded hover:bg-gray-100">Today</button>
        </div>

        <div className="flex space-x-2 mb-4">
          {locations.map(location => (
            <div key={location.id} className="flex items-center space-x-1">
              <div className={`w-3 h-3 ${location.color} rounded-sm`}></div>
              <span className="text-xs text-gray-600">{location.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-8 border-b">
        <div className="p-2 border-r text-sm text-gray-500">Time</div>
        {days.map(day => (
          <div key={day.date} className="p-2 border-r text-sm">
            <div className="font-medium">{day.day}</div>
            <div className="text-gray-500">{day.date}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="grid grid-cols-8">
          <div className="border-r">
            {timeSlots.map(time => (
              <div key={time} className="h-16 border-b p-2 text-xs text-gray-500">
                {time}
              </div>
            ))}
          </div>
          {days.map(day => (
            <div key={day.date} className="border-r">
              {timeSlots.map((_, idx) => (
                <div key={idx} className="h-16 border-b"></div>
              ))}
            </div>
          ))}
        </div>

        {/* Interview Blocks */}
        {interviews.map(interview => (
          <div
            key={interview.id}
            className="absolute bg-blue-100 rounded p-2 left-1/4 w-1/8"
            style={{
              top: '40px',
              height: '80px'
            }}
          >
            <div className="text-xs font-medium">{interview.candidate}</div>
            <div className="text-xs text-gray-600">{interview.type}</div>
            <div className="text-xs text-gray-500">{interview.time}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <CalendarView />;
      // Add other tab contents as needed
      default:
        return (
          <div className="p-6 bg-white rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Content for {activeTab}</h3>
            <p className="text-gray-600">Tab content goes here...</p>
          </div>
        );
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <button className="flex items-center text-gray-600 hover:text-amber-600 mb-4">
          <FaChevronLeft className="mr-2" />
          <span className="font-medium">Back to Jobs</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex items-center space-x-6">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-4 px-3 relative ${
                activeTab === tab.id
                  ? 'text-gray-900 font-medium border-b-2 border-amber-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default JobDetails;