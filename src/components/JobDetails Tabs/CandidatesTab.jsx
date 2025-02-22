import { InitialsAvatar } from "../../utils/Initials";
import Table from "../Table";

const CandidatesTab = ({ candidates, onViewCandidate }) => {
  const columns = [
    {
      key: "applicant",
      label: "Applicant",
      render: (item) => <InitialsAvatar name={item.name} email={item.email} />,
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "appliedDate",
      label: "Application_Date",
      render: (item) => new Date(item.appliedDate).toLocaleDateString(),
    },
    {
      key: "nationality",
      label: "Nationality",
    },
    {
      key: "experience",
      label: "Experience",
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          className={`px-3.5 py-1 rounded-lg text-xs font-medium ${
            item.status === "Accepted"
              ? "bg-green-200 text-green-800"
              : item.status === "Shortlisted"
              ? "bg-blue-200 text-blue-800"
              : item.status === "Interview"
              ? "bg-blue-200 text-blue-800"
              : item.status === "Pending"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "notes",
      label: "Notes",
    },
  ];

  return (
    <Table
      columns={columns}
      data={candidates}
      onRowClick={onViewCandidate}
      additionalActions={{
        view: (candidate) => onViewCandidate(candidate),
      }}
    />
  );
};

export default CandidatesTab;
