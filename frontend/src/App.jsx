import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import AppRoutes from "./routes/AppRoutes";


export default function App() {
  return <AppRoutes />;
}