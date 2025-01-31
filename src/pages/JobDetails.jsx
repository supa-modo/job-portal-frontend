import React, { useState } from "react";
import { Building, ChevronLeft, MapPin, User } from "lucide-react";
import CandidatesTab from "../components/CandidatesTab";
import JobInfoTab from "../components/JobInfoTab";
import JobDetailsCalendar from "../components/JobDetailsCalendar";
import { jobData } from "../data/jobData";
import ScoreCardTab from "../components/ScoreCardTab";
import ActivityTab from "../components/ActivityTab";
import ApplicationFormTab from "../components/ApplicationFormTab";
import AutomationTab from "../components/AutomationTab";

const JobDetails = () => {
  const [activeTab, setActiveTab] = useState("candidates");

  const tabItems = [
    { id: "candidates", label: "Candidates", count: jobData.candidates.length },
    { id: "job-info", label: "Job Info" },
    { id: "calendar", label: "Calendar" },
    { id: "score-card", label: "Score Card" },
    { id: "activity", label: "Activity" },
    { id: "application-form", label: "Application Form" },
    { id: "automation", label: "Automation", count: "5" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "candidates":
        return <CandidatesTab candidates={jobData.candidates} />;
      case "job-info":
        return <JobInfoTab jobData={jobData} onUpdate={console.log} />;
      case "calendar":
        return <JobDetailsCalendar interviews={jobData.interviews} />;
      case "score-card":
        return <ScoreCardTab scoreCard={jobData.scoreCard} />;
      case "activity":
        return <ActivityTab activities={jobData.activity} />;
      case "application-form":
        return (
          <ApplicationFormTab
            formData={jobData.applicationForm}
            onUpdate={console.log}
          />
        );
      case "automation":
        return (
          <AutomationTab
            automations={jobData.automations}
            onUpdate={console.log}
          />
        );

      default:
        return (
          <div className="p-6 bg-white rounded-lg">
            <p className="text-gray-600">Content for {activeTab} tab</p>
          </div>
        );
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <button className="flex items-center text-gray-600 hover:text-amber-600 mb-6">
        <ChevronLeft className="w-5 h-5 mr-2" />
        <span className="font-medium">Back to Jobs</span>
      </button>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {jobData.title}
        </h1>
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-gray-500">
            <Building className="w-5 h-5 mr-2" />
            <span>{jobData.department}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{jobData.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <User className="w-5 h-5 mr-2" />
            <span>{jobData.contactPerson.name}</span>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <div className="flex items-center space-x-6">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-4 px-3 relative ${
                activeTab === tab.id
                  ? "text-gray-900 font-medium border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-gray-700"
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

      {renderTabContent()}
    </div>
  );
};

export default JobDetails;
