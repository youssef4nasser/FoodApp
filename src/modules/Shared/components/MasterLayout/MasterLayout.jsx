import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar.jsx"
import SideBar from "../SideBar/SideBar.jsx"

function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="">
          <SideBar />
        </div>
        <div className="w-100">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MasterLayout