import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import JobInfoTab from "../components/JobDetails Tabs/JobInfoTab";
import { jobData } from "../data/jobData";
import { sampleJob } from "../data/JobInfo";
import ScoreCardTab from "../components/JobDetails Tabs/ScoreCardTab";
import ActivityTab from "../components/JobDetails Tabs/ActivityTab";
import ApplicationFormTab from "../components/JobDetails Tabs/ApplicationFormTab";
import AutomationTab from "../components/JobDetails Tabs/AutomationTab";
import { RiAdminLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import {
  PiBuildingDuotone,
  PiShareFatDuotone,
  PiUserCheckDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { MdLocationPin } from "react-icons/md";
import {
  TbActivity,
  TbAutomation,
  TbBriefcase,
  TbBriefcaseFilled,
} from "react-icons/tb";
import { BsCardChecklist } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import candidates from "../data/Candidates.json";
import CandidatesTab from "../components/JobDetails Tabs/CandidatesTab";
import Calendar from "../components/JobDetails Tabs/CalendarEventModal";
import ShortlistingCriteriaTab from "../components/JobDetails Tabs/ShortlistingCriteriaTab";

const JobDetails = () => {
  const [activeTab, setActiveTab] = useState("candidates");
  const navigate = useNavigate();
  const { id } = useParams();

  const job = jobData.find((j) => j.id === id);

  if (!job) {
    return <div>Job not found</div>;
  }

  const handleViewCandidate = (candidate) => {
    // Your view logic here
    console.log("Viewing candidate:", candidate);
  };

  const tabItems = [
    {
      id: "candidates",
      label: "Candidates",
      count: job?.candidates?.length || 0,
      icon: PiUsersThreeDuotone,
    },
    { id: "job-info", label: "Job Info", icon: TbBriefcaseFilled },
    { id: "calendar", label: "Calendar", icon: LuCalendarCheck2 },
    {
      id: "shortlisting-criteria",
      label: "Shortlisting",
      icon: PiUserCheckDuotone,
    },
    { id: "score-card", label: "Interview Score Card", icon: BsCardChecklist },
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
            candidates={job?.candidates || []}
            onViewCandidate={handleViewCandidate}
          />
        );
      case "job-info":
        return <JobInfoTab job={job} />;
      case "calendar":
        return <Calendar />;
      case "score-card":
        return <ScoreCardTab scoreCard={job?.scoreCard} />;
      case "activity":
        return <ActivityTab activities={job?.activity} />;
      case "application-form":
        return (
          <ApplicationFormTab
            formData={job?.applicationForm}
            onUpdate={console.log}
          />
        );
      case "automation":
        return (
          <AutomationTab
            automations={job?.automations}
            onUpdate={console.log}
          />
        );
      case "shortlisting-criteria":
        return <ShortlistingCriteriaTab />;
      default:
        return (
          <div className="p-6 bg-white rounded-lg">
            <p className="text-gray-600">
              Content for {activeTab} tab coming soon...
            </p>
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold font-sans tracking- text-primary">
            {job?.title}
          </h1>
          <button className="flex items-center space-x-2 bg-primary font-semibold text-white py-2 mr-4 px-4 rounded-md">
            <PiShareFatDuotone size={22} />
            <span>Share & Promote</span>
          </button>
        </div>
        <div className="flex items-center space-x-6 font-nunito text-[0.94rem] tracking-tight font-semibold">
          <div className="flex items-center text-gray-500">
            <PiBuildingDuotone className="w-5 h-5 mr-2" />
            <span>{job?.department}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <TbBriefcase className="w-5 h-5 mr-2" />
            <span>Senior Level</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MdLocationPin className="w-5 h-5 mr-2" />
            <span>{job?.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <RiAdminLine className="w-5 h-5 mr-2" />
            <span>Posted by: </span>
            <span className="font-bold text-amber-600 font-nunito pl-3 underline underline-offset-4">
              {job?.contactPerson?.name}
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
