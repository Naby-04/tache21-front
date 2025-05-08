import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-blue-50 py-10">
        <div className="flex  flex-col md:flex-row justify-around max-w-7xl mx-auto px-4">
          {/* premier div */}
          <div className="flex flex-col gap-6">
            <div>
              <p>
                <strong className="text-xs">ADDRESS:</strong> Hlm Grand Yoff
                Villa n°241.
              </p>
            </div>
            <div>
              <p>
                <strong className="text-xs">PHONE:</strong> +84 1102 2705
              </p>
            </div>
            <div>
              <p>
                <strong className="text-xs">Email:</strong> hello@thebox.com
              </p>
            </div>
            <div className="w-10 mb-3">
              <img src="logo (2).png" alt="" />
            </div>
          </div>
          {/* deuxieme div */}
          <div className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="newsletter"
                className="block text-sm/6 font-medium text-gray-900"
              >
                NEWSLETTER:
              </label>
              <div className="mt-2 flex gap-4 flex-wrap">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-700">
                  <input
                    type="email"
                    name="newsletter"
                    id="newsletter"
                    className="block w-fullmin-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="mt-2">
                  <button className="bg-blue-950 text-blue-200 rounded-lg px-6 outline-2 outline-offset-2 ... cursor-pointer ...">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 ">
              <h2 className="text-xs">SOCIAL:</h2>
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
          </div>
        </div>
      </footer>
      <div className="bg-blue-950 py-4  w-full sm:w-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs text-amber-100 m-auto text-center">
            Company © 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
