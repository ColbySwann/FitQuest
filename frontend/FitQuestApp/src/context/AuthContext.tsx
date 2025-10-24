import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }:{children: any}) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage on page reload
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUser({ username: storedUsername });
        }
    }, []);

    // Login (store username and persist)
    const login = (username:any) => {
        localStorage.setItem("username", username);
        setUser({ username });
    };

    // Logout (clear all related keys)
    const logout = () => {
        localStorage.removeItem("username");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for accessing AuthContext
export const useAuth = () => useContext(AuthContext);
