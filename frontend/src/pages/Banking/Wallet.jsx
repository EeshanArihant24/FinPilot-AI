import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { getAccount } from "../../services/bankingService";

export default function Wallet() {
  const navigate = useNavigate();

  const ACCOUNT_ID = 1; // Temporary until Login/JWT

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const data = await getAccount(ACCOUNT_ID);
      setAccount(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load wallet.");
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
      <h1 className="text-3xl font-bold mb-8">
        My Wallet
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg">

        <div className="mb-6">
          <h2 className="text-gray-500">Account Holder</h2>
          <p className="text-xl font-semibold">
            {account?.name}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-gray-500">Email</h2>
          <p>{account?.email}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-gray-500">Phone</h2>
          <p>{account?.phone}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-gray-500">Account ID</h2>
          <p>{account?.id}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-gray-500">Current Balance</h2>
          <p className="text-4xl font-bold text-blue-600">
            ${account?.balance ?? 0}
          </p>
        </div>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/deposit")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Deposit
          </button>

          <button
            onClick={() => navigate("/withdraw")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Withdraw
          </button>

          <button
            onClick={() => navigate("/transfer")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Transfer
          </button>

        </div>
      </div>
    </Layout>
  );
}