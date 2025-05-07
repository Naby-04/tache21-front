import React from "react";

const InputField = ({ type, name, placeholder, ...rest }) => {
  return (
    <input
      type={"type"}
      name={"name"}
      placeholder={"placeholder"}
      className="w-full p-3 md:p-4 border rounded-lg bg-white"
      {...rest}
    />
  );
};

export default InputField;
