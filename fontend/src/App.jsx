import React from 'react'
import Nabvar from './components/shared/Nabvar'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  }
  ,
  {
    path: "/description/:id",
    element: <JobDescription />
  }
  ,
  // admin routes
  {
    path: "/admin/companies",
    element: <Companies />
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompany />
  },

  {
    path: "/admin/companies/:id",
    element: <CompanySetup />
  },

]
)

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App