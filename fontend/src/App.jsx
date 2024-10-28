import React from 'react'
import Nabvar from './components/shared/Nabvar'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import AdminJob from './components/admin/AdminJobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProctectRoute from './components/admin/ProtectedRoute'

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
    element: <ProctectRoute>
      <Companies />
    </ProctectRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProctectRoute>
      <CreateCompany />
    </ProctectRoute>

  },

  {
    path: "/admin/companies/:id",
    element: <ProctectRoute>
      <CompanySetup />
    </ProctectRoute>

  },
  {
    path: "/admin/jobs",
    element: <ProctectRoute>
      <AdminJob />
    </ProctectRoute>

  }
  ,
  {
    path: "/admin/jobs/create",
    element: <ProctectRoute>
      <PostJob />
    </ProctectRoute>

  },
  {
    path: "/admin/job/:id/applicants",
    element: <ProctectRoute>
      <Applicants />
    </ProctectRoute>

  }

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