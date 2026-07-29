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

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [account, setAccount] = useState(null);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const userResponse = await authService.getCurrentUser();

      const currentUser = userResponse.data;

      setUser(currentUser);

      if (!currentUser.accountId) {

        setLoading(false);
        return;

      }

      const accountResponse = await getAccount(
        currentUser.accountId
      );

      setAccount(accountResponse.data);

      const transactionResponse = await getTransactions(
        currentUser.accountId
      );

      setTransactions(transactionResponse.data);

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

        <div className="flex h-[60vh] items-center justify-center">

          <h2 className="text-3xl font-bold">

            Loading Dashboard...

          </h2>

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <h1 className="mb-8 text-4xl font-bold">

        Welcome {user?.name || "User"} 👋

      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        <DashboardCard
          title="Current Balance"
          value={`₹${account?.balance ?? 0}`}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Account Number"
          value={account?.accountNumber || "N/A"}
          color="bg-green-600"
        />

        <DashboardCard
          title="Transactions"
          value={transactions.length}
          color="bg-red-600"
        />

      </div>

      <h2 className="mt-12 mb-6 text-3xl font-bold">

        Banking Services

      </h2>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">

        <button
          onClick={() => navigate("/wallet")}
          className="rounded-xl bg-white p-6 shadow hover:bg-blue-100"
        >
          💰 Wallet
        </button>

        <button
          onClick={() => navigate("/deposit")}
          className="rounded-xl bg-white p-6 shadow hover:bg-blue-100"
        >
          ➕ Deposit
        </button>

        <button
          onClick={() => navigate("/withdraw")}
          className="rounded-xl bg-white p-6 shadow hover:bg-blue-100"
        >
          ➖ Withdraw
        </button>

        <button
          onClick={() => navigate("/transfer")}
          className="rounded-xl bg-white p-6 shadow hover:bg-blue-100"
        >
          🔄 Transfer
        </button>

        <button
          onClick={() => navigate("/transactions")}
          className="rounded-xl bg-white p-6 shadow hover:bg-blue-100"
        >
          📜 Transactions
        </button>

        <button
          onClick={() => navigate("/savings")}
          className="rounded-xl bg-white p-6 shadow hover:bg-blue-100"
        >
          🏦 Savings
        </button>

        <button
          onClick={() => navigate("/fd")}
          className="rounded-xl bg-white p-6 shadow hover:bg-blue-100"
        >
          📈 Fixed Deposits
        </button>

        <button
          onClick={() => navigate("/mutual-funds")}
          className="rounded-xl bg-white p-6 shadow hover:bg-blue-100"
        >
          📊 Mutual Funds
        </button>

        <button
          onClick={() => navigate("/fraud")}
          className="rounded-xl bg-white p-6 shadow hover:bg-blue-100"
        >
          🤖 AI Fraud Detection
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="rounded-xl bg-white p-6 shadow hover:bg-blue-100"
        >
          👤 Profile
        </button>

      </div>

      <h2 className="mt-12 mb-6 text-3xl font-bold">

        Recent Transactions

      </h2>

      <TransactionTable
        transactions={transactions}
      />

    </Layout>

  );

}