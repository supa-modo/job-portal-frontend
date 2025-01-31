import { useState } from "react";
import {
  TbBriefcase,
  TbUsers,
  TbPlus,
  TbLocation,
  TbArrowRight,
  TbListDetails,
  TbLayoutGrid,
} from "react-icons/tb";
import { motion } from "framer-motion";
import { FaBriefcase, FaChevronRight, FaLocationPin } from "react-icons/fa6";
import { MdArrowRight, MdLocationPin } from "react-icons/md";
import { BsGrid, BsListUl } from "react-icons/bs";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import JobsTable from "../components/JobsTable";
import JobCard from "../components/JobCard";
import { jobsData } from "../data/jobsData2";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [sortBy, setSortBy] = useState("creation");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="py-8 px-12 mx-auto">
      <div className="rounded-2xl">
        <div className="flex justify-between items-center space-x-6 mb-6 border-b border-gray-300 pb-4">
          <div className="flex items-center space-x-6">
            {["active", "inactive"].map((tab) => (
              <button
                key={tab}
                className={`relative pb-2 px-3 text-lg font-medium transition-colors ${
                  activeTab === tab
                    ? "text-gray-700 border-b-2 border-amber-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Jobs
              </button>
            ))}
          </div>

          <button className="bg-primary hover:bg-primary-light text-white text-sm px-6 py-2 rounded-lg flex items-center space-x-2 transition">
            <TbPlus className="w-6 h-6" />
            <span className="font-medium">Post New Job</span>
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold font-nunito text-gray-700 w-1/3">
            {jobsData.length} Active Jobs
          </div>
          <div className="flex items-center space-x-2 w-2/3 justify-end">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search job..."
                className="w-full pl-10 pr-1 py-2 font-semibold text-gray-600 rounded-xl border focus:outline-none focus:border-gray-400"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            </div>
            <div className="flex items-center w-full justify-end pr-4 space-x-2">
              <div className="flex items-center pr-6">
                <p className="font-bold font-nunito px-2 text-gray-500 text-sm">
                  Filter by:{" "}
                </p>
                <div className="flex space-x-4 items-center">
                  <select
                    className="bg-gray-100 font-bold font-nunito rounded-lg px-2 py-2 text-sm focus:outline-none "
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="creation">Creation Date</option>
                    <option value="candidates">All Candidates</option>
                    <option value="deadline">Deadline</option>
                  </select>
                  <select
                    className="bg-gray-100 font-bold font-nunito rounded-lg px-6 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex bg-white border border-gray-200 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "text-gray-500"
                  }`}
                >
                  <TbLayoutGrid size={24} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  <TbListDetails size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Replace the grid div with this */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobsData.map((job) => (
              <JobCard key={job.id} job={job} sortBy={sortBy} />
            ))}
          </div>
        ) : (
          <JobsTable jobs={jobsData} />
        )}
      </div>
    </div>
  );
};

export default Jobs;
