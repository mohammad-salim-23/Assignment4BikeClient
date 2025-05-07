import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCreateBikeMutation } from "./adminManagement.api";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateProduct = () => {
  const { register, handleSubmit, reset } = useForm<ProductFormData>();

  const [createProduct] = useCreateBikeMutation(); 

  interface ProductFormData {
    name: string;
    brand: string;
    model: string;
    category: string;
    price: string;
    offerPrice?: string;
    stock: string;
    availability: string;
    engineCapacity: string;
    color: string;
    image: FileList;
    description: string;
  }

  interface NewProduct {
    name: string;
    brand: string;
    model: string;
    category: string;
    price: number;
    offerPrice?: number;
    stock: number;
    availability: boolean;
    engineCapacity: number;
    color: string[];
    image: string;
    description: string;
  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const uploadResponse = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      }).then(res => res.json());

      if (!uploadResponse.success) {
        throw new Error("Image upload failed");
      }

      const newProduct: NewProduct = {
        name: data.name,
        brand: data.brand,
        model: data.model,
        category: data.category,
        price: parseFloat(data.price),
        offerPrice: data.offerPrice ? parseFloat(data.offerPrice) : undefined,
        stock: parseInt(data.stock, 10),
        availability: data.availability === "true",
        engineCapacity: parseInt(data.engineCapacity, 10),
        color: data.color.split(","),
        image: uploadResponse.data.url,
        description: data.description,
      };

      const response = await createProduct(newProduct).unwrap();
      if (response.success) {
        reset();
        Swal.fire({
          title: "Success!",
          text: "Product Added Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
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
    <div className="w-full max-w-5xl mx-auto bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-400 transition-colors">
        Add a New Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Product Name*</label>
            <input type="text" {...register("name", { required: true })} className="w-full p-2 border rounded" placeholder="Enter Product Name" />
          </div>
          <div>
            <label className="block font-semibold">Brand*</label>
            <input type="text" {...register("brand", { required: true })} className="w-full p-2 border rounded" placeholder="Enter Brand" />
          </div>
          <div>
            <label className="block font-semibold">Model*</label>
            <input type="text" {...register("model", { required: true })} className="w-full p-2 border rounded" placeholder="Enter Model" />
          </div>
          <div>
            <label className="block font-semibold">Category*</label>
            <input type="text" {...register("category", { required: true })} className="w-full p-2 border rounded" placeholder="Enter Category" />
          </div>
          <div>
            <label className="block font-semibold">Price*</label>
            <input type="number" step="0.01" {...register("price", { required: true })} className="w-full p-2 border rounded" placeholder="Enter Price" />
          </div>
          <div>
            <label className="block font-semibold">Offer Price <span className="text-gray-500 text-sm">(Optional)</span></label>
            <input type="number" step="0.01" {...register("offerPrice")} className="w-full p-2 border rounded" placeholder="Enter Offer Price (Optional)" />
          </div>
          <div>
            <label className="block font-semibold">Stock*</label>
            <input type="number" {...register("stock", { required: true })} className="w-full p-2 border rounded" placeholder="Enter Stock Quantity" />
          </div>
          <div>
            <label className="block font-semibold">Availability*</label>
            <select {...register("availability", { required: true })} className="w-full p-2 border rounded">
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Engine Capacity (cc)*</label>
            <input type="number" {...register("engineCapacity", { required: true })} className="w-full p-2 border rounded" placeholder="Enter Engine Capacity" />
          </div>
          <div>
            <label className="block font-semibold">Color (Comma Separated)*</label>
            <input type="text" {...register("color", { required: true })} className="w-full p-2 border rounded" placeholder="e.g. Red, Blue, Black" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Upload Image*</label>
            <input type="file" {...register("image", { required: true })} className="w-full p-2 border rounded" accept="image/*" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Description*</label>
            <textarea {...register("description", { required: true })} className="w-full p-2 border rounded" placeholder="Enter Product Description" rows={4} />
          </div>
        </div>
        <button type="submit" className="mt-6 w-full bg-secondaryColor text-primaryColor font-bold p-2 rounded hover:bg-orange-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
