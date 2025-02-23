import { useState } from "react";
import { useGetAllUserQuery, useUpdateUserMutation } from "./adminManagement.api";
import { FaToggleOn, FaToggleOff, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const TotalUsers = () => {
  const { data, refetch } = useGetAllUserQuery(undefined);
  const users = data?.data || [];

  const [updateUserStatus] = useUpdateUserMutation();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Total pages calculation
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Get current users to display
  const getCurrentUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleToggleStatus = async (user) => {
    try {
      const updatedStatus = !user.isBlocked; // Toggle status
      await updateUserStatus({ id: user._id, status: updatedStatus }).unwrap();
      refetch(); 

      Swal.fire({
        icon: "success",
        title: `User ${updatedStatus ? "Blocked" : "Activated"}!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-4 px-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentUsers().map((user , index) => (
              <tr key={user._id} className="border-b hover:bg-gray-100 transition">
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button className="btn bg-orange-500 text-white">
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleToggleStatus(user)}
                    className={`btn ${user.isBlocked ? "bg-red-500" : "bg-green-500"} text-white`}
                  >
                    {user.isBlocked ? <FaToggleOff /> : <FaToggleOn />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn btn-outline mx-1"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn mx-1 ${currentPage === index + 1 ? "btn-active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="btn btn-outline mx-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TotalUsers;
