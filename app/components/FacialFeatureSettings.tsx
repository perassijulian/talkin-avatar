"use client";

import { useState } from "react";

type FeatureSettings = {
  top: number; // percent
  left: number; // percent
  scale: number; // 0.1 - 2
  rotate: number; // -180 to 180
  flipX?: boolean;
};

type Props = {
  label: string;
  settings: FeatureSettings;
  onChange: (settings: FeatureSettings) => void;
};

export default function FacialFeatureSettings({
  label,
  settings,
  onChange,
}: Props) {
  const [localSettings, setLocalSettings] = useState(settings);

  const updateField = <K extends keyof FeatureSettings>(
    key: K,
    value: FeatureSettings[K]
  ) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onChange(updated);
  };

  const renderSlider = (
    label: string,
    key: keyof FeatureSettings,
    min: number,
    max: number,
    step: number = 1
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label}: <span className="font-mono">{localSettings[key]}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Number(localSettings[key])}
        onChange={(e) => updateField(key, parseFloat(e.target.value))}
        className="w-full accent-blue-600"
      />
    </div>
  );

  const renderFlipToggle = () => (
    <div className="mb-4">
      <label className="flex items-center space-x-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={!!localSettings.flipX}
          onChange={(e) => updateField("flipX", e.target.checked)}
          className="accent-blue-600"
        />
        <span>Flip Horizontally</span>
      </label>
    </div>
  );

  return (
    <div className="p-4 rounded-xl shadow-md border bg-white w-full max-w-md mb-4">
      <h2 className="text-lg font-semibold mb-4">{label} Settings</h2>

      {renderSlider("Top (%)", "top", 0, 100)}
      {renderSlider("Left (%)", "left", 0, 100)}
      {renderSlider("Scale", "scale", 0.1, 2, 0.01)}
      {renderSlider("Rotate (°)", "rotate", -180, 180, 1)}
      {renderFlipToggle()}
    </div>
  );
}
