import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../layouts/Layout";
import DashboardCard from "../../components/Card/DashboardCard";
import TransactionTable from "../../components/Tables/TransactionTable";

import authService from "../../services/authService";
import {
  getAccount,
  getTransactions,
} from "../../services/bankingService";

export default function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const currentUser = await authService.getCurrentUser();

      setUser(currentUser);

      const accountData = await getAccount(currentUser.accountId);

      const transactionData = await getTransactions(
        currentUser.accountId
      );

      setAccount(accountData);
      setTransactions(transactionData);

    } catch (err) {

      console.error(err);
      alert("Unable to load dashboard.");

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <Layout>
        <h2 className="text-2xl font-bold">Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>

      <h1 className="text-4xl font-bold mb-8">
        Welcome {user?.name} 👋
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <DashboardCard
          title="Current Balance"
          value={`₹${account?.balance ?? 0}`}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Account Number"
          value={account?.accountNumber}
          color="bg-green-600"
        />

        <DashboardCard
          title="Transactions"
          value={transactions.length}
          color="bg-red-600"
        />

      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">
        Banking Services
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        <button
          onClick={() => navigate("/wallet")}
          className="bg-white shadow rounded-xl p-6 hover:bg-blue-100"
        >
          Wallet
        </button>

        <button
          onClick={() => navigate("/deposit")}
          className="bg-white shadow rounded-xl p-6 hover:bg-blue-100"
        >
          Deposit
        </button>

        <button
          onClick={() => navigate("/withdraw")}
          className="bg-white shadow rounded-xl p-6 hover:bg-blue-100"
        >
          Withdraw
        </button>

        <button
          onClick={() => navigate("/transfer")}
          className="bg-white shadow rounded-xl p-6 hover:bg-blue-100"
        >
          Transfer
        </button>

        <button
          onClick={() => navigate("/transactions")}
          className="bg-white shadow rounded-xl p-6 hover:bg-blue-100"
        >
          Transactions
        </button>

        <button
          onClick={() => navigate("/fraud")}
          className="bg-white shadow rounded-xl p-6 hover:bg-blue-100"
        >
          AI Fraud Detection
        </button>

        <button
          onClick={() => navigate("/notifications")}
          className="bg-white shadow rounded-xl p-6 hover:bg-blue-100"
        >
          Notifications
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="bg-white shadow rounded-xl p-6 hover:bg-blue-100"
        >
          Profile
        </button>

      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">
        Recent Transactions
      </h2>

      <TransactionTable transactions={transactions} />

    </Layout>
  );
}