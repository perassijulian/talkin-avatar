"use client";

import { useState, useEffect } from "react";
import CharacterPreview from "./components/CharacterPreview";
import GenerateButton from "./components/GenerateButton";
import AudioUploadPlayer from "./components/AudioUploadPlayer";

export default function HomePage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [volume, setVolume] = useState<number>(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#f0f4ff]">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Talking Avatar - Crea tu personaje que habla
      </h1>

      <CharacterPreview />

      <AudioUploadPlayer />

      <GenerateButton onClick={() => alert("Generando Avatar...")} />
      {/**<GenerateButton audioFile={audioFile} />**/}
    </main>
  );
}
