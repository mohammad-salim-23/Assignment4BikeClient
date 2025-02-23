import { useGetAllBikesQuery } from "../redux/features/bike/bikeManagement.api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDeleteBikeMutation, useUpdateBikeMutation } from "./adminManagement.api";

const AllProductsAdmin = () => {
  const { data } = useGetAllBikesQuery(undefined);
  const bikes = data?.data || [];
  const [updateBike] = useUpdateBikeMutation();
  const [deleteBike] = useDeleteBikeMutation();;
  return (
    <div className="px-4 py-6 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center my-4">
        <h2 className="text-3xl mb-4 md:mb-0">All Bikes</h2>
        <h2 className="text-3xl">Total Bikes: {bikes.length}</h2>
      </div>
      <div className="overflow-x-auto md:overflow-hidden">
        <table className="table w-full mb-8 border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Model</th>
              <th>Category</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike, index) => (
              <tr key={bike._id} className="hover:bg-gray-200 transition-all">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{bike.name}</td>
                <td className="py-2 px-4">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                  />
                </td>
                <td className="py-2 px-4">{bike.model}</td>
                <td className="py-2 px-4">{bike.category}</td>
                <td className="py-2 px-4">${bike.price}</td>
                <td className="py-2 px-4">
                  <button className="btn bg-secondaryColor hover:bg-secondaryColor-dark">
                    <FaEdit />
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button className="btn bg-red-500 text-white hover:bg-red-600">
                    <FaTrash />
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

export default AllProductsAdmin;
