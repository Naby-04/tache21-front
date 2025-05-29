// import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { db, serverTimestamp } from "../../services/firebaseService";
//  import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { toast} from 'react-toastify'
 import {  Link as ScrollLink} from "react-scroll";
import { useState } from "react";
import logo from "../../assets/SenRapport.png"




const Footer = () => {

   const[email, setEmail] = useState("")
   const[message ,setMessage] = useState("")
   
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (email.trim() === "") {
      toast.warn("Veuillez entrer un email valide !");
      return
      }
      try {
        await addDoc(collection(db, "emails"), {
          email,
          time: serverTimestamp(),
        });

        emailjs.send(
          'service_wmra0c7',  
          'template_0u9mmwe',      
          { user_email: email },
          '8uD6SuB_tZuWwNH9Y'         
        )
        .then(() =>{
          toast.success("Merci ! Email enregistré et notification envoyée.");
          setEmail("")
        })
        .catch((err) => {
          console.error("Erreur EmailJS :", err);
          toast.error("Erreur lors de l'envoi de l'email de notification.");
        });
      } catch (err) {
        toast.error("Erreur Firestore :", err);
        toast.error("Erreur lors de l'enregistrement. Veuillez réessayer.");
      }
  };


  return (
    <>
      <footer className="bg-gray-800 py-10">
        <div className="flex flex-col md:flex-row justify-between px-4">
          {/* ==============partie logo============== */}
          <div className="flex flex-col gap-8">
            <div>
              <img src={logo} alt="logo (2).png" className="w-25" />
            </div>
            <div>
              <p className=" text-white">
                Une plateforme collaborative pour publier, <br />
                consulter et valoriser les rapports qui comptent. <br />
                Donnez vie à vos rapports, partagez-les avec le monde.
              </p>
            </div>
          </div>
          {/* ==============partie rapports============== */}
          <div className="flex flex-col gap-4  text-white">
            <div className="flex flex-col gap-2">
              <div className="hover:text-gray-300 text-amber-300 mb-2">
                <Link to='/'>SenRapport</Link>
              </div>
              <div className="hover:text-amber-300 text-white cursor-pointer">
                <ScrollLink to="show"  smooth={true} duration={500} offset={-70} >Accueil</ScrollLink>
              </div>
              <div className="hover:text-amber-300 text-white cursor-pointer">
                <ScrollLink to="services"  smooth={true} duration={500} offset={-70} >Services</ScrollLink>
              </div>
              <div className="hover:text-amber-300 text-white cursor-pointer">
                <ScrollLink to="rapports" smooth={true} duration={500} offset={-70}>Rapports</ScrollLink>
              </div>
              <div className="hover:text-amber-300 text-white cursor-pointer">
                <ScrollLink to="a-propos"  smooth={true} duration={500} offset={-70}>À propos</ScrollLink>
              </div>
            </div>
          </div>
          {/*================partie contact================ */}
          <div className="flex flex-col gap-4  text-white">
          <p className="text-sm  text-amber-300 mb-2">Contacts</p>
            <div>
              <div className="flex gap-1 hover:text-gray-300">
                 <div className="text-xl text-amber-300">
                 <IoLocation />
                 </div>
                 <div>
                 <Link to='/'>Dakar, Sénégal</Link>
                 </div>
              </div>
            </div>
            <div>
              <div className="flex gap-2 hover:text-gray-300">
                <div className="text-amber-300">
                <FaPhoneAlt />
                </div>
                <div>
                <Link to='/'>76 592 61 27</Link>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-1 hover:text-gray-300">
                <div className="text-amber-300 text-xl">
                <MdOutlineEmail />
                </div>
                <div>
                <Link to='/'>hello@senrapports.com</Link>
                </div>
              </div>
            </div>
          </div>
          {/* ===========partie newsletter=========== */}
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <label
                htmlFor="newsletter"
                className="text-sm text-amber-300"
              >
               NEWSLETTER
              </label>
              <div className="mt-8 flex gap-2 flex-wrap">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-700">
                  <input
                    type="email"
                    name="user_email"
                    id="newsletter"
                    className="block w-fullmin-w-0 grow  py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    placeholder="Votre email"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
                <div className="">
                  <button 
                  onClick={handleSend}
                  className="bg-white rounded-xl  w-15 h-10 flex items-center justify-center mx-auto text-gray-800 hover:text-white hover:bg-amber-300  px-6 outline-2 outline-offset-2 ... cursor-pointer ...">
                    <BsFillSendFill />
                  </button>
                </div>
                {message && (
                <p 
                name="message"
                className="text-sm mt-2 text-gray-600">{message}</p>
                   )}
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex gap-2 flex-wrap text-2xl">
                <Link  to='/' className=" text-gray-300 hover:text-white">
                  <FaFacebook />
                </Link>
                <Link to='/' className=" text-gray-300 hover:text-white">
                  <FaLinkedin />
                </Link>
                <Link to='/' className=" text-gray-300 hover:text-white">
                  <FaXTwitter />
                </Link>
              </div>
            </div>
            {/* ==================Button================== */}
          </div>
        </div>
        <div className="border-t border-white py-4 mt-5  w-full sm:w-auto flex justify-between">
          <div className="px-4">
            <p className="text-sm  text-white mt-2">
              SenRapports © 2025. Tous droits réservés.
            </p>
          </div>
          {/* <div className="px-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-5 right-5 bg-amber-300 text-white p-3 rounded-full shadow-lg  transition z-50 btnAnime"
              title="Remonter"
            >
              <span className="flex items-center justify-center mx-auto text-gray-800">
                <FaLongArrowAltUp />
              </span>
            </button>
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
