import {
  FaHome,
  FaWallet,
  FaMoneyCheckAlt,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaHistory,
  FaRobot,
  FaBell,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/", icon: <FaHome /> },
  { name: "Wallet", path: "/wallet", icon: <FaWallet /> },
  { name: "Deposit", path: "/deposit", icon: <FaMoneyBillWave /> },
  { name: "Withdraw", path: "/withdraw", icon: <FaMoneyCheckAlt /> },
  { name: "Transfer", path: "/transfer", icon: <FaExchangeAlt /> },
  { name: "Transactions", path: "/transactions", icon: <FaHistory /> },
  { name: "AI Services", path: "/fraud", icon: <FaRobot /> },
  { name: "Notifications", path: "/notifications", icon: <FaBell /> },
  { name: "Profile", path: "/profile", icon: <FaUser /> },
];

export default function Sidebar() {
  return (
    <aside className="bg-slate-900 text-white w-64 min-h-screen flex flex-col">

      <div className="text-center py-6 text-3xl font-bold border-b border-slate-700">
        FinPilot AI
      </div>

      <div className="flex-1 mt-4">

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-4 transition hover:bg-blue-600 ${
                isActive ? "bg-blue-600" : ""
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

      </div>

      <button
        className="m-4 bg-red-600 hover:bg-red-700 rounded-lg py-3 flex justify-center items-center gap-2"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}