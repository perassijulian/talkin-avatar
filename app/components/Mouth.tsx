import React from "react";
import Image from "next/image";
import mouthImageClosed from "@/public/images/mouth-closed.png";
import mouthImageSmall from "@/public/images/mouth-small.png";
import mouthImageMedium from "@/public/images/mouth-medium.png";
import mouthImageWide from "@/public/images/mouth-wide.png";

type MouthProps = {
  state: "closed" | "small" | "medium" | "wide";
};

const Mouth: React.FC<MouthProps> = ({ state }) => {
  const getMouthImage = () => {
    switch (state) {
      case "small":
        return mouthImageSmall;
      case "medium":
        return mouthImageMedium;
      case "wide":
        return mouthImageWide;
      case "closed":
      default:
        return mouthImageClosed;
    }
  };

  return (
    <Image
      src={getMouthImage()}
      alt={`Mouth ${state}`}
      width={100}
      height={100}
      priority
      className="pointer-events-none select-none scale-x-[-1]"
    />
  );
};

export default Mouth;
