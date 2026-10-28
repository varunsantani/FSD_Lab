import { createContext } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const user = {
    name: "Varun",
    role: "Customer",
    cartItems: 2,
  };

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
