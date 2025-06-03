import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const TestNews = () => {

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, {
        publicKey: 'YOUR_PUBLIC_KEY',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div>
      <form ref={form} onSubmit={sendEmail} className="ml-2">
        <div className="mb-2 w-[40%]">
              <label
                htmlFor="email"
                className="block text-gray-800 text-sm font-bold mb-2"
              >
                Entrez votre email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Votre email"
                name="user_email"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
           <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
            Message
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                   name="message"
                  rows={3}
                  className="block w-[40%] rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="w-[40%]">
              <button
                className="bg-gray-800 mt-4 hover:bg-gray-600 text-white font-bold py-3 px-4 h-10 rounded-2xl focus:outline-none focus:shadow-outline w-full cursor-pointer"
                type="submit"
              >
               
               Envoyer à tous
              </button>
            </div>
      </form>
    </div>
  );
};

export default TestNews;
