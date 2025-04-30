"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Eyes from "./Eyes";

const CharacterPreview = () => {
  const [eyesState, setEyesState] = useState<"open" | "closed">("open");

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      // Cierra los ojos brevemente y vuelve a abrirlos
      setEyesState("closed");
      setTimeout(() => setEyesState("open"), 150); // cerrar por 150ms
    }, 3000); // parpadea cada 3 segundos

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="w-full max-w-md flex justify-center items-center mb-6">
      {/* Contenedor relativo para superponer imagen y SVG */}
      <div className="relative w-[500px] h-[500px]">
        <Image
          src="/images/avatar-placeholder2.png"
          alt="Vista previa del personaje"
          fill
          priority
          className="rounded-lg shadow-lg object-contain"
        />

        {/* Ojos posicionados sobre la imagen */}
        {/* MANEJAR POSICION DE OJOS. TO DO: HACER UN COMPONENTE UI PARA POSICIONARLOS */}
        <div className="absolute -rotate-2 -top-35 left-4 w-full h-full flex items-center justify-center pointer-events-none">
          <Eyes state={eyesState} />
        </div>
      </div>
    </div>
  );
};

export default CharacterPreview;
