"use client";

import { useEffect, useRef, useState } from "react";
import Meyda from "meyda";
import { Mic, MicOff } from "lucide-react";

type Props = {
  onVolumeChange: (vol: number) => void;
  mobile?: boolean;
};

export default function MicrophoneInput({ onVolumeChange, mobile }: Props) {
  const [isListening, setIsListening] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyzerRef = useRef<any>(null);

  // Cleanup function to stop the analyzer and close the audio context
  useEffect(() => {
    return () => {
      if (analyzerRef.current) {
        analyzerRef.current.stop();
      }
      contextRef.current?.close();
    };
  }, []);

  const toggleMicrophone = async () => {
    if (isListening) {
      analyzerRef.current?.stop();
      await contextRef.current?.close();
      analyzerRef.current = null;
      contextRef.current = null;
      setIsListening(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
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
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert(
          "No se pudo acceder al micrófono. Asegúrate de que esté conectado y permitido."
        );
      }
    }
  };

  return (
    <button
      onClick={toggleMicrophone}
      className={`w-full text-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition font-medium ${
        isListening
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {mobile ? (
        isListening ? (
          <MicOff />
        ) : (
          <Mic />
        )
      ) : (
        <>{isListening ? "Detener Micrófono" : "Usar Micrófono"}</>
      )}
    </button>
  );
}
