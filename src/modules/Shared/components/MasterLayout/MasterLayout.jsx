import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar.jsx"
import SideBar from "../SideBar/SideBar.jsx"

function MasterLayout({loginData}) {
  return (
    <>
      <div className="d-flex">
        <div className="bg-info">
          <SideBar />
        </div>
        <div className="w-100 bg-danger">
          <Navbar loginData={loginData} />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MasterLayout