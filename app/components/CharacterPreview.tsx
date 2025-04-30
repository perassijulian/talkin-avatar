// components/CharacterPreview.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Eyes from "./Eyes";
import Mouth from "./Mouth";

type Props = {
  volume: number;
};

const CharacterPreview = ({ volume }: Props) => {
  const [eyesState, setEyesState] = useState<"open" | "closed">("open");

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyesState("closed");
      setTimeout(() => setEyesState("open"), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  const getMouthState = () => {
    console.log(volume);
    if (volume > 0.1) return "wide";
    if (volume > 0.05) return "medium";
    if (volume > 0.01) return "small";
    return "closed";
  };

  return (
    <div className="w-full max-w-md flex justify-center items-center mb-6">
      <div className="relative w-[500px] h-[500px]">
        <Image
          src="/images/avatar-placeholder2.png"
          alt="Vista previa del personaje"
          fill
          priority
          className="rounded-lg shadow-lg object-contain"
        />

        {/* OJOS */}
        {/* CONTROLAR POSICION DESDE LA UI */}
        <div className="absolute -rotate-2 -top-35 left-4 w-full h-full flex items-center justify-center pointer-events-none">
          <Eyes state={eyesState} />
        </div>

        {/* BOCA */}
        {/* CONTROLAR POSICION DESDE LA UI */}
        <div className="absolute top-[30%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Mouth state={getMouthState()} />
        </div>
      </div>
    </div>
  );
};

export default CharacterPreview;
