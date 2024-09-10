import { createContext, useCallback, useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "clipboards-Wd2jF7n";

export type Clipboard = {
  id: string;
  content: string;
};

export type AppContextValue = {
  clipboards: Clipboard[];
  addClipboard: (clipboardText: string) => void;
  removeClipboard: (clipboardId: string) => void;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export type AppProviderProps = {
  children: JSX.Element;
};

export function AppProvider(props: AppProviderProps): JSX.Element {
  const { children } = props;

  const [clipboards, setClipboards] = useState<Clipboard[]>([]);

  useEffect(() => {
    const clipboards = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (clipboards) {
      setClipboards(JSON.parse(clipboards));
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    }
  }, []);

  const addClipboard = useCallback((clipboardText: string) => {
    const clipboard: Clipboard = {
      id: Date.now().toString(),
      content: clipboardText,
    };
    setClipboards((clipboards) => {
      const updated = [...clipboards, clipboard];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeClipboard = useCallback((clipboardId: string) => {
    setClipboards((clipboards) => {
      const updated = clipboards.filter((c) => c.id !== clipboardId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        clipboards,
        addClipboard,
        removeClipboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
