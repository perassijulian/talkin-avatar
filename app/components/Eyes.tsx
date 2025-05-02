import React from "react";
import Image from "next/image";
import eyesClosed from "@/public/images/eyes-closed.png";
import eyesOpen from "@/public/images/eyes-open.png";
import eyesSide from "@/public/images/eyes-side.png";

type EyesProps = {
  state: "closed" | "open" | "side";
};

const Eyes: React.FC<EyesProps> = ({ state }) => {
  const getEyesImage = () => {
    switch (state) {
      case "open":
        return eyesOpen;
      case "side":
        return eyesSide;
      case "closed":
      default:
        return eyesClosed;
    }
  };

  return (
    <Image
      src={getEyesImage()}
      alt={`Eyes ${state}`}
      width={100}
      height={100}
      priority
      className="pointer-events-none select-none scale-x-[-1]"
    />
  );
};

export default Eyes;
