import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { depositMoney } from "../../services/bankingService";
import authService from "../../services/authService";

export default function Deposit() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const user = await authService.getCurrentUser();

      await depositMoney({
        accountId: user.accountId,
        amount: Number(amount),
        description,
      });

      setMessage("Deposit completed successfully.");

      setAmount("");
      setDescription("");

      setTimeout(() => {
        navigate("/wallet");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to complete deposit."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Deposit Money
        </h1>

        <form onSubmit={handleDeposit}>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border w-full p-3 rounded-lg mb-5"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border w-full p-3 rounded-lg mb-5"
            rows="4"
          />

          {error && (
            <p className="text-red-600 mb-4">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-600 mb-4">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Deposit"}
          </button>

        </form>

      </div>
    </Layout>
  );
}