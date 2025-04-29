import React, { useRef, useState } from "react";
import Meyda from "meyda";

const AudioUploadPlayer = () => {
  const [volume, setVolume] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyzerRef = useRef<any>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const audio = new Audio(objectUrl);
    audio.crossOrigin = "anonymous";
    audio.controls = true;
    document.body.appendChild(audio); // or render it properly in JSX

    audioRef.current = audio;

    const audioContext = new AudioContext();
    contextRef.current = audioContext;

    const source = audioContext.createMediaElementSource(audio);
    sourceRef.current = source;

    source.connect(audioContext.destination);

    if (typeof Meyda === "undefined") {
      console.log("Meyda not loaded");
      return;
    }

    analyzerRef.current = Meyda.createMeydaAnalyzer({
      audioContext,
      source,
      bufferSize: 512,
      featureExtractors: ["rms"],
      callback: ({ rms }: { rms: number }) => {
        setVolume(rms);
        console.log("Volume (rms):", rms);
      },
    });

    analyzerRef.current.start();
    audio.play();
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFile} />
      <p>Volume: {volume.toFixed(6)}</p>
    </div>
  );
};

export default AudioUploadPlayer;
