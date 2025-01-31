import React, { useState } from "react";
import { Building, ChevronLeft, MapPin, User } from "lucide-react";
import JobInfoTab from "../components/JobDetails Tabs/JobInfoTab";
import JobDetailsCalendar from "../components/JobDetails Tabs/JobDetailsCalendar";
import { jobData } from "../data/jobData";
import ScoreCardTab from "../components/JobDetails Tabs/ScoreCardTab";
import ActivityTab from "../components/JobDetails Tabs/ActivityTab";
import ApplicationFormTab from "../components/JobDetails Tabs/ApplicationFormTab";
import AutomationTab from "../components/JobDetails Tabs/AutomationTab";
import { RiAdminLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  PiBuildingApartmentDuotone,
  PiBuildingDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { LuCalendarPlus } from "react-icons/lu";
import { MdLocationPin } from "react-icons/md";
import { TbActivity, TbAutomation, TbBriefcaseFilled } from "react-icons/tb";
import { BsCardChecklist } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import candidates from "../data/Candidates.json";
import CandidatesTab from "../components/JobDetails Tabs/CandidatesTab";

const JobDetails = () => {
  const [activeTab, setActiveTab] = useState("candidates");
  const navigate = useNavigate();

  const handleViewCandidate = (candidate) => {
    // Your view logic here
    console.log("Viewing candidate:", candidate);
  };

  const tabItems = [
    {
      id: "candidates",
      label: "Candidates",
      count: jobData.candidates.length,
      icon: PiUsersThreeDuotone,
    },
    { id: "job-info", label: "Job Info", icon: TbBriefcaseFilled },
    { id: "calendar", label: "Calendar", icon: LuCalendarPlus },
    { id: "score-card", label: "Score Card", icon: BsCardChecklist },
    { id: "activity", label: "Activity", icon: TbActivity },
    {
      id: "application-form",
      label: "Application Form",
      icon: HiOutlineClipboardDocumentList,
    },
    { id: "automation", label: "Automation", count: "5", icon: TbAutomation },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "candidates":
        return (
          <CandidatesTab
            candidates={candidates}
            onViewCandidate={handleViewCandidate}
          />
        );
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
    <div className="px-10 py-6 mx-auto">
      <button
        className="flex items-center text-gray-600 hover:text-amber-600 mb-3"
        onClick={() => {
          navigate("/jobs");
        }}
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        <span className="font-medium">Back to Jobs</span>
      </button>

      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h1 className="text-3xl font-extrabold font-sans tracking- text-primary mb-6">
          {jobData.title}
        </h1>
        <div className="flex items-center space-x-6 font-nunito text-[0.94rem] tracking-tight font-semibold">
          <div className="flex items-center text-gray-500">
            <PiBuildingDuotone className="w-5 h-5 mr-2" />
            <span>{jobData.department}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MdLocationPin className="w-5 h-5 mr-2" />
            <span>{jobData.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <RiAdminLine className="w-5 h-5 mr-2" />
            <span>Posted by: </span>
            <span className="font-bold text-amber-600 font-nunito pl-3 underline underline-offset-4">
              {jobData.contactPerson.name}
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300 mb-6">
        <div className="flex items-center font-nunito font-semibold space-x-6">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-4 px-3 relative ${
                activeTab === tab.id
                  ? "text-gray-600 font-bold border-b-[3px] border-gray-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {tab.count && (
                <span className="bg-gray-300 text-gray-600 font-open text-[0.8rem] px-2 py-0.5 rounded-lg">
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
