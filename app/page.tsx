"use client";

import { useState, useEffect } from "react";
import CharacterPreview from "./components/CharacterPreview";
import GenerateButton from "./components/GenerateButton";
import AudioUploadPlayer from "./components/AudioUploadPlayer";

export default function HomePage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [volume, setVolume] = useState<number>(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioURL(url);
    }
  };

  useEffect(() => {
    return () => {
      // Revoke object URL on unmount
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume); // Actualiza el volumen (rango 0.0 - 1.0)
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#f0f4ff]">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Talking Avatar - Crea tu personaje que habla
      </h1>

      <CharacterPreview volume={volume} />

      <AudioUploadPlayer />

      <GenerateButton onClick={() => alert("Generando Avatar...")} />
      {/**<GenerateButton audioFile={audioFile} />**/}
    </main>
  );
}
