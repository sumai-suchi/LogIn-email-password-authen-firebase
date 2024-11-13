import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main.jsx';
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/Signup/SignUp.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'Login',
          element:<Login></Login>,

        },
        {
          path:'Register',
          element:<Register></Register>
        },
        {
          path:'SignUp',
          element:<SignUp></SignUp>
        }

    ]
  },

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
