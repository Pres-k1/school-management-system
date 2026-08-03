import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Admin User",
    role: "Administrator",
    initials: "AU",
    avatarUrl: null,
  });

  function updateAvatar(dataUrl) {
    setUser((prev) => ({ ...prev, avatarUrl: dataUrl }));
  }

  const value = { user, updateAvatar };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}

export default UserContext;
