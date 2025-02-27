import { createBrowserRouter } from "react-router-dom";
import Root from "../component/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDetails from "../component/ProductDetails";
import About from "../pages/About/About";
import Dashboard from "../dashboard/Dashboard";
import CreateProduct from "../admin/CreateProduct";
import AllProductsAdmin from "../admin/AllProductsAdmin";
import TotalUsers from "../admin/TotalUsers";
import MyProfile from "../sharedComponent/MyProfile";
import ProfileSetting from "../admin/users/ProfileSetting";
import CheckOut from "../order/CheckOut";
import Purchase from "../order/Purchase";
import MyOrders from "../sharedComponent/MyOrders";
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
            },
            {
                path:"/checkout/:id",
                element : <CheckOut></CheckOut>
            },
            {
                path : "/purchase",
                element: <Purchase></Purchase>
            }
        
            
        ]
    
    },
    //admin routes
    {
        path : ":role/dashboard",
        element :     
                    <Dashboard></Dashboard>
        ,
        children:[
            {
                path: "createProduct",
                element: <CreateProduct></CreateProduct>
            },
            {
                path:"allProduct",
                element:<AllProductsAdmin></AllProductsAdmin>
            },
            {
                path: "totalUsers",
                element : <TotalUsers></TotalUsers>
            },
            {
                path: "myProfile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "profileSetting",
                element : <ProfileSetting></ProfileSetting>
            },
            {
                path : "myOrders",
                element : <MyOrders></MyOrders>
            }
        ]
    }
])
export default router;