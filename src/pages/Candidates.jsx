import React, { useState } from "react";
import {
  TbFilter,
  TbSearch,
  TbArrowsSort,
  TbListDetails,
  TbLayoutGrid,
  TbUserCheck,
  TbCalendarEvent,
  TbMail,
  TbCheck,
  TbX,
  TbChevronDown,
  TbLocation,
  TbBriefcase,
  TbStar,
  TbStarFilled,
} from "react-icons/tb";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import candidates from "../data/Candidates.json";
import { jobData } from "../data/jobData";
import { InitialsAvatar } from "../utils/Initials";
import Calendar from "../components/JobDetails Tabs/CalendarEventModal";

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    experience: [],
    skills: [],
    status: [],
    nationality: [],
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [sortBy, setSortBy] = useState("recent");

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesJob =
      selectedJob === "all" ||
      jobData.some((job) => job.candidates?.some((c) => c.id === candidate.id));
    const matchesFilters =
      (filters.experience.length === 0 ||
        filters.experience.includes(candidate.experience)) &&
      (filters.skills.length === 0 ||
        candidate.notes
          .toLowerCase()
          .includes(filters.skills.join(" ").toLowerCase())) &&
      (filters.status.length === 0 ||
        filters.status.includes(candidate.status)) &&
      (filters.nationality.length === 0 ||
        filters.nationality.includes(candidate.nationality));
    return matchesSearch && matchesJob && matchesFilters;
  });

  const handleShortlist = (candidateId) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const startShortlisting = () => {
    // Implement shortlisting logic
    console.log("Shortlisting candidates:", selectedCandidates);
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case "email":
        console.log("Sending email to:", selectedCandidates);
        break;
      case "status":
        // Implement status change logic
        break;
      case "schedule":
        // Open calendar modal
        setShowCalendar(true);
        break;
      default:
        break;
    }
  };

  const filterOptions = {
    experience: ["Entry Level", "Mid Level", "Senior"],
    skills: ["React", "Node.js", "Python", "Java", "AWS"],
    status: ["Pending", "Shortlisted", "Interview", "Rejected", "Accepted"],
    nationality: ["Kenya", "Uganda", "Tanzania", "Rwanda"],
  };



  const StatusBadge = ({ status }) => {
    const statusStyles = {
      Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      Shortlisted: "bg-blue-50 text-blue-700 border-blue-200",
      Interview: "bg-purple-50 text-purple-700 border-purple-200",
      Rejected: "bg-red-50 text-red-700 border-red-200",
      Accepted: "bg-green-50 text-green-700 border-green-200",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  const CandidateCard = ({ candidate }) => (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
            <div className="relative">
              <InitialsAvatar name={candidate.name} email={candidate.email} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            
            
          </div>
          <button
            onClick={() => handleShortlist(candidate.id)}
            className={`p-2 rounded-full transition-all ${
              selectedCandidates.includes(candidate.id)
                ? "bg-primary text-white"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            {selectedCandidates.includes(candidate.id) ? (
              <TbStarFilled size={20} />
            ) : (
              <TbStar size={20} />
            )}
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TbBriefcase className="w-4 h-4 text-gray-400" />
            <span>{candidate.experience}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TbLocation className="w-4 h-4 text-gray-400" />
            <span>{candidate.nationality}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <StatusBadge status={candidate.status} />
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-primary transition-colors">
              <TbMail size={20} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-primary transition-colors">
              <TbCalendarEvent size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {candidate.skills?.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-600 border border-gray-200"
            >
              {skill}
            </span>
          ))}
          {candidate.skills?.length > 3 && (
            <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-500 border border-gray-200">
              +{candidate.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Candidate Management
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                {filteredCandidates.length} candidates for open positions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <TbFilter className="w-5 h-5 mr-2" />
                Filters
                <span className="ml-2 bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {Object.values(filters).flat().length}
                </span>
              </button>

              <div className="relative">
                <button
                  disabled={selectedCandidates.length === 0}
                  className="flex items-center px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Actions
                  <TbChevronDown className="w-5 h-5 ml-2" />
                </button>

                {selectedCandidates.length > 0 && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-10">
                    <button
                      onClick={() => handleBulkAction("email")}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center text-gray-700"
                    >
                      <TbMail className="w-5 h-5 mr-3 text-gray-400" />
                      Send Email
                    </button>
                    <button
                      onClick={() => handleBulkAction("status")}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center text-gray-700"
                    >
                      <TbUserCheck className="w-5 h-5 mr-3 text-gray-400" />
                      Change Status
                    </button>
                    <button
                      onClick={() => handleBulkAction("schedule")}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center text-gray-700"
                    >
                      <TbCalendarEvent className="w-5 h-5 mr-3 text-gray-400" />
                      Schedule Interview
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates by name, skills, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-gray-700"
            >
              <option value="all">All Jobs</option>
              {jobData.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-gray-700"
            >
              <option value="recent">Most Recent</option>
              <option value="experience">Experience</option>
              <option value="name">Name</option>
            </select>

            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-primary"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <TbLayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-primary"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <TbListDetails size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setFilters({
                  experience: [],
                  skills: [],
                  status: [],
                  nationality: [],
                })}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(filterOptions).map(([key, options]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {key}
                  </label>
                  <select
                    multiple
                    value={filters[key]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        [key]: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Candidates Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <TbSearch className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No candidates found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Calendar Modal */}
      <Calendar
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onSchedule={(event) => {
          console.log("Scheduled event:", event);
          setShowCalendar(false);
        }}
      />
    </div>
  );
};

export default Candidates;