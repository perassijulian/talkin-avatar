import React, { useRef, useState, useEffect } from "react";
import Meyda from "meyda";
import { CloudUpload } from "lucide-react";

type Props = {
  onVolumeChange: (vol: number) => void;
  children?: React.ReactNode;
};

export default function AudioUploadPlayer({ onVolumeChange, children }: Props) {
  // Buffer size for Meyda analyzer
  const BUFFERSIZE = 512;
  // State for volume (RMS) value and uploaded audio source URL
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Refs to Web Audio API and Meyda analyzer
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyzerRef = useRef<any>(null);

  /**
   * Handle audio file upload.
   * Creates audio context, connects Meyda analyzer, and starts playback.
   */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke any previous object URL to avoid memory leaks
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    // Create new object URL and update state
    const objectUrl = URL.createObjectURL(file);
    setAudioUrl(objectUrl);
  };

  /**
   * Set up Meyda analyzer when audio element and audioUrl are available.
   */
  useEffect(() => {
    // Clean up any existing audio context and analyzer before creating a new one
    const cleanup = async () => {
      if (analyzerRef.current) {
        analyzerRef.current.stop();
        analyzerRef.current = null;
      }
      if (contextRef.current) {
        await contextRef.current.close();
        contextRef.current = null;
      }
    };

    if (!audioRef.current || !audioUrl) return;

    // Set up Web Audio context
    const audioContext = new AudioContext();
    contextRef.current = audioContext;

    const audio = audioRef.current;
    audio.crossOrigin = "anonymous"; // Required for Web Audio API
    const source = audioContext.createMediaElementSource(audio);
    sourceRef.current = source;

    source.connect(audioContext.destination);

    // Ensure Meyda is loaded
    if (typeof Meyda === "undefined") {
      console.error("Meyda not loaded");
      return;
    }

    // Create analyzer
    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext,
      source,
      bufferSize: BUFFERSIZE,
      featureExtractors: ["rms"],
      callback: ({ rms }: { rms: number }) => {
        onVolumeChange(rms);
      },
    });

    analyzerRef.current = analyzer;

    // Resume context and start analyzer when audio starts playing
    const handlePlay = async () => {
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
      analyzer.start();
    };

    const handlePauseOrEnd = () => {
      analyzer.stop();
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePauseOrEnd);
    audio.addEventListener("ended", handlePauseOrEnd);

    // Cleanup when component unmounts or audio changes
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePauseOrEnd);
      audio.removeEventListener("ended", handlePauseOrEnd);
      cleanup();
    };
  }, [audioUrl]);

  return (
    <div className="w-full max-w-md space-y-4">
      <input
        type="file"
        accept="audio/*"
        ref={inputRef}
        onChange={handleFile}
        className="hidden"
      />
      {!audioUrl ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
        >
          {children ? children : <CloudUpload />}
        </button>
      ) : (
        <div className="overflow-hidden">
          <audio
            ref={audioRef}
            src={audioUrl}
            controls
            className="w-full h-12"
          />
        </div>
      )}
    </div>
  );
}
