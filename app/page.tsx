"use client";

import { useState } from "react";
import CharacterPreview from "./components/CharacterPreview";
import GenerateButton from "./components/GenerateButton";

export default function HomePage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setAudioFile(file);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#f0f4ff]">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Talking Avatar - Crea tu personaje que habla
      </h1>

      <CharacterPreview />

      <input
        type="file"
        accept="audio/*"
        onChange={handleAudioUpload}
        className="my-4"
      />

      {/**<GenerateButton audioFile={audioFile} />**/}
    </main>
  );
}
