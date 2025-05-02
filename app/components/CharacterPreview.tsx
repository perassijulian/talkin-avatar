// components/CharacterPreview.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Eyes from "./Eyes";
import Mouth from "./Mouth";

type Props = {
  volume: number;
};

const CharacterPreview = ({ volume }: Props) => {
  const [eyesState, setEyesState] = useState<"open" | "closed" | "side">(
    "open"
  );
  const openCounter = useRef(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      openCounter.current++;

      if (eyesState === "open") {
        if (openCounter.current >= 5) {
          // por ejemplo, 5 openCounters abiertos
          openCounter.current = 0;
          openCounter.current += 1;

          if (openCounter.current >= 4) {
            openCounter.current = 0;
            setEyesState("side"); // cada 4 parpadeos, hace "side"
          } else {
            setEyesState("closed"); // parpadeo normal
          }
        }
      } else {
        // Si está closed o side, vuelve rápido a open
        setEyesState("open");
      }
    }, 200); // cada 200ms cambia el eyesState si es necesario

    return () => clearInterval(intervalo);
  }, [eyesState]);

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
        <div className="absolute -top-34 left-5 scale-70 w-full h-full flex items-center justify-center pointer-events-none">
          <Eyes state={eyesState} />
        </div>

        {/* BOCA */}
        {/* CONTROLAR POSICION DESDE LA UI */}
        <div className="absolute top-[22%] left-[44%] scale-75 -rotate-3 transform pointer-events-none">
          <Mouth state={getMouthState()} />
        </div>
      </div>
    </div>
  );
};

export default CharacterPreview;
