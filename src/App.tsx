import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Router from './routes'
import Theme from './theme'

const App: React.FC = () => {
  return (
    <>
      <Router />
      <Theme />
      <ToastContainer />
    </>
  )
}

export default App
