import React, { useRef, useState, useEffect } from "react";
import Meyda from "meyda";

type Props = {
  onVolumeChange: (vol: number) => void;
};

export default function AudioUploadPlayer({ onVolumeChange }: Props) {
  // State for volume (RMS) value and uploaded audio source URL
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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
      bufferSize: 512,
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
    <div>
      {/* Upload input */}
      <input
        className="text-black"
        type="file"
        accept="audio/*"
        onChange={handleFile}
      />

      {/* Conditionally render audio player only when audioUrl is set */}
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} controls className="mt-4" />
      )}

      {/* Display volume 
      <p className="text-black mt-2">Volume: {volume.toFixed(6)}</p>
      */}
    </div>
  );
}
