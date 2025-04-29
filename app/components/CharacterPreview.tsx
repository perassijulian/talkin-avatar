"use client";

import Image from "next/image";

const CharacterPreview = () => {
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
