import { FaWallet, FaExchangeAlt, FaShieldAlt } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        FinPilot AI Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <FaWallet className="text-4xl text-blue-600 mb-3"/>
          <h2 className="text-xl font-semibold">Wallet</h2>
          <p className="text-3xl mt-3">$12,450</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <FaExchangeAlt className="text-4xl text-green-600 mb-3"/>
          <h2 className="text-xl font-semibold">Transactions</h2>
          <p className="text-3xl mt-3">152</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <FaShieldAlt className="text-4xl text-red-600 mb-3"/>
          <h2 className="text-xl font-semibold">Fraud Alerts</h2>
          <p className="text-3xl mt-3">2</p>
        </div>

      </div>

    </div>
  );
}