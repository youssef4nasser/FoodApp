import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/Shared/components/AuthLayout/AuthLayout.jsx'
import Login from './modules/Auth/components/Login/Login.jsx'
import ForgetPass from './modules/Auth/components/ForgetPass/ForgetPass.jsx'
import ResetPass from './modules/Auth/components/ResstPass/ResetPass.jsx'
import Register from './modules/Auth/components/Register/Register.jsx'
import MasterLayout from './modules/Shared/components/MasterLayout/MasterLayout.jsx'
import Home from './modules/Home/components/Home/Home.jsx'
import RecipesList from './modules/Recipes/components/RecipesList/RecipesList.jsx'
import CtegoriesList from './modules/Categories/components/CtegoriesList/CtegoriesList.jsx'
import UsersList from './modules/Users/components/UsersList/UsersList.jsx'
import Notfound from './modules/Shared/components/Notfound/Notfound.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './modules/Shared/components/ProtectedRoute/ProtectedRoute.jsx'
import RecipeData from './modules/Recipes/components/RecipeData/RecipeData.jsx'
import VerifyAccount from './modules/Auth/components/VerifyAccount/VerifyAccount.jsx'
import Favorite from './modules/Recipes/components/Favorite/Favorite.jsx'
import AccountSettings from './modules/Auth/components/AccountSettings/AccountSettings.jsx'

function App() {

  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'forget-password', element: <ForgetPass /> },
        { path: 'reset-password', element: <ResetPass /> },
        { path: 'verify-account', element: <VerifyAccount /> },
        { path: 'register', element: <Register /> },
      ],
    },
    {
      path: 'dashboard',
      element: <ProtectedRoute><MasterLayout /></ProtectedRoute>,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'recipesList', element: <RecipesList /> },
        { path: 'recipe-data', element: <RecipeData /> },
        { path: 'recipe-update/:id', element: <RecipeData /> },
        { path: 'favorite', element: <Favorite /> },
        { path: 'ctegoriesList', element: <CtegoriesList /> },
        { path: 'usersList', element: <UsersList /> },
        { path: 'profile-settings', element: <AccountSettings /> },
      ],
    },
    { path: 'not-found', element: <Notfound /> },
  ])

  return <>
    <RouterProvider router={routes} />
    <ToastContainer />
  </>
}

export default App
