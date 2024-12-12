import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../constant/constants";

const Table = ({ tableHeader, tableData, detailPath, editPath, deletePath, editPhotoPath, onRefresh }) => {
  const navigate = useNavigate();
  const authCMSToken = localStorage.getItem('authCMSToken');
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

  const handleEditPhoto = (id) => {
    startTransition(() => {
      navigate(editPhotoPath+`/${id}`);
    });
    setShowDropdown(null);
  };

  const handleViewDetail = (id) => {
    startTransition(() => {
      navigate(detailPath+`/${id}`);
    });
    setShowDropdown(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        apiUrl + deletePath + `/${id}`,
        {
          headers: {
              Authorization: `Bearer ${authCMSToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Data Deleted Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            onRefresh();
          },
        });
      }
      setShowDropdown(null);
    } catch (error) {
      toast.error("Error Deleting Data", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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

  const getDeleteId = (item) => {
    return deletePath === 'user' ? item.user_id : item.id;
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
            {(detailPath || editPath || deletePath || editPhotoPath) && (
              <th className="py-5 px-6 text-center font-bold text-gray-700 align-middle">
                Action
              </th>
            )}
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
                        className={`py-1 w-24 rounded-full mx-auto font-semibold ${
                          item.status === "active"
                            ? "text-green-400 bg-green-100"
                            : item.status === "inactive"
                            ? "text-red-400 bg-red-100"
                            : item.status === "pending"
                            ? "text-gray-400 bg-gray-100"
                            : item.status === "in progress"
                            ? "text-yellow-400 bg-yellow-100"
                            : item.status === "completed"
                            ? "text-green-400 bg-green-100"
                            : "text-red-400 bg-red-100"
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
                            src={`${item.product_image}`}
                            alt="Product"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </div>
                    ) : header.toLowerCase() === "created_at" ? (
                      format(new Date(item.created_at), 'yyyy-MM-dd HH:mm:ss')
                    ) : (header.toLowerCase() === "total_price" || header.toLowerCase() === "amount") ? (
                      <span>$ {item[header.toLowerCase()]}</span>
                    ) : (
                      item[header.toLowerCase()]
                    )
                    }
                  </td>
                ))}
                {(detailPath || editPath || deletePath || editPhotoPath) && (
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
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                              Edit
                            </button>
                          )}
                          {editPhotoPath && (
                            <button
                              onClick={() => handleEditPhoto(item.id)}
                              className="flex items-center px-4 py-2 text-sm w-full border text-gray-700 hover:bg-black hover:text-white"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                              </svg>
                              Edit Photo
                            </button>
                          )}
                          {detailPath && (
                            <button
                              onClick={() => handleViewDetail(item.id)}
                              className="flex items-center px-4 py-2 text-sm w-full border text-gray-700 hover:bg-black hover:text-white"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                              View
                            </button>
                          )}
                          {deletePath && (
                            <button
                              onClick={() => handleDelete(getDeleteId(item))}
                              className="flex items-center px-4 py-2 text-sm w-full border text-red-500 bg-red-200 hover:bg-red-500 hover:text-white"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                )}
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
