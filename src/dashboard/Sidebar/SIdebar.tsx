import {  NavLink } from "react-router-dom";

import { FaBox, FaList, FaUsers, FaClipboardList, FaUserAlt, FaHome} from "react-icons/fa";
import { useCurrenttoken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
const Sidebar = ()=> {
      const token = useAppSelector(useCurrenttoken);
        const user = token ? verifyToken(token) : null;
        const Role = user?.role;
    return(
        <div>
              {/* Sidebar */}
                        <div className="drawer-side">
                            <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-60 min-h-screen bg-base-200 text-base-content">
                                {/* Sidebar title */}
                                <li className="text-xl font-bold text-center py-4">Dashboard</li>
            
                                {/* Admin Dashboard */}
                                {Role === "admin" && (
                                    <>
                                        <li><NavLink to="/admin/dashboard/createProduct"><FaBox /> Create Product</NavLink></li>
                                        <li><NavLink to="/admin/dashboard/allProduct"><FaList /> All Products</NavLink></li>
                                        <li><NavLink to="/admin/dashboard/totalUsers"><FaUsers /> Total Users</NavLink></li>
                                        <li><NavLink to="/admin/dashboard/manageOrders"><FaClipboardList /> Manage Orders</NavLink></li>
                                        <li><NavLink to="/admin/dashboard/myProfile"><FaUserAlt /> My Profile</NavLink></li>
                                      
                                        <li><NavLink to="/admin/dashboard/profileSetting"><FaUserAlt /> Profile Setting</NavLink></li>
                                    </>
                                )}
            
                                {/* User Dashboard */}
                                {Role === "user" && (
                                    <>
                                        <li><NavLink to="/user/dashboard/myProfile"><FaUserAlt /> My Profile</NavLink></li>
                                        <li><NavLink to="/user/dashboard/profileSetting"><FaUserAlt /> Profile Setting</NavLink></li>
                                        <li><NavLink to="/user/dashboard/myOrders"><FaClipboardList /> My Order List</NavLink></li>
                                    </>
                                    
                                )}
            
                              
                                {!Role && <li className="text-red-500 text-center font-bold">Unauthorized Access</li>}
            
                                <div className="divider"></div>
            
                          
                                <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                            </ul>
                        </div>
        </div>
    )
}
export default Sidebar;