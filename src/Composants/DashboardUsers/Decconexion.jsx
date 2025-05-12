import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Deconnexion = ({ button }) => {
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
  };

  return (
    <button
      className="font-[var(--font-button);--weight-bold] cursor-pointer text-[15px]"
      onClick={logOut}
    >
      {button}
    </button>
  );
};
