import { createBrowserRouter } from "react-router-dom";
import Root from "../component/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
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
              path: "/signin",
              element: <Login></Login>
            }
        ]
    }
])
export default router;