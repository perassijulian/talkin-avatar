"use client";

import { useState, useEffect } from "react";
import CharacterPreview from "./components/CharacterPreview";
import GenerateButton from "./components/GenerateButton";
import AudioUploadPlayer from "./components/AudioUploadPlayer";
import MicrophoneInput from "./components/MicrophoneInput";

export default function HomePage() {
  const [volume, setVolume] = useState<number>(0);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#f0f4ff]">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Talking Avatar - Crea tu personaje que habla
      </h1>

      <CharacterPreview volume={volume} />

      <MicrophoneInput onVolumeChange={(vol) => setVolume(vol)} />

      <AudioUploadPlayer onVolumeChange={(vol) => setVolume(vol)} />

      <GenerateButton onClick={() => alert("Generando Avatar...")} />
      {/**<GenerateButton audioFile={audioFile} />**/}
    </main>
  );
}
