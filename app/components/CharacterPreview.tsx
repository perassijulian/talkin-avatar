"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Eyes from "./Eyes";
import Mouth from "./Mouth";

type Props = {
  volume: number;
  eyesSettings: {
    top: number; // percent
    left: number; // percent
    scale: number; // 0.1 - 2
    rotate: number; // -180 to 180
    flipX?: boolean; // optional
  };
  mouthSettings: {
    top: number; // percent
    left: number; // percent
    scale: number; // 0.1 - 2
    rotate: number; // -180 to 180
    flipX?: boolean; // optional
  };
};

const CharacterPreview = ({ volume, eyesSettings, mouthSettings }: Props) => {
  const BLINK_INTERVAL = 200;
  const OPEN_INTERVAL = 2000;
  const NORMAL_BLINK_THRESHOLD = 4;

  const {
    top: eyesTop,
    left: eyesLeft,
    scale: eyesScale,
    rotate: eyesRotate,
    flipX: eyesFlipX,
  } = eyesSettings;
  const {
    top: mouthTop,
    left: mouthLeft,
    scale: mouthScale,
    rotate: mouthRotate,
    flipX: mouthFlipX,
  } = mouthSettings;

  const eyesStateRef = useRef<"open" | "closed" | "side">("open");
  const [eyesState, setEyesState] = useState<"open" | "closed" | "side">(
    "open"
  );

  useEffect(() => {
    let blinkCount = 0;
    let timeout: NodeJS.Timeout;

    const blinkSequence = () => {
      if (blinkCount < NORMAL_BLINK_THRESHOLD) {
        // Regular blink
        eyesStateRef.current = "closed";
        setEyesState("closed");

        timeout = setTimeout(() => {
          eyesStateRef.current = "open";
          setEyesState("open");

          timeout = setTimeout(() => {
            blinkCount++;
            blinkSequence(); // next blink
          }, OPEN_INTERVAL); // time open
        }, BLINK_INTERVAL); // time closed
      } else {
        // Special blink: closed → side → open
        eyesStateRef.current = "closed";
        setEyesState("closed");

        timeout = setTimeout(() => {
          eyesStateRef.current = "side";
          setEyesState("side");

          timeout = setTimeout(() => {
            eyesStateRef.current = "open";
            setEyesState("open");

            blinkCount = 0; // reset
            timeout = setTimeout(() => {
              blinkSequence(); // restart full cycle
            }, OPEN_INTERVAL); // wait while open
          }, OPEN_INTERVAL); // side duration
        }, BLINK_INTERVAL); // closed before side
      }
    };

    blinkSequence(); // start loop

    return () => clearTimeout(timeout); // cleanup
  }, []);

  const getMouthState = () => {
    if (volume > 0.1) return "wide";
    if (volume > 0.05) return "medium";
    if (volume > 0.01) return "small";
    return "closed";
  };

  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] relative mb-6">
      <Image
        src="/images/placeholder.png"
        alt="Vista previa del personaje"
        fill
        priority
        className="rounded-lg shadow-lg object-cover"
      />

      {/* OJOS */}
      {/* CONTROLAR POSICION DESDE LA UI */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{
          top: `${eyesTop}%`,
          left: `${eyesLeft}%`,
          transform: `
            scale(${!eyesFlipX ? "-" : ""}${eyesScale}, ${eyesScale})
            rotate(${eyesRotate}deg)
          `,
        }}
      >
        <Eyes state={eyesState} />
      </div>

      {/* BOCA */}
      {/* CONTROLAR POSICION DESDE LA UI */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{
          top: `${mouthTop}%`,
          left: `${mouthLeft}%`,
          transform: `
            scale(${!mouthFlipX ? "-" : ""}${mouthScale}, ${mouthScale})
            rotate(${mouthRotate}deg)
          `,
        }}
      >
        <Mouth state={getMouthState()} />
      </div>
    </div>
  );
};

export default CharacterPreview;
