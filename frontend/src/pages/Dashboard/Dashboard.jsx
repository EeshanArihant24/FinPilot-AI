import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import DashboardCard from "../../components/Card/DashboardCard";
import TransactionTable from "../../components/Tables/TransactionTable";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout>

      <h1 className="text-4xl font-bold mb-8">
        Welcome to FinPilot AI 👋
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <DashboardCard
          title="Balance"
          value="$12,500"
          color="bg-blue-600"
        />

        <DashboardCard
          title="Income"
          value="$3,100"
          color="bg-green-600"
        />

        <DashboardCard
          title="Expense"
          value="$850"
          color="bg-red-600"
        />

      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">
        Banking Services
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        <button onClick={() => navigate("/wallet")} className="bg-white shadow rounded-xl p-6 hover:bg-blue-100">
          Wallet
        </button>

        <button onClick={() => navigate("/deposit")} className="bg-white shadow rounded-xl p-6 hover:bg-blue-100">
          Deposit
        </button>

        <button onClick={() => navigate("/withdraw")} className="bg-white shadow rounded-xl p-6 hover:bg-blue-100">
          Withdraw
        </button>

        <button onClick={() => navigate("/transfer")} className="bg-white shadow rounded-xl p-6 hover:bg-blue-100">
          Transfer
        </button>

        <button onClick={() => navigate("/transactions")} className="bg-white shadow rounded-xl p-6 hover:bg-blue-100">
          Transactions
        </button>

        <button onClick={() => navigate("/fraud")} className="bg-white shadow rounded-xl p-6 hover:bg-blue-100">
          AI Fraud Detection
        </button>

        <button onClick={() => navigate("/notifications")} className="bg-white shadow rounded-xl p-6 hover:bg-blue-100">
          Notifications
        </button>

        <button onClick={() => navigate("/profile")} className="bg-white shadow rounded-xl p-6 hover:bg-blue-100">
          Profile
        </button>

      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">
        Recent Transactions
      </h2>

      <TransactionTable />

    </Layout>
  );
}