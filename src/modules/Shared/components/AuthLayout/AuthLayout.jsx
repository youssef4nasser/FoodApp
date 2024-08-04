import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

function AuthLayout() {

  const navigate = useNavigate()
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/dashboard')
    }
  }, [])
  
  return (
    <Outlet />
  )
}

export default AuthLayout