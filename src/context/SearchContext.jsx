/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo } from "react";

const SearchContext = createContext(undefined);

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const value = useMemo(() => ({ searchTerm, setSearchTerm }), [searchTerm]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return ctx;
}
