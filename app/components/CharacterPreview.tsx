"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CharacterPreviewProps = {
  volume: number; // Recibe el volumen de AudioAnalyzer
};

const CharacterPreview = ({ volume }: CharacterPreviewProps) => {
  const [mouthOpen, setMouthOpen] = useState(false);

  useEffect(() => {
    // Cambia el estado de la boca dependiendo del volumen
    //console.log(volume);
    if (volume > 0.05) {
      //console.log("Abre");
      setMouthOpen(true); // Boca abierta
    } else {
      //console.log("Cierra");
      setMouthOpen(false); // Boca cerrada
    }
  }, [volume]);
  return (
    <div className="w-full max-w-md flex justify-center items-center mb-6">
      <Image
        src="/images/avatar-placeholder.png"
        alt="Vista previa del personaje"
        width={300}
        height={300}
        priority
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default CharacterPreview;
