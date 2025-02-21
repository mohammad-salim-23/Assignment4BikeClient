import { Outlet } from "react-router-dom"
import Navbar from "../sharedComponent/Navbar"

const Root = ()=>{
    return (
        <div>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
export default Root;