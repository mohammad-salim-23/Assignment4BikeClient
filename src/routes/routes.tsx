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
import ManageOrders from "../admin/ManageOrders";
import ContactUs from "../pages/ContactUs";
import Service from "../pages/Services/page";
import AllOfferProducts from "../pages/AllOfferProducts/AllOfferProducts";
import Cart from "../pages/cart/Cart";
import ProtectedRoute from "../component/layout/ProtectedRoute";
import Overview from "../dashboard/Overview/Overview";
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
                path:"/checkout",
                element : <CheckOut></CheckOut>
            },
            {
                path : "/purchase",
                element: <Purchase></Purchase>
            },
            {
                path:"/contact",
                element: <ContactUs></ContactUs>
            },
            {
                path:"/services",
                element: <Service></Service>
            },
            {
                path:"/offers",
                element : <AllOfferProducts></AllOfferProducts>
            },
            {
                path: "/cart",
                element: <ProtectedRoute><Cart /></ProtectedRoute>
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
  index: true,
  element: <Overview role="user || admin"/>,
},
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
            },
            {
                path:"manageOrders",
                element: <ManageOrders></ManageOrders>
            }
        ]
    }
])
export default router;