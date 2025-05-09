import { useCurrenttoken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { Avatar } from "antd";

const MyProfile = () => {
  const token = useAppSelector(useCurrenttoken);
  const user = token ? verifyToken(token) : null;

  return (
    <div className="min-h-screen bg-gray-100">
     
      <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/736x/e3/55/20/e355202816788c697e754df24118d1ad.jpg')" }}>
        {/* Profile Avatar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-48px]">
           
          <Avatar
  size={96}
  style={{
    backgroundImage: `url('https://i.pinimg.com/736x/ef/0c/19/ef0c19df86ebd3fd36df90f8d664ead6.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
/>
          
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-10 px-4 max-w-3xl mx-auto">
        <div className=" rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">{ "John"}</h2>
          <p className="text-gray-600 mb-1">Email: {user?.userId}</p>
          <p className="text-gray-500">Role: {user?.role}</p>
        </div>
      </div>
    </div>
  );
}
;

export default MyProfile;
