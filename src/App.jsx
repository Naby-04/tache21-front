import React from 'react'
import { Toaster } from 'react-hot-toast'
import PublicationForm from './Composants/PublicationForm';

const App = () => {
  return (
    <>
        <PublicationForm/>
        <Toaster position='top-center'/>    
    </>
  )
}

export default App;
