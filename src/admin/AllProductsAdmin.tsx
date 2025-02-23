/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useGetAllBikesQuery } from "../redux/features/bike/bikeManagement.api";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDeleteBikeMutation, useUpdateBikeMutation } from "./adminManagement.api";

const AllProductsAdmin = () => {
  const { data, refetch } = useGetAllBikesQuery(undefined);
  const bikes = data?.data || [];

  const [updatedBike] = useUpdateBikeMutation();
  const [deleteBike] = useDeleteBikeMutation();

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<{ _id: string; name: string; model: string; category: string; price: number; image: string } | null>(null);

 
interface Bike {
    _id: string;
    name: string;
    model: string;
    category: string;
    price: number;
    image: string;
}

const handleEdit = (bike: Bike) => {
    setSelectedBike(bike);
    setIsModalOpen(true);
};

  // Handle update
  const handleUpdate = async (e : any) => {
    e.preventDefault();
    if (!selectedBike) {
        Swal.fire("Error!", "No bike selected for update.", "error");
        return;
      }
    const formData = new FormData(e.target);
   
    const updateBike = {
        name:formData.get("name"),
        model : formData.get("model"),
        category : formData.get("category"),
        price : Number(formData.get("price")),
        image : formData.get("image")
    }


    try {
      await updatedBike({ id: selectedBike?._id, bikeInfo:updateBike }).unwrap();
      Swal.fire("Updated!", "Bike details updated successfully.", "success");
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      Swal.fire("Error!", "Failed to update bike.", "error");
    }
  };

  // Handle delete
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = async (id:any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBike(id).unwrap();
          Swal.fire("Deleted!", "Bike has been removed.", "success");
          refetch();
        } catch (error) {
          Swal.fire("Error!", "Failed to delete bike.", "error");
        }
      }
    });
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl text-center my-4">All Bikes ({bikes.length})</h2>
      <table className="table w-full border-collapse">
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
            <tr key={bike._id} className="hover:bg-gray-200">
              <td>{index + 1}</td>
              <td>{bike.name}</td>
              <td>
                <img src={bike.image} alt={bike.name} className="w-12 h-12 rounded-full object-cover" />
              </td>
              <td>{bike.model}</td>
              <td>{bike.category}</td>
              <td>${bike.price}</td>
              <td>
                <button className="btn bg-yellow-500 text-white" onClick={() => handleEdit(bike)}>
                  <FaEdit />
                </button>
              </td>
              <td>
                <button className="btn bg-red-500 text-white" onClick={() => handleDelete(bike._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {isModalOpen && selectedBike && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-full max-w-lg bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Update Bike</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-2">
          <label className="block font-semibold">Bike Name</label>
          <input type="text" name="name" defaultValue={selectedBike.name} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Model</label>
          <input type="text" name="model" defaultValue={selectedBike.model} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Category</label>
          <input type="text" name="category" defaultValue={selectedBike.category} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Price</label>
          <input type="number" name="price" defaultValue={selectedBike.price} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Image URL</label>
          <input type="text" name="image" defaultValue={selectedBike.image} className="w-full p-2 border rounded" required />
        </div>
        <div className="flex justify-between mt-4">
          <button type="button" className="btn bg-gray-500 text-white" onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button type="submit" className="btn bg-orange-500 text-white">Update</button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default AllProductsAdmin;
