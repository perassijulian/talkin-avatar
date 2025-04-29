import { useState } from "react";

type GenerateResponse = {
  success: boolean;
  data?: any; // Ajustá este tipo según la estructura de tu respuesta
  error?: string;
};

export const useGenerate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null); // Podés tiparlo mejor cuando sepas qué devuelve

  const generate = async (payload: Record<string, any>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: GenerateResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Error desconocido");
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message || "Error al generar");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    isLoading,
    error,
    result,
  };
};
