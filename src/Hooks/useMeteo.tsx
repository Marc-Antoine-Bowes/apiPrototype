// useLangage.tsx
import { MeteoContext } from "@/contexts/MeteoContext";
import { useContext } from "react";

export const useMeteo = () => {
  const value = useContext(MeteoContext);

  if (!value) {
    throw new Error(
      "useMeteo doit être contenu dans un MeteoContextProvider"
    );
  }

  return value;
};
