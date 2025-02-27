/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { FaEdit, FaTrash } from "react-icons/fa";

import Swal from "sweetalert2";
import { useDeleteOrderMutation, useGetAllOrdersQuery, useUpdateOrderMutation } from "../order/orderManagement.api";

const ManageOrders = () => {
  const { data: ordersData, isLoading , refetch} = useGetAllOrdersQuery(undefined);
  console.log(ordersData);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{ _id: string; name: string; category: string; price: number; image: string } | null>(null);

  if (isLoading) return <p>Loading orders...</p>;

  const handleEdit = (order : any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const updatedOrder = {
      productName: formData.get("name"),
      productBrand: formData.get("brand"),
      productPrice: Number(formData.get("price")),
      productImage: formData.get("image"),
    };
  
    if (selectedOrder) {
      try {
       const response =  await updateOrder({ orderId: selectedOrder._id, updatedData: updatedOrder }).unwrap();
        console.log("something", response);
        Swal.fire({
          title: "Success!",
          text: "Order updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
  
        setIsModalOpen(false);
        refetch();
      } catch (error : any) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update order. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  
  const handleDelete = async (orderId : any) => {
    Swal.fire({
          title: "Are you sure?",
          text: "You want to delete this order!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await deleteOrder(orderId).unwrap();
              Swal.fire("Deleted!", "Order has been removed.", "success");
              refetch();
            } catch (error) {
                console.log(error);
              Swal.fire("Error!", "Failed to delete bike.", "error");
            }
          }
        });
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl text-center my-4">All Orders ({ordersData?.data?.length})</h2>
      <table className="table w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ordersData?.data?.map((order, index) => (
            <tr key={order.id} className="hover:bg-gray-200">
              <td>{index + 1}</td>
              <td>{order.productName}</td>
              <td><img src={order.productImage} alt={order.productName} className="w-12 h-12 rounded-full object-cover" /></td>
              
              <td>${order.totalPrice}</td>
              <td>
                <button className="btn bg-yellow-500 text-white" onClick={() => handleEdit(order)}>
                  <FaEdit />
                </button>
              </td>
              <td>
                <button className="btn bg-red-500 text-white" onClick={() => handleDelete(order._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Update Order</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-2">
                <label className="block font-semibold">Order Name</label>
                <input type="text" name="name" defaultValue={selectedOrder.productName} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-2">
                <label className="block font-semibold">Brand</label>
                <input type="text" name="brand" defaultValue={selectedOrder.productBrand} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-2">
                <label className="block font-semibold">Price</label>
                <input type="number" name="price" defaultValue={selectedOrder.productPrice} className="w-full p-2 border rounded" required />
1              </div>
              <div className="mb-2">
                <label className="block font-semibold">Image URL</label>
                <input type="text" name="image" defaultValue={selectedOrder.productImage} className="w-full p-2 border rounded" required />
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

export default ManageOrders;
