import React from "react";

type EyesProps = {
  state: "open" | "closed" | "left";
};

const Eyes: React.FC<EyesProps> = ({ state }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="40"
      viewBox="0 0 100 40"
    >
      {/* Estado: Abiertos */}
      {state === "open" && (
        <>
          <circle cx="30" cy="20" r="10" fill="white" />
          <circle cx="30" cy="20" r="4" fill="black" />
          <circle cx="70" cy="20" r="10" fill="white" />
          <circle cx="70" cy="20" r="4" fill="black" />
        </>
      )}

      {/* Estado: Cerrados */}
      {state === "closed" && (
        <>
          <line
            x1="20"
            y1="20"
            x2="40"
            y2="20"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="60"
            y1="20"
            x2="80"
            y2="20"
            stroke="black"
            strokeWidth="2"
          />
        </>
      )}

      {/* Estado: Mirando a la izquierda */}
      {state === "left" && (
        <>
          <circle cx="30" cy="20" r="10" fill="white" />
          <circle cx="26" cy="20" r="4" fill="black" />
          <circle cx="70" cy="20" r="10" fill="white" />
          <circle cx="66" cy="20" r="4" fill="black" />
        </>
      )}
    </svg>
  );
};

export default Eyes;
