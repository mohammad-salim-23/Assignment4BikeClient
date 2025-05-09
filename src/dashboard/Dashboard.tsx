import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useCurrenttoken, setUser, logout } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import {
  FaBox,
  FaList,
  FaUsers,
  FaClipboardList,
  FaUserAlt,
  FaHome,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { Dropdown, Avatar, Space } from "antd";
import { toast } from "sonner";



const Dashboard = () => {
  const token = useAppSelector(useCurrenttoken);
  const user = token ? verifyToken(token) : null;
  const Role = user?.role;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUser({ user: null, token: null }));
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const profileMenu = [
    {
      key: "1",
      label: <NavLink to={`/${Role}/dashboard/myProfile`}>Profile</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to={`/${Role}/dashboard/profileSetting`}>Settings</NavLink>,
    },
    {
      key: "3",
      label: <span onClick={handleLogout}>Logout</span>,
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <label htmlFor="dashboard-drawer" className="btn bg-slate-500 drawer-button lg:hidden">
            <FaBars className="mr-2" /> Menu
          </label>
          <Dropdown menu={{ items: profileMenu }} trigger={["click"]}>
            <Space className="cursor-pointer">
             <Avatar
  size="large"
  style={{
    backgroundImage: `url('https://i.pinimg.com/736x/5e/2a/81/5e2a8114dd022026bc4676fc6fa45ce3.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
</Avatar>

            </Space>
          </Dropdown>
        </div>

        {/* Default overview page */}
        

        <Outlet />
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-60 min-h-screen bg-base-200 text-base-content">
          <li className="text-xl font-bold text-center py-4">Dashboard</li>

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
  );
};

export default Dashboard;
