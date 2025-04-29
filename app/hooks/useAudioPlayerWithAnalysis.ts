import { useEffect, useRef } from "react";
import Meyda from "meyda";

export const useAudioPlayerWithAnalysis = (
  audioElement: HTMLAudioElement | null,
  onVolumeChange: (v: number) => void
) => {
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyzerRef = useRef<any>(null);

  useEffect(() => {
    if (!audioElement) return;

    const context = new AudioContext();
    const source = context.createMediaElementSource(audioElement);

    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext: context,
      source,
      bufferSize: 512,
      featureExtractors: ["rms"],
      callback: ({ rms }: any) => {
        onVolumeChange(rms ?? 0);
        console.log(rms);
      },
    });

    contextRef.current = context;
    sourceRef.current = source;
    analyzerRef.current = analyzer;

    const resumeContext = async () => {
      if (context.state === "suspended") {
        await context.resume();
      }
      analyzer.start();
    };

    audioElement.addEventListener("play", resumeContext);
    audioElement.addEventListener("pause", () => analyzer.stop());
    audioElement.addEventListener("ended", () => analyzer.stop());

    return () => {
      analyzer.stop();
      context.close();
    };
  }, [audioElement, onVolumeChange]);
};
