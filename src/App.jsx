import React from 'react'
import PublicationForm from './Components/PublicationForm'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
        <PublicationForm/>
        <Toaster position='top-center'/>    
    </>
  )
}

export default App