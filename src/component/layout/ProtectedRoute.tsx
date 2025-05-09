
import {  TUser, useCurrenttoken } from "../../redux/features/auth/authSlice"
import {useAppSelector } from "../../redux/hooks"
import { verifyToken } from "../../utils/verifyToken";
import { Navigate } from "react-router-dom";

import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrenttoken);
    let  user ; 
    if(token){
        user = verifyToken(token);
    }

    console.log(user);
    if(!user){
     <p>loading....</p>
    }
    const role = user?.role;
   console.log(role);
   if(role !== undefined && role !== (user as  TUser)?.role){
    return <Navigate to="/login" replace = {true}/>
   }
   if(!token){
     return <Navigate to="/login" replace={true}/>
}
   return children;
}
export default ProtectedRoute;