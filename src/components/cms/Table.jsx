import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

const Table = ({ tableHeader, tableData, editPath, deletePath }) => {
  const navigate = useNavigate();
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(tableData.length).fill(false)
  );
  const [showDropdown, setShowDropdown] = useState(null);

  const handleActionClick = (index) => {
    setShowDropdown(showDropdown === index ? null : index);
  };

  const handleEdit = (id) => {
    startTransition(() => {
      navigate(editPath+`/${id}`);
    });
    setShowDropdown(null);
  };

  const handleDelete = (index) => {
    setShowDropdown(null);
  };

  const handleHeaderCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsHeaderChecked(isChecked);
    setCheckedState(new Array(tableData.length).fill(isChecked));
  };

  const handleRowCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const allChecked = updatedCheckedState.every(Boolean);
    setIsHeaderChecked(allChecked);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = tableData.length> 0 ? (Math.ceil(tableData.length / rowsPerPage)) : 1;

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full border-t uppercase text-xs">
            <th className="py-5 px-6 text-center font-semibold text-gray-700 align-middle">
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  id="tableHeaderCheckbox"
                  className="peer cursor-pointer hidden after:opacity-100"
                  checked={isHeaderChecked}
                  onChange={handleHeaderCheckboxChange}
                />
                <label
                  htmlFor="tableHeaderCheckbox"
                  className="inline-block w-4 h-4 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
                ></label>
              </div>
            </th>
            {tableHeader.map((header, index) => (
              <th
                className="py-5 px-6 text-center font-bold text-gray-700 align-middle"
                key={index}
              >
                {header.replace(/_/g, " ")}
              </th>
            ))}
            <th className="py-5 px-6 text-center font-bold text-gray-700 align-middle">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <tr className="border-t text-sm" key={index}>
                <td className="py-5 px-6 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      id={"tableContentCheckbox-" + (index)}
                      className="peer cursor-pointer hidden after:opacity-100"
                      checked={checkedState[index]}
                      onChange={() =>
                        handleRowCheckboxChange(index)
                      }
                    />
                    <label
                      htmlFor={
                        "tableContentCheckbox-" + index
                      }
                      className="inline-block w-4 h-4 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
                    ></label>
                  </div>
                </td>
                {tableHeader.map((header) => (
                  <td
                    className="py-5 text-center px-6 align-middle"
                    key={header}
                  >
                    {header.toLowerCase() === "status" ? (
                      <div
                        className={`py-1 w-24 rounded-full mx-auto ${
                          item.status === "active"
                            ? "text-green-400 bg-green-100 font-semibold"
                            : "text-red-400 bg-red-100 font-semibold"
                        }`}
                      >
                        <span>{item.status.toUpperCase()}</span>
                      </div>
                    ) : header.toLowerCase() === "sale" ? (
                      <div
                        className={`py-1 w-24 rounded-full mx-auto ${
                          item.sale === true
                            ? "text-red-400 bg-red-100 font-semibold"
                            : "text-gray-300 bg-gray-500 font-semibold"
                        }`}
                      >
                        <span>{item.sale === true ? "ON SALE" : "NO SALE"}</span>
                      </div>
                    ) : header.toLowerCase() === "new" ? (
                      <div
                        className={`py-1 w-24 rounded-full mx-auto ${
                          item.new === true
                            ? "text-black bg-gray-100 font-semibold"
                            : "text-gray-100 bg-black font-semibold"
                        }`}
                      >
                        <span>{item.new === true ? "NEW" : "-"}</span>
                      </div>
                    ) : header.toLowerCase() === "product_image" ? (
                      <div className="flex flex-col items-center justify-center">
                        {item.product_image ? (
                          <img
                            src={`/assets/products/${item.product_image}`}
                            alt="Product"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </div>
                    ) : header.toLowerCase() === "created_at" ? (
                      format(new Date(item.created_at), 'yyyy-MM-dd HH:mm:ss')
                    ) : (
                      item[header.toLowerCase()] 
                    )
                    }
                  </td>
                ))}
                <td className="py-3 px-6 text-center align-middle">
                  <button
                    onClick={() => handleActionClick(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </button>
                  {showDropdown === index && (
                    <div className="absolute right-32 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="">
                        {editPath && (
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="flex items-center px-4 py-2 text-sm w-full border text-gray-700 hover:bg-black hover:text-white"
                          >
                            Edit
                          </button>
                        )}
                        {deletePath && (
                          <button
                            onClick={() => handleDelete(index)}
                            className="flex items-center px-4 py-2 text-sm w-full border text-red-500 bg-red-200 hover:bg-red-500 hover:text-white"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableHeader.length + 2} // Header count + 2 (checkbox and action columns)
                className="text-center py-5 text-gray-500"
              >
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="flex justify-center py-4 pr-5">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 ${
            currentPage === 1 ? "text-gray-400" : "text-black"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const isPageInRange =
            pageNumber >= Math.max(1, currentPage - 2) &&
            pageNumber <= Math.min(totalPages, currentPage + 2);

          if (!isPageInRange) return null;

          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`text-sm font-semibold px-3 mx-1 rounded-md ${
                currentPage === pageNumber
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 ${
            currentPage === totalPages ? "text-gray-400" : "text-black"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Table;
