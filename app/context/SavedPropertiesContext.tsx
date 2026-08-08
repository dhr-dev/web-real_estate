import React, { createContext, useContext, useEffect, useState } from "react";

interface SavedPropertiesContextType {
  savedIds: string[];
  toggleSave: (propertyId: string) => void;
  isSaved: (propertyId: string) => boolean;
  savedCount: number;
}

const SavedPropertiesContext = createContext<SavedPropertiesContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "haven_saved_properties_v1";

export const SavedPropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to load saved properties from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedIds));
      } catch (e) {
        console.warn("Failed to save properties to localStorage", e);
      }
    }
  }, [savedIds, isInitialized]);

  const toggleSave = (propertyId: string) => {
    setSavedIds((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const isSaved = (propertyId: string) => savedIds.includes(propertyId);

  return (
    <SavedPropertiesContext.Provider
      value={{
        savedIds,
        toggleSave,
        isSaved,
        savedCount: savedIds.length,
      }}
    >
      {children}
    </SavedPropertiesContext.Provider>
  );
};

export function useSavedProperties() {
  const context = useContext(SavedPropertiesContext);
  if (!context) {
    throw new Error("useSavedProperties must be used within a SavedPropertiesProvider");
  }
  return context;
}
