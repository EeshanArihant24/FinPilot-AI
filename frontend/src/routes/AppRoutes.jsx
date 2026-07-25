import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Wallet from "../pages/Banking/Wallet";
import Transfer from "../pages/Banking/Transfer";
import Transactions from "../pages/Banking/Transactions";
import FraudDetection from "../pages/AI/FraudDetection";
import PredictionHistory from "../pages/AI/PredictionHistory";

import Login from "../pages/login/Login";
import Register from "../pages/login/Register";

import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/"
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
                    path="/fraud"
                    element={
                        <PrivateRoute>
                            <FraudDetection />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <PrivateRoute>
                            <PredictionHistory />
                        </PrivateRoute>
                    }

                    
                />

                <Route
  path="/"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>

            </Routes>

        </BrowserRouter>

    );

}