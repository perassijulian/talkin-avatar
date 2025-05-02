"use client";

import { useEffect, useRef, useState } from "react";
import Meyda from "meyda";

type Props = {
  onVolumeChange: (vol: number) => void;
};

export default function MicrophoneInput({ onVolumeChange }: Props) {
  const [isListening, setIsListening] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyzerRef = useRef<any>(null);

  const toggleMicrophone = async () => {
    if (isListening) {
      analyzerRef.current?.stop();
      await contextRef.current?.close();
      analyzerRef.current = null;
      contextRef.current = null;
      setIsListening(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      contextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;

      const analyzer = Meyda.createMeydaAnalyzer({
        audioContext,
        source,
        bufferSize: 512,
        featureExtractors: ["rms"],
        callback: ({ rms }: { rms: number }) => {
          onVolumeChange(rms);
        },
      });

      analyzer.start();
      analyzerRef.current = analyzer;
      setIsListening(true);
    }
  };

  return (
    <button
      onClick={toggleMicrophone}
      className={`w-full ${
        isListening
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      } text-white px-4 py-2 rounded-md transition`}
    >
      {isListening ? "Detener Micrófono" : "Usar Micrófono"}
    </button>
  );
}
