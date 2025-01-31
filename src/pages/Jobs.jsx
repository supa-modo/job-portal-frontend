import { useState } from "react";
import {
  TbBriefcase,
  TbUsers,
  TbPlus,
  TbLocation,
  TbArrowRight,
} from "react-icons/tb";
import { motion } from "framer-motion";
import { FaBriefcase, FaChevronRight, FaLocationPin } from "react-icons/fa6";
import { MdArrowRight, MdLocationPin } from "react-icons/md";
import { FaDotCircle } from "react-icons/fa";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [sortBy, setSortBy] = useState("creation");
  const [statusFilter, setStatusFilter] = useState("all");

  const jobsData = [
    {
      id: 1,
      title: "Senior Product Designer",
      department: "Communications",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quaerat autem possimus nobis, provident accusamus neque veniam dolorum vel harum? Delectus sint, ipsam veniam deleniti labore eveniet explicabo incidunt reiciendis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ea consectetur perspiciatis velit voluptas quasi dolores facilis! Reprehenderit distinctio vitae odit in veritatis, quibusdam aperiam possimus, perspiciatis asperiores at quod?",
      location: "Nairobi, Kenya",
      type: "Contract",
      status: "Draft",
      totalCandidates: 57,
      percentage: 35,
    },
    {
      id: 2,
      title: "Principal Human Resource Officer",
      department: "Human Resource",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quaerat autem possimus nobis, provident accusamus neque veniam dolorum vel harum? Delectus sint, ipsam veniam deleniti labore eveniet explicabo incidunt reiciendis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ea consectetur perspiciatis velit voluptas quasi dolores facilis! Reprehenderit distinctio vitae odit in veritatis, quibusdam aperiam possimus, perspiciatis asperiores at quod?",
      location: "Arusha, Tanzania",
      type: "Temporary",
      status: "Published",
      totalCandidates: 13,
      percentage: 95,
    },
    {
      id: 3,
      title: "IT Hardware Specialist",
      department: "ICT",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quaerat autem possimus nobis, provident accusamus neque veniam dolorum vel harum? Delectus sint, ipsam veniam deleniti labore eveniet explicabo incidunt reiciendis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ea consectetur perspiciatis velit voluptas quasi dolores facilis! Reprehenderit distinctio vitae odit in veritatis, quibusdam aperiam possimus, perspiciatis asperiores at quod?",
      location: "Arusha, Tanzania",
      type: "Temporary",
      status: "Published",
      totalCandidates: 59,
      percentage: 75,
    },
    {
      id: 4,
      title: "International Relations Officer",
      department: "Public Relations",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quaerat autem possimus nobis, provident accusamus neque veniam dolorum vel harum? Delectus sint, ipsam veniam deleniti labore eveniet explicabo incidunt reiciendis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ea consectetur perspiciatis velit voluptas quasi dolores facilis! Reprehenderit distinctio vitae odit in veritatis, quibusdam aperiam possimus, perspiciatis asperiores at quod?",
      location: "Arusha, Tanzania",
      type: "Temporary",
      status: "Published",
      totalCandidates: 56,
      percentage: 25,
    },
    {
      id: 5,
      title: "Senior Accountant",
      department: "Finance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quaerat autem possimus nobis, provident accusamus neque veniam dolorum vel harum? Delectus sint, ipsam veniam deleniti labore eveniet explicabo incidunt reiciendis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ea consectetur perspiciatis velit voluptas quasi dolores facilis! Reprehenderit distinctio vitae odit in veritatis, quibusdam aperiam possimus, perspiciatis asperiores at quod?",
      location: "Arusha, Tanzania",
      type: "Temporary",
      status: "Published",
      totalCandidates: 14,
      percentage: 60,
    },
    {
      id: 6,
      title: "Senior Administration Officer",
      department: "Administration",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quaerat autem possimus nobis, provident accusamus neque veniam dolorum vel harum? Delectus sint, ipsam veniam deleniti labore eveniet explicabo incidunt reiciendis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ea consectetur perspiciatis velit voluptas quasi dolores facilis! Reprehenderit distinctio vitae odit in veritatis, quibusdam aperiam possimus, perspiciatis asperiores at quod?",
      location: "Arusha, Tanzania",
      type: "Temporary",
      status: "Published",
      totalCandidates: 25,
      percentage: 75,
    },
    {
      id: 7,
      title: "Public Relations Officer",
      department: "Administration",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quaerat autem possimus nobis, provident accusamus neque veniam dolorum vel harum? Delectus sint, ipsam veniam deleniti labore eveniet explicabo incidunt reiciendis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ea consectetur perspiciatis velit voluptas quasi dolores facilis! Reprehenderit distinctio vitae odit in veritatis, quibusdam aperiam possimus, perspiciatis asperiores at quod?",
      location: "Arusha, Tanzania",
      type: "Temporary",
      status: "Published",
      totalCandidates: 108,
      percentage: 45,
    },
  ];

  const JobCard = ({ job }) => (
    <motion.div
      //   whileHover={{ scale: 1.005 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-2 border-t-green-500 border border-gray-200"
    >
      <div className=" mb-3">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[0.78rem] uppercase text-gray-500 font-bold font-nunito">
              {job.department}
            </span>
            <select
              className="bg-gray-200  font-bold font-geist rounded-xl px-4 py-1 text-green-700 text-xs focus:outline-none "
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="creation">Open</option>
              <option value="candidates">Closed</option>
            </select>
          </div>

          <h3 className="text-[1.3rem] font-extrabold font-nunito text-amber-700">
            {job.title}
          </h3>
        </div>
      </div>

      <div className="text-gray-700 text-sm mb-4 line-clamp-3">
        {job.description}
      </div>

      <div className="flex items-center space-x-4 text-sm font-bold font-nunito text-gray-500 mb-4">
        <div className="flex items-center space-x-2">
          <MdLocationPin className="text-primary/70" />
          <span>{job.location}</span>
        </div>

        <span className="text-gray-500">•</span>
        <div className="flex items-center space-x-2">
          {/* <FaBriefcase className="text-primary/70" /> */}
          <span>{job.type}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between">
          <div className="flex">
            <p className="text-sm pb-2 pr-2 text-gray-500 ">
              Posted at:{" "}
              <span className="font-bold font-nunito">{`Jan 04`}</span>
            </p>
            <p className="text-sm pb-2 pr-2 text-gray-500 ">
              Closes: <span className="font-bold font-nunito">{`Feb 04`}</span>
            </p>
          </div>
          <span className="text-sm font-extrabold font-nunito text-primary-light">
            10 days left
          </span>
        </div>

        <div className="w-full bg-gray-300 rounded-full h-1 overflow-hidden">
          <div
            className="bg-primary-extralight h-1 rounded-full transition-all duration-600"
            style={{ width: `${job.percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t pt-3">
        <div className="flex items-center space-x-6">
          <div className="flex space-x-5">
            <div className="text-sm py-1 pr-3 text-gray-400 border-r-2">
              Total Applications
            </div>
            <div className="text-xl font-bold font-nunito text-button">
              {job.totalCandidates}
            </div>
          </div>
        </div>
        <button className="text-gray-500 flex items-center space-x-2 hover:text-blue-600 text-sm font-bold font-nunito underline underline-offset-4 transition">
          <Link to={`/jobs/1`}>View Details</Link>
          <FaChevronRight />
        </button>
      </div>
    </motion.div>
  );

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

          <button className="bg-button hover:bg-primary text-white text-sm px-6 py-2 rounded-lg flex items-center space-x-2 transition">
            <TbPlus className="w-6 h-6" />
            <span className="font-medium">Post New Job</span>
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold font-nunito text-gray-700 w-1/3">
            {jobsData.length} Active Jobs
          </div>
          <div className="flex items-center space-x-4 w-2/3 justify-end">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search job..."
                className="w-full pl-10 pr-4 py-2 font-semibold text-gray-600 rounded-xl border focus:outline-none focus:border-gray-400"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            </div>
            <div className="flex items-center w-full">
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobsData.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
