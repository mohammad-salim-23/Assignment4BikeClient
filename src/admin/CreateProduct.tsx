import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useCreateBikeMutation } from "./adminManagement.api";


const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm<ProductFormData>();
  const navigate = useNavigate();
  const [createProduct] = useCreateBikeMutation(); 
interface ProductFormData {
    name: string;
    brand: string;
    model: string;
    category: string;
    price: string;
    stock: string;
    availability: string;
    engineCapacity: string;
    color: string;
    image: string;
    description: string;
}

interface NewProduct {
    name: string;
    brand: string;
    model: string;
    category: string;
    price: number;
    stock: number;
    availability: boolean;
    engineCapacity: number;
    color: string[];
    image: string;
    description: string;
}

const onSubmit = async (data: ProductFormData) => {
    try {
        const newProduct: NewProduct = {
            name: data.name,
            brand: data.brand,
            model: data.model,
            category: data.category,
            price: parseFloat(data.price),
            stock: parseInt(data.stock, 10),
            availability: data.availability === "true",
            engineCapacity: parseInt(data.engineCapacity, 10),
            color: data.color.split(","),
            image: data.image,
            description: data.description,
        };

        const response = await createProduct(newProduct).unwrap();

        if (response.insertedId) {
            reset();
            Swal.fire({
                title: "Success!",
                text: "Product Added Successfully",
                icon: "success",
                confirmButtonText: "Cool",
            });
            navigate("/adminPanel/allProduct");
        }
    } catch (error) {
        console.error("Error adding product:", error);
        Swal.fire({
            title: "Error!",
            text: "Failed to add product. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
        });
    }
};

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
        Add a New Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block font-semibold">Product Name*</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Product Name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Brand*</label>
          <input
            type="text"
            {...register("brand", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Brand"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Model*</label>
          <input
            type="text"
            {...register("model", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Model"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Category*</label>
          <input
            type="text"
            {...register("category", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Category"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Price*</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Price"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Stock*</label>
          <input
            type="number"
            {...register("stock", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Stock Quantity"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Availability*</label>
          <select
            {...register("availability", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Engine Capacity (cc)*</label>
          <input
            type="number"
            {...register("engineCapacity", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Engine Capacity"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Color (Comma Separated)*</label>
          <input
            type="text"
            {...register("color", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="e.g. Red, Blue, Black"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Image URL*</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Image URL"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Description*</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter Product Description"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
