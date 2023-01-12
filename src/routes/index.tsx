import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from '../pages/ErrorPage'
import { FirstStep } from '../pages/FirstStep'
import { SecondStep } from '../pages/SecondStep'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FirstStep />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/step-two',
    element: <SecondStep />,
    errorElement: <ErrorPage />,
  },
])

const Router: React.FC = () => {
  return <RouterProvider router={router} />
}

export default Router
