"use client";

import { useState } from "react";
import CharacterPreview from "./components/CharacterPreview";
import AudioUploadPlayer from "./components/AudioUploadPlayer";
import MicrophoneInput from "./components/MicrophoneInput";
import FacialFeatureSettings from "./components/FacialFeatureSettings";
import { Settings } from "lucide-react";

export default function HomePage() {
  const [volume, setVolume] = useState<number>(0);
  const [eyesSettings, setEyesSettings] = useState({
    top: 39,
    left: 24,
    scale: 0.95,
    rotate: 0,
  });
  const [mouthSettings, setMouthSettings] = useState({
    top: 51,
    left: 25,
    scale: 0.75,
    rotate: 0,
  });

  const [showSettings, setShowSettings] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-10 text-center relative">
        Talking Avatar
      </h1>

      <CharacterPreview
        eyesSettings={eyesSettings}
        mouthSettings={mouthSettings}
        volume={volume}
      />
      <div className="flex gap-6 mb-2 md:hidden absolute bottom-0">
        <AudioUploadPlayer onVolumeChange={setVolume} />
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-3 rounded-full bg-white text-gray-700 shadow-md hover:shadow-lg active:scale-95 transition"
        >
          <Settings className="text-gray-700" />
        </button>
        <MicrophoneInput mobile={true} onVolumeChange={setVolume} />
      </div>
      {showSettings && (
        <div className="flex gap-6 mb-2 md:hidden absolute top-10">
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
      )}

      <div className="hidden md:block">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Sube un audio
            </h2>
            <AudioUploadPlayer
              children="Subir Audio"
              onVolumeChange={setVolume}
            />
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
      </div>
    </main>
  );
}
