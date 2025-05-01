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
    <div className="mt-4">
      <button
        onClick={toggleMicrophone}
        className={`px-4 py-2 text-white rounded ${
          isListening ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isListening ? "Detener Micrófono" : "Activar Micrófono"}
      </button>
    </div>
  );
}
