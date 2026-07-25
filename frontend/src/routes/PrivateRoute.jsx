import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-xl font-semibold">

          Loading...

        </div>

      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}