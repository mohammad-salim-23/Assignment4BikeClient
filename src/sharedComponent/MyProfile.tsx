import { useCurrenttoken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const MyProfile = () => {
   const token = useAppSelector(useCurrenttoken);
      const user = token ? verifyToken(token) : null;
      console.log(user);
      const Role = user?.role;

    return (
        <div className="flex items-center justify-center">
            <div className="card w-full bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Email: {user?.userId}</h2>
    <p className="font-medium">Role: {user?.role}</p>
   

  </div>
 
</div>
        </div>
             
    );
};

export default MyProfile;