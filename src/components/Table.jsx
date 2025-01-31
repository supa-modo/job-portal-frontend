import React, { useState } from "react";
import { Pagination } from "./Pagination";
import { Eye } from "lucide-react";

const Table = ({ columns, data, onRowClick, additionalActions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/40 border-b h-[4.3rem]">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">
                #
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3.5 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide"
                >
                  {column.label}
                </th>
              ))}
              <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-nunito text-[0.92rem]">
            {paginatedData.map((item, index) => (
              <tr
                key={item.id || index}
                onClick={() => onRowClick && onRowClick(item)}
                className="hover:bg-gray-200 cursor-pointer transition-colors duration-200"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-3 whitespace-nowrap">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                <td className="px-5  py-3 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        additionalActions?.view?.(item);
                      }}
                      className="text-primary hover:primary-light flex items-center space-x-2 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                      <span>View</span>
                    </button>
                    {additionalActions?.custom?.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(item);
                        }}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default Table;
