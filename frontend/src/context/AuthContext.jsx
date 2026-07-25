import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        try {

            if (!authService.isLoggedIn()) {
                setUser(null);
                return;
            }

            const currentUser = await authService.getCurrentUser();

            setUser(currentUser);

        } catch (err) {

            console.error(err);
            authService.logout();
            setUser(null);

        } finally {

            setLoading(false);

        }

    };

    const login = async (email, password) => {

        await authService.login(email, password);

        const currentUser = await authService.getCurrentUser();

        setUser(currentUser);

    };

    const logout = () => {

        authService.logout();

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export const useAuthContext = () => useContext(AuthContext);