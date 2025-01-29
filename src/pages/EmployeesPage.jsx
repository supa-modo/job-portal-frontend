import { useState } from "react";
import {
  PlusIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

const EmployeesPage = () => {
  const [employees] = useState([
    {
      id: 1,
      name: "Ronald Richards",
      position: "Project Manager",
      email: "Ronald.Richards@gmail.com",
      phone: "+1-202-555-0129",
      team: "Design Team",
      startDate: "01 March, 2021",
      status: "Active",
    },
    // Add more employee data as needed
  ]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">32 Employees</h1>
          <p className="text-gray-500">Managing all employees in one place</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New
          </button>
        </div>
      </div>

      <div className="bg-gray-light rounded-lg shadow">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <button className="px-3 py-1.5 border rounded-lg flex items-center">
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filter
            </button>
            <div className="flex items-center space-x-2">
              <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
              <PrinterIcon className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-500">
                        {employee.position}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">{employee.email}</div>
                  <div className="text-sm text-gray-500">{employee.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {employee.team}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {employee.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      employee.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button>
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPage;
