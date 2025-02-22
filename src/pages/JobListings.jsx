import React, { useState } from "react";
import {
  TbPlus,
  TbBriefcase,
  TbLocation,
  TbClock,
  TbSearch,
} from "react-icons/tb";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { jobsData } from "../data/jobData3";
import { SiTicktick } from "react-icons/si";
import { FaAngleRight } from "react-icons/fa6";
import careers2 from "/careers2.jpg";

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
    <div className="min-h-screen bg-gray-100">
      {/* Enhanced Hero Section */}
      <div className="relative h-[750px] overflow-hidden bg-primary-dark">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={careers2}
            alt="Careers Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-light/80 to-primary/20" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full lg:w-4/5 pt-10 pb-10">
            <div className="flex items-center space-x-2 mb-8">
              <div className="h-1 w-12 bg-amber-600 rounded-full" />
              <span className="text-amber-600 font-bold font- text-lg">
                Join Our Team
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold font-geist tracking-tight text-white mb-2 leading-tight">
              <span className="">Make an Impact,</span>{" "}
            </h1>
            <h1 className="text-4xl lg:text-6xl font-extrabold font-geist tracking-tight  mb-6">
              <span className="text-amber-100">Grow Your Career with Us</span>
            </h1>

            <p className="text-xl text-gray-300 mb-6 max-w-3xl">
              Join a team of innovators, creators, and leaders. We're not just
              offering jobs - we're offering exciting opportunities to make a
              real impact while growing your career.
            </p>
            <p className="text-xl text-gray-300 mb-10 max-w-4xl">
              Browse our open roles below to view and apply for positions.
            </p>
          </div>
        </div>

        {/* Gradient Overlay Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-100 via-gray-100/80 to-transparent" />
      </div>

      {/* Search Section (Overlapping Hero) */}
      <div className="max-w-7xl mx-auto -mt-48 relative z-10 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex gap-4">
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> */}
            {/* Search Input */}
            {/* <div className="md:col-span-2 relative"> */}
            <div className="w-full relative">
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search jobs by title, skills, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-200 font-semibold focus:outline-none focus:border-2 focus:border-primary-light"
              />
            </div>

            {/* Location Filter
            <div className="relative">
              <TbLocation className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light appearance-none"
              >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
              </select>
            </div> */}

            {/* Search Button */}
            <button className="bg-primary-light w-1/4 hover:bg-primary text-white rounded-xl py-3 px-6 font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
              <TbSearch className="w-5 h-5" />
              <span>Search Jobs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="max-w-7xl mx-auto pt-6 pb-16">
        {/* Section Header */}
        <div className=" mb-8">
          <div className="text-gray-500">
            {filteredJobs.length} jobs available
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-button mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
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
                    className="bg-primary-light/20 text-primary-light px-6 py-2 rounded-lg hover:bg-primary-light/85 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span className="font-semibold">Apply Now</span>
                    <FaAngleRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-gray-600 mt-3">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 border text-gray-500 px-5 py-1.5 rounded-lg text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 py-12 bg-white rounded-xl border border-gray-100">
              <div className="text-xl font-semibold mb-2">No jobs found</div>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings;
