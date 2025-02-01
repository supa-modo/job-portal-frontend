import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { InitialsAvatar } from "../utils/Initials";
import Table from "./Table";

const JobsTable = ({ jobs }) => {
  const columns = [
    {
      key: "title",
      label: "Job Title",
      render: (item) => (
        <div>
          <div className="font-bold font-nunito tracking-tight text-[0.94rem] text-gray-600">
            {item.title}
          </div>
          <div className="text-sm font-sans text-gray-500">
            {item.department}
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "JOb Type",
    },
    {
      key: "location",
      label: "Location",
    },
    {
      key: "datePosted",
      label: "Date Posted",
      render: (item) => (<span>Jan 01, 2025</span>)
    },
    {
      key: "deadline",
      label: "Deadline",
      render: (item) => (<span>Jan 01, 2025</span>)
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          className={`px-3.5 py-1 rounded-lg text-xs font-medium ${
            item.status === "Published"
              ? "bg-green-200 text-green-800"
              : item.status === "Draft"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "totalCandidates",
      label: "Applicants",
    },
  ];

  return (
    <Table
      columns={columns}
      data={jobs}
      // onRowClick={onViewCandidate}
      // additionalActions={{
      //   view: (jobs) => onViewCandidate(candidate),
      // }}
    />
  );
};

export default JobsTable;
