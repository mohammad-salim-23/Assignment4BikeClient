import { createBrowserRouter } from "react-router-dom";
import Root from "../component/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import ProtectedRoute from "../component/layout/ProtectedRoute";
import SignUp from "../pages/SignUp";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDetails from "../component/ProductDetails";
import About from "../pages/About/About";
import Dashboard from "../dashboard/Dashboard";
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
            },
            {
                path : "/productDetails/:id",
                element: <ProductDetails></ProductDetails>
            },
            {
                path : "/about",
                element: <About></About>
            }
        
            
        ]
    
    },
    //admin routes
    {
        path : "dashboard",
        element : (
            <>
                <ProtectedRoute role="user">
                    <Dashboard></Dashboard>
                </ProtectedRoute>
                <ProtectedRoute role="admin">
                    <Dashboard></Dashboard>
                </ProtectedRoute>
            </>
        )
    }
])
export default router;