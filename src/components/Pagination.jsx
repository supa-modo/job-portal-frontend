import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-lg mx-1 ${
            currentPage === number
              ? "bg-primary-light text-white"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {number}
        </button>
      ));
    }

    const firstPages = pageNumbers.slice(0, 2);
    const lastPages = pageNumbers.slice(-2);

    return (
      <>
        {firstPages.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 rounded-md mx-1 ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {number}
          </button>
        ))}
        {currentPage > 3 && <span className="mx-2">...</span>}

        {currentPage > 2 && currentPage < totalPages - 1 && (
          <button
            onClick={() => onPageChange(currentPage)}
            className="px-3 py-1 rounded-md mx-1 bg-blue-500 text-white"
          >
            {currentPage}
          </button>
        )}

        {currentPage < totalPages - 2 && <span className="mx-2">...</span>}

        {lastPages.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 rounded-lg mx-1 ${
              currentPage === number
                ? "bg-primary-light text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {number}
          </button>
        ))}
      </>
    );
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t">
      <div className="flex items-center space-x-14">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            items
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border font-nunito font-bold text-primary rounded-md px-2 py-1 text-[0.8rem]"
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-primary hover:bg-gray-200 disabled:opacity-50"
        >
          <FaAngleLeft size={16} />
        </button>

        <div className="flex items-center text-sm">{renderPageNumbers()}</div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-primary hover:bg-gray-200 disabled:opacity-50"
        >
          <FaAngleRight size={16} />
        </button>
      </div>
    </div>
  );
};
