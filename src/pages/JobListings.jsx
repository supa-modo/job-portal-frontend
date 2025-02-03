import React, { useState } from "react";
import { TbPlus, TbBriefcase, TbLocation, TbClock } from "react-icons/tb";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { jobsData } from "../data/jobData3";

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    experience: "",
  });

  const filteredJobs = (jobsData || []).filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.location ? job.location === filters.location : true) &&
      (filters.type ? job.type === filters.type : true) &&
      (filters.experience ? job.experience === filters.experience : true)
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 mb-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-lg mb-6">
            Join our team and grow your career with exciting opportunities
          </p>

          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search jobs by title, skills, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <TbLocation className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
            </select>
          </div>

          <div className="relative">
            <TbBriefcase className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="relative">
            <TbClock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              value={filters.experience}
              onChange={(e) =>
                setFilters({ ...filters, experience: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Experience Levels</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior Level</option>
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-amber-700 mb-2">
                      {job.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <span className="flex items-center">
                        <TbBriefcase className="w-4 h-4 mr-2" />
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <TbLocation className="w-4 h-4 mr-2" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <TbClock className="w-4 h-4 mr-2" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <a
                    href={job.applyLink}
                    className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span>Apply Now</span>
                    <TbPlus className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-gray-600 mt-4">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 py-8">
              No jobs found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings;
