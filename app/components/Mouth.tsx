import React from "react";

type MouthProps = {
  state: "closed" | "small" | "medium" | "wide";
};

const Mouth: React.FC<MouthProps> = ({ state }) => {
  switch (state) {
    case "small":
      return <div className="w-10 h-1 bg-black rounded-full" />;
    case "medium":
      return <div className="w-12 h-3 bg-black rounded-full" />;
    case "wide":
      return <div className="w-14 h-6 bg-black rounded-full" />;
    default:
      return <div className="w-10 h-0.5 bg-black rounded-full" />;
  }
};

export default Mouth;
