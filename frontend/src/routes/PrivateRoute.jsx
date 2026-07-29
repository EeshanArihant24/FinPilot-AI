import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {

        return (
            <div className="flex h-screen items-center justify-center">

                <h1 className="text-2xl font-bold">
                    Loading...
                </h1>

            </div>
        );
    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    return children;

}