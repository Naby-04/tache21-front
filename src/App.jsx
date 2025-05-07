import React from 'react'
import PublicationForm from './Components/PublicationForm'
import { Toaster } from 'react-hot-toast'
import Profile from './pages/Profile'

const App = () => {
  return (
    <>
        {/* <PublicationForm/> */}
        <Profile/>
        <Toaster position='top-center'/>    
    </>
  )
}

export default App