import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

// Authentication
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";

// Banking
import Wallet from "../pages/Banking/Wallet";
import Deposit from "../pages/Banking/Deposit";
import Withdraw from "../pages/Banking/Withdraw";
import Transfer from "../pages/Banking/Transfer";
import Transactions from "../pages/Banking/Transactions";
import Savings from "../pages/Banking/Savings";
import FD from "../pages/Banking/FD";
import MutualFunds from "../pages/Banking/MutualFunds";

// AI
import FraudDetection from "../pages/AI/FraudDetection";

// Profile
import Profile from "../pages/Profile/Profile";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Private Routes */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/wallet"
        element={
          <PrivateRoute>
            <Wallet />
          </PrivateRoute>
        }
      />

      <Route
        path="/deposit"
        element={
          <PrivateRoute>
            <Deposit />
          </PrivateRoute>
        }
      />

      <Route
        path="/withdraw"
        element={
          <PrivateRoute>
            <Withdraw />
          </PrivateRoute>
        }
      />

      <Route
        path="/transfer"
        element={
          <PrivateRoute>
            <Transfer />
          </PrivateRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        }
      />

      <Route
        path="/savings"
        element={
          <PrivateRoute>
            <Savings />
          </PrivateRoute>
        }
      />

      <Route
        path="/fd"
        element={
          <PrivateRoute>
            <FD />
          </PrivateRoute>
        }
      />

      <Route
        path="/mutual-funds"
        element={
          <PrivateRoute>
            <MutualFunds />
          </PrivateRoute>
        }
      />

      <Route
        path="/fraud"
        element={
          <PrivateRoute>
            <FraudDetection />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* Redirects */}

      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
}