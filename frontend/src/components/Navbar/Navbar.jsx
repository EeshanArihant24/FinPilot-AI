import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold text-gray-700">
          Dashboard
        </h1>
      </div>

      <div className="flex gap-6 items-center">

        <FaBell className="text-xl cursor-pointer" />

        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl" />
          <span>Welcome User</span>
        </div>

      </div>

    </nav>
  );
}