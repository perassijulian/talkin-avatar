"use client";

import { useState } from "react";
import CharacterPreview from "./components/CharacterPreview";
import AudioUploadPlayer from "./components/AudioUploadPlayer";
import MicrophoneInput from "./components/MicrophoneInput";
import FacialFeatureSettings from "./components/FacialFeatureSettings";

export default function HomePage() {
  const [volume, setVolume] = useState<number>(0);
  const [eyesSettings, setEyesSettings] = useState({
    top: 15,
    left: 44,
    scale: 0.86,
    rotate: 0,
  });
  const [mouthSettings, setMouthSettings] = useState({
    top: 25,
    left: 47,
    scale: 0.8,
    rotate: -8,
  });

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-10 text-center">
        Talking Avatar
      </h1>

      <CharacterPreview
        eyesSettings={eyesSettings}
        mouthSettings={mouthSettings}
        volume={volume}
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Sube un audio
          </h2>
          <AudioUploadPlayer onVolumeChange={setVolume} />
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Usa tu micrófono
          </h2>
          <MicrophoneInput onVolumeChange={setVolume} />
        </div>
        <FacialFeatureSettings
          label="Eyes"
          settings={eyesSettings}
          onChange={(newSettings) => setEyesSettings(newSettings)}
        />
        <FacialFeatureSettings
          label="Mouth"
          settings={mouthSettings}
          onChange={(newSettings) => setMouthSettings(newSettings)}
        />
      </div>
    </main>
  );
}
