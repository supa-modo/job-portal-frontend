import React, { useState } from "react";
import Table from "./Table";

const CandidatesTab = ({ candidates }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(candidates.length / itemsPerPage);

  const columns = [
    {
      key: "name",
      label: "Candidate",
      render: (item) => (
        <div className="flex items-center">
          <img src={item.avatar} alt="" className="w-8 h-8 rounded-full mr-3" />
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      ),
    },
    { key: "status", label: "Status" },
    { key: "stage", label: "Stage" },
    { key: "appliedDate", label: "Applied Date" },
    { key: "experience", label: "Experience" },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <button className="text-blue-600 hover:text-blue-800">
          View Details
        </button>
      ),
    },
  ];

  const paginatedData = candidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Table
      columns={columns}
      data={paginatedData}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
};


export default CandidatesTab;