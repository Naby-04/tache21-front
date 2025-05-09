import React from "react";

const InputField = ({ type, name, placeholder, label,...rest }) => {
  return (
    <div>
    <label>{label}</label>
    
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full p-3 md:p-4 border rounded-lg bg-white"
      {...rest}
    /></div>
  );
};

export default InputField;
