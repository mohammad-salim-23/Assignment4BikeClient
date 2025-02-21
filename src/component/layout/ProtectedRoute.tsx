import { ReactNode } from "react";
import { logout, TUser, useCurrenttoken } from "../../redux/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { verifyToken } from "../../utils/verifyToken";
import { Navigate } from "react-router-dom";
type TProtectedRoute = {
    children : ReactNode,
    role : string | undefined;
}
const ProtectedRoute = ({children, role}: TProtectedRoute)=>{
    const token = useAppSelector(useCurrenttoken);
    let  user ; 
    if(token){
        user = verifyToken(token);
    }
    const dispatch = useAppDispatch();
    console.log(user);
    if(!user){
        <p>loading....</p>
    }
   console.log(role);
   if(role !== undefined && role ! == (user as  TUser)?.role){
    dispatch(logout());
    return <Navigate to="/login" replace = {true}/>
   }
   if(!token){
     return <Navigate to="/login" replace={true}/>
}
   return children;
}
export default ProtectedRoute;