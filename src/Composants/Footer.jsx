import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="bg-blue-50 py-5">
        <div className="flex  flex-col md:flex-row justify-between px-4">
          {/* ==============partie logo============== */}
          <div className="flex flex-col gap-8">
            <div>
              <img src="" alt="logo (2).png" />
            </div>
            <div className="">
              <p>
                Une plateforme collaborative pour publier, <br />
                consulter et valoriser les rapports qui comptent. <br />
                Donnez vie à vos rapports, partagez-les avec le monde.
              </p>
            </div>
          </div>
          {/* ==============partie rapports============== */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-medium">Rapports</h1>
            <div className="flex flex-col gap-4">
              <div>
                <p>Médecine et Santé</p>
              </div>
              <div>
                <p>Droit Privé</p>
              </div>
              <div>
                <p>Sociologie</p>
              </div>
              <div>
                <p>Sciences</p>
              </div>
            </div>
          </div>
          {/*================partie contact================ */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-medium">Contact</h1>
            <div>
              <div>
                <p>Dakar, Sénégal</p>
              </div>
            </div>
            <div>
              <div>
                <p>76 592 61 27</p>
              </div>
            </div>
            <div>
              <div>
                <p>hello@Company.com</p>
              </div>
            </div>
          </div>
          {/* ===========partie newsletter=========== */}
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <label
                htmlFor="newsletter"
                className="block text-sm/6 font-medium text-gray-900"
              >
                NEWSLETTER:
              </label>
              <div className="mt-8 flex gap-2 flex-wrap">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-700">
                  <input
                    type="email"
                    name="newsletter"
                    id="newsletter"
                    className="block w-fullmin-w-0 grow  py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="">
                  <button className="bg-blue-950 rounded-xl  w-15 h-10 flex items-center justify-center mx-auto text-white  px-6 outline-2 outline-offset-2 ... cursor-pointer ...">
                    <BsFillSendFill />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex gap-2 flex-wrap text-2xl">
                <div className="text-blue-950">
                  <FaFacebook />
                </div>
                <div className="text-blue-950">
                  <FaLinkedin />
                </div>
                <div className="text-blue-950">
                  <FaXTwitter />
                </div>
              </div>
            </div>
            {/* ==================Button================== */}
          </div>
        </div>
        <div className="border-t py-4 mt-2  w-full sm:w-auto flex justify-between">
          <div className="px-4">
            <p className="text-sm text-blue-950 mt-2">
              Company © 2025. Tous droits réservés.
            </p>
          </div>
          <div className="px-4">
            <button
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="bg-blue-950  w-10 h-10 rounded-3xl mx-auto cursor-pointer ...">
              <span className="flex items-center justify-center mx-auto text-white">
                <FaLongArrowAltUp />
              </span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
