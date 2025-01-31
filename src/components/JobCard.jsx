import React from "react";
import { motion } from "framer-motion";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

const JobCard = ({ job, sortBy }) => (
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
            Posted at: <span className="font-bold font-nunito">{`Jan 04`}</span>
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

export default JobCard;
