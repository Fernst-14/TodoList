import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Edit from './Edit.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/todo/:id",  // กำหนด param id ที่ต้องการ
    element: <Edit />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
