import React, { useState, useEffect } from "react";
import {
  TbBriefcase,
  TbLocation,
  TbClock,
  TbSearch,
  TbFilter,
  TbAdjustments,
  TbChevronDown,
  TbBookmark,
  TbShare,
  TbListDetails,
  TbLayoutGrid,
  TbArrowsSort,
} from "react-icons/tb";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { jobData } from "../data/jobData";
import { FaAngleRight } from "react-icons/fa6";
import careers2 from "/careers2.jpg";
import { PiSortAscending } from "react-icons/pi";

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    departments: [],
    locations: [],
    types: [],
    experience: [],
  });
  const [activeView, setActiveView] = useState("list");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilters, setShowFilters] = useState(true);

  // Simulated filters data
  const filterOptions = {
    departments: [
      "Engineering",
      "Product",
      "Design",
      "Marketing",
      "Sales",
      "Operations",
    ],
    locations: ["Remote", "On-Site", "Hybrid", "Nairobi", "Kisumu"],
    types: ["Full-time", "Part-time", "Contract", "Internship"],
    experience: ["Entry Level", "Mid Level", "Senior", "Lead", "Manager"],
  };

  const filteredJobs = (jobData || []).filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedFilters.departments.length === 0 ||
      selectedFilters.departments.includes(job.department);
    const matchesLocation =
      selectedFilters.locations.length === 0 ||
      selectedFilters.locations.includes(job.location);
    const matchesType =
      selectedFilters.types.length === 0 ||
      selectedFilters.types.includes(job.type);
    const matchesExperience =
      selectedFilters.experience.length === 0 ||
      selectedFilters.experience.includes(job.experience);

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesLocation &&
      matchesType &&
      matchesExperience
    );
  });

  const FilterTag = ({ label, onRemove }) => (
    <div className="inline-flex items-center bg-primary-light/20 text-primary-dark px-3 py-1.5 rounded-lg text-sm">
      {label}
      <button onClick={onRemove} className="ml-2 hover:text-red-500">
        ×
      </button>
    </div>
  );

  const FilterSection = ({ title, options, selected, onChange }) => (
    <div className="mb-6">
      <h3 className="text-sm font-bold font-nunito text-primary mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => {
                const newSelected = selected.includes(option)
                  ? selected.filter((item) => item !== option)
                  : [...selected, option];
                onChange(newSelected);
              }}
              className="w-4 h-4 text-primary-light border-gray-300 rounded focus:ring-primary-light"
            />
            <span className="ml-2 text-sm text-gray-600">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

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
          <div className="w-full lg:w-4/5 pt-10 pb-4">
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
      <div className="max-w-7xl mx-auto -mt-36 relative z-10">
        <div className="flex gap-4">
          {/* Search Input */}
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

          {/* Search Button */}
          <button className="bg-primary-light w-1/4 hover:bg-primary text-white rounded-xl py-3 px-6 font-semibold transition-colors duration-200 flex items-center justify-center space-x-3">
            <TbSearch className="w-5 h-5" />
            <span>Search Jobs</span>
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white max-w-screen-2xl z-10 relative mx-auto rounded-xl shadow-sm px-6 py-4 mb-6 mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className=" text-primary-light font-extrabold font-nunito text-xl tracking-tight ">
              Open opportunities
            </h1>
            <div className="text- text-gray-600 font-semibold">
              ({filteredJobs.length} positions)
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 text-gray-600 font-bold font-nunito">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-6 py-2 border border-gray-200 rounded-lg text-sm  hover:bg-gray-50"
              >
                <TbFilter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>

            <div className="flex items-center gap-2">
              <TbArrowsSort />
              <select className="border rounded-lg px-3 py-2 text-sm font-bold font-nunito text-gray-600 bg-white">
                <option>Newest First</option>
                <option>Relevant</option>
                <option>A-Z</option>
              </select>
            </div>

            <div className="flex bg-white border border-gray-200 rounded-xl">
              <button
                onClick={() => setActiveView("list")}
                className={`p-2 rounded-lg ${
                  activeView === "list"
                    ? "bg-primary text-white shadow-sm px-2.5"
                    : "text-gray-500"
                }`}
              >
                <TbListDetails size={24} />
              </button>
              <button
                onClick={() => setActiveView("grid")}
                className={`p-2  rounded-lg ${
                  activeView === "grid"
                    ? "bg-primary text-white px-3"
                    : "text-gray-500"
                }`}
              >
                <TbLayoutGrid size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {Object.entries(selectedFilters).some(
          ([_, value]) => value.length > 0
        ) && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap gap-3">
              {Object.entries(selectedFilters).map(([key, values]) =>
                values.map((value) => (
                  <FilterTag
                    key={`${key}-${value}`}
                    label={value}
                    onRemove={() => {
                      setSelectedFilters({
                        ...selectedFilters,
                        [key]: selectedFilters[key].filter((v) => v !== value),
                      });
                    }}
                  />
                ))
              )}
              {Object.values(selectedFilters).some((arr) => arr.length > 0) && (
                <button
                  onClick={() =>
                    setSelectedFilters({
                      departments: [],
                      locations: [],
                      types: [],
                      experience: [],
                    })
                  }
                  className="text-sm text-red-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Job Listings Section */}
      <div className="max-w-screen-2xl mx-auto pt-6 pb-16">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div
            className={`w-64 flex-shrink-0 transition-all duration-300 ${
              showFilters
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 hidden"
            }`}
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-amber-800">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 font-bold hover:text-gray-500"
                >
                  ×
                </button>
              </div>

              <FilterSection
                title="Department"
                options={filterOptions.departments}
                selected={selectedFilters.departments}
                onChange={(newValue) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    departments: newValue,
                  })
                }
              />

              <FilterSection
                title="Location"
                options={filterOptions.locations}
                selected={selectedFilters.locations}
                onChange={(newValue) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    locations: newValue,
                  })
                }
              />

              <FilterSection
                title="Job Type"
                options={filterOptions.types}
                selected={selectedFilters.types}
                onChange={(newValue) =>
                  setSelectedFilters({ ...selectedFilters, types: newValue })
                }
              />

              <FilterSection
                title="Experience Level"
                options={filterOptions.experience}
                selected={selectedFilters.experience}
                onChange={(newValue) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    experience: newValue,
                  })
                }
              />
            </div>
          </div>

          {/* Job Cards */}
          <div className="flex-1">
            <div
              className={`grid gap-4 ${
                activeView === "grid"
                  ? "grid-cols-1 lg:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 ${
                      selectedJob === job.id ? "ring-2 ring-primary-light" : ""
                    }`}
                    onClick={() =>
                      setSelectedJob(job.id === selectedJob ? null : job.id)
                    }
                  >
                    <div className="px-6 pt-6 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-4 items-center">
                          <h3 className="text-lg font-semibold text-primary group-hover:text-primary-light transition-colors">
                            {job.title}
                          </h3>
                          <div className="">
                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-xl bg-primary-extralight/30 border text-primary-dark">
                              {job.department}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-primary-light rounded-full hover:bg-gray-100">
                            <TbBookmark className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-primary-light rounded-full hover:bg-gray-100">
                            <TbShare className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <TbLocation className="w-4 h-4 mr-1.5" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <TbBriefcase className="w-4 h-4 mr-1.5" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <TbClock className="w-4 h-4 mr-1.5" />
                          {job.experience}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font- bg-primary-dark/20 text-gray-800"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font- bg-gray-100 text-gray-800">
                            +{job.skills.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-gray-500 flex items-center space-x-10">
                          <span>
                            Posted on {job.postedDate || "2 days ago"}
                          </span>
                          <span className="text-amber-700 font-semibold font-nunito">
                            Application Deadline: {job.deadline || "2 days ago"}
                          </span>
                        </div>
                        <a
                          href={job.applyLink}
                          className="inline-flex items-center px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-sidebar transition-colors duration-200 text-sm font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Apply Now
                          <FaAngleRight className="ml-2 w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <div
                      className={`transition-all duration-300 overflow-hidden overflow-y-auto ${
                        selectedJob === job.id ? "max-h-96 p-6" : "max-h-0"
                      }`}
                    >
                      <div className="space-y-4 border-t pt-4">
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-2">
                            About the role
                          </h4>
                          <p className="text-sm text-gray-600">
                            {job.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-amber-800 mb-2">
                            Requirements
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>5+ years of experience in similar role</li>
                            <li>
                              Strong communication and collaboration skills
                            </li>
                            <li>Bachelor's degree in related field</li>
                            <li>Experience with modern development tools</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-amber-800 mb-2">
                            Benefits
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Competitive salary and equity package</li>
                            <li>
                              Comprehensive health, dental, and vision coverage
                            </li>
                            <li>Flexible PTO and work arrangements</li>
                            <li>401(k) matching and financial planning</li>
                            <li>Professional development budget</li>
                            <li>Wellness programs and gym memberships</li>
                          </ul>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <a
                            href={job.applyLink}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 text-sm font-semibold"
                          >
                            Apply for this position
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add save functionality
                            }}
                            className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <div className="text-center bg-white rounded-xl p-12 border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TbSearch className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      No matching positions found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search criteria or browse all open
                      positions
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedFilters({
                          departments: [],
                          locations: [],
                          types: [],
                          experience: [],
                        });
                      }}
                      className="inline-flex items-center px-6 py-2.5 bg-gray-200 text-red-400 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-nunito font-bold"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="mt-8 flex items-center justify-between bg-white px-4 py-3 rounded-lg border">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-bold text-primary">1</span>{" "}
                      to <span className="font-bold text-primary">10</span> of{" "}
                      <span className="font-bold text-primary">
                        {filteredJobs.length}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Previous</span>
                        <TbChevronDown className="h-5 w-5 rotate-90" />
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary-light focus:z-20 focus:outline-offset-0">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        3
                      </button>
                      <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Next</span>
                        <TbChevronDown className="h-5 w-5 -rotate-90" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
