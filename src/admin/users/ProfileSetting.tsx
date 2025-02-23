/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useChangePasswordMutation } from "../adminManagement.api";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TResponse } from "../../types/global";
import { logout } from "../../redux/features/auth/authSlice";

const ProfileSetting = ()=>{
    const {register , handleSubmit , formState: {errors}} = useForm();
    const [changePassword , {isLoading}] = useChangePasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit : SubmitHandler<FieldValues> = async(data)=>{
        console.log(data);
        const res = (await changePassword(data)) as TResponse<any>;
        console.log("API response: ", res);
        if(res?.data?.success){
            dispatch(logout());
            navigate('/login');
        }
    }
    return (
        <div>
           <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Old Password */}
        <div>
          <label className="block font-medium mb-1">Old Password</label>
          <input
            type="password"
            {...register("oldPassword", { required: "Old password is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter old password"
          />
          {errors.oldPassword && <p className="text-red-500 text-sm">{String(errors.oldPassword.message)}</p>}
        </div>

        {/* New Password */}
        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input
            type="password"
            {...register("newPassword", { required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter new password"
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{String(errors.newPassword.message)}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-secondaryColor text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
        </div>
    )
}
export default ProfileSetting;