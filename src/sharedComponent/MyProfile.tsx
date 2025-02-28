import { useCurrenttoken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { UserIcon } from "@heroicons/react/24/outline";


const MyProfile = () => {
  const token = useAppSelector(useCurrenttoken);
  const user = token ? verifyToken(token) : null;
  console.log(user);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl p-6 rounded-lg text-center">
        {/* User Icon */}
        <div className="flex justify-center">
          <UserIcon className="h-24 w-24 text-gray-500 border rounded-full p-2 bg-gray-200" />
        </div>

        <div className="card-body">
          <h2 className="card-title text-lg font-semibold">Email: {user?.userId}</h2>
          <p className="font-medium text-gray-600">Role: {user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
