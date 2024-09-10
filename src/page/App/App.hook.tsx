import { useContext } from "react";
import { AppContext, AppContextValue } from "./App.provider";

export function useApp(): AppContextValue {
  const appContextValue = useContext(AppContext);
  if (appContextValue === undefined) {
    throw new Error("appContextValue is empty!");
  }

  return appContextValue;
}
