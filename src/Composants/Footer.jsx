import React from 'react'
 import { FaFacebook } from "react-icons/fa";
 import { FaInstagramSquare } from "react-icons/fa";
 import { FaXTwitter } from "react-icons/fa6";
 import { FaLinkedin } from "react-icons/fa";
 

const Footer = () => {
  return (
    <>

<footer className="bg-yellow-700 text-amber-100 py-10">
  <div className="max-w-full  px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row md:px-4 justify-between ml-9 items-center">
      
      <div className=''>
        <img src="vite.svg" alt="" />
      </div>
      
     
      <div>
        <ul className="flex flex-wrap space-x-6 sm:px-6  lg:px-8 mt-4 md:mt-8 ">
          <li><a href="#" className="text-amber-100 hover:text-white">Accueil</a></li>
          <li><a href="#" className="text-amber-100 hover:text-white">Rapports</a></li>
          <li><a href="#" className="text-amber-100 hover:text-white">Contact</a></li>
        </ul>
      </div>
      
    
      <div>
        <div className="flex space-x-4 flex-wrap sm:px-6 mt-4 md:mt-8   lg:px-8">
          <a href="#" className="hover:text-white"><FaFacebook /></a>
          <a href="#" className="hover:text-white"><FaInstagramSquare /></a>
          <a href="#" className="hover:text-white"><FaXTwitter /></a>
          <a href="#" className="hover:text-white"><FaLinkedin /></a>
        </div>
      </div>

    </div>

  
  </div>
    {/* <div className="mt-10 text-center border-t-1 border-amber-100 max-w-9/10 mx-10 text-xs text-amber-100 ">
    </div> */}
     <p className='mt-10 mx-8 text-xs max-w-9/10 text-amber-100 text-center'>Copyright © 2025.</p>
</footer>

    </>
  )
}

export default Footer