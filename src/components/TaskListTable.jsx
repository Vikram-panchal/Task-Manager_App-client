import React from "react";
import moment from "moment";
const TaskListTable = ({ tableData }) => {
  // console.log(tableData);
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-purple-100 text-purple-500 border border-purple-200";
      case "Completed":
        return "bg-green-100 text-green-500 border border-green-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-500 border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-500 border border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-500 border border-orange-200";
      case "Low":
        return "bg-green-100 text-green-500 border border-green-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-left w-fit">
            <th className="px-4 py-3 text-gray-800 font-lg text-[13px]">
              Name
            </th>
            <th className="px-4 py-3 text-gray-800 font-lg text-[13px]">
              Status
            </th>
            <th className="px-4 py-3 text-gray-800 font-lg text-[13px]">
              Priority
            </th>
            <th className="px-4 py-3 text-gray-800 font-lg text-[13px]">
              Created On
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-4 text-gray-500 text-sm"
              >
                No tasks found.
              </td>
            </tr>
          ) : (
            tableData.map((task) => (
              <tr className="border-t border-gray-200 " key={task._id}>
                <td className="px-4 py-3 text-gray-700 text-[13px] overflow-hidden">
                  {task.title}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 text-[13px] text-nowrap md:table-cell">
                  {" "}
                  {task.createdAt
                    ? moment(task.createdAt).format("MMM D, YYYY")
                    : "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
