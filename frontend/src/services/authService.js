import api from "./api";

const authService = {

    register: async (userData) => {
        const response = await api.post("/auth/register", userData);

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post("/auth/login", {
            email,
            password,
        });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get("/auth/me");
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("token");
    },

    isLoggedIn: () => {
        return localStorage.getItem("token") !== null;
    },

    getToken: () => {
        return localStorage.getItem("token");
    },
};

export default authService;