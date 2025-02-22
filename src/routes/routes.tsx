import { createBrowserRouter } from "react-router-dom";
import Root from "../component/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import UserDashboard from "../dashboard/user/UserDashboard";
import ProtectedRoute from "../component/layout/ProtectedRoute";
import SignUp from "../pages/SignUp";
import AllProducts from "../pages/AllProducts/AllProducts";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children : [
            {
                path : "/",
                element:  <Home></Home>
            },
            {
              path: "/login",
              element: <Login></Login>
            },
            {
                path: "/signup",
                element : <SignUp></SignUp>
            },
            {
                path :"/allProducts",
                element : <AllProducts></AllProducts>
            }
            
        ]
    
    },
    {
        path : '/admin/dashboard',
        element: <ProtectedRoute role="admin"><AdminDashboard></AdminDashboard></ProtectedRoute>
    },
    {
        path : '/user/dashboard',
        element :<ProtectedRoute role = "user"> <UserDashboard></UserDashboard></ProtectedRoute>
    }
])
export default router;