import React, { createContext, useContext } from 'react'
import * as Google from "expo-google-app-auth"

const AuthContext = createContext({
    // initial state of context
})

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{
            user: "Kai",
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}

/*export const useAuth = () => useContext(AuthContext);

export default AuthContext; // Exporting the context itself
*/