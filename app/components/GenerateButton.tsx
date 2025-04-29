"use client";

import { ButtonHTMLAttributes } from "react";

type GenerateButtonProps = {
  isLoading?: boolean;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const GenerateButton = ({
  isLoading = false,
  onClick,
  ...rest
}: GenerateButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md transition
        hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
      {...rest}
    >
      {isLoading ? "Generando..." : "Generar Avatar"}
    </button>
  );
};

export default GenerateButton;
