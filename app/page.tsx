"use client";

import { useState, useEffect } from "react";
import CharacterPreview from "./components/CharacterPreview";
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

      <div className="w-full max-w-md flex gap-4 items-start">
        <div className="w-3/4 min-h-[110px] flex items-start">
          <AudioUploadPlayer onVolumeChange={setVolume} />
        </div>
        <div className="w-1/4 min-h-[110px] flex items-start">
          <MicrophoneInput onVolumeChange={setVolume} />
        </div>
      </div>
    </main>
  );
}
