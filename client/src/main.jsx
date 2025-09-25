import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { AppContextProvider } from './context/AppContext.jsx';

import Layout from './pages/Layout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "verify-email", element: <EmailVerify /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>,
)
