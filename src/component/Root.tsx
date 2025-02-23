import { Outlet } from "react-router-dom"
import Navbar from "../sharedComponent/Navbar"
import Footer from "../sharedComponent/Footer";

const Root = ()=>{
    return (
        <div>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    )
}
export default Root;