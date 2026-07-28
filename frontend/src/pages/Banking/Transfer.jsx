import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { transferMoney } from "../../services/bankingService";
import authService from "../../services/authService";

export default function Transfer() {
  const navigate = useNavigate();

  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!receiverId || !amount) {
      setError("Please fill all fields.");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const user = (await authService.getCurrentUser()).data;

      await transferMoney({
        fromAccountId: user.accountId,
        toAccountId: Number(receiverId),
        amount: Number(amount),
        description,
      });

      setMessage("Transfer completed successfully.");

      setReceiverId("");
      setAmount("");
      setDescription("");

      setTimeout(() => {
        navigate("/wallet");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Transfer failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Transfer Money
        </h1>

        <form onSubmit={handleTransfer}>

          <input
            type="number"
            placeholder="Receiver Account ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="border w-full p-3 rounded-lg mb-5"
            required
          />

          <input
            type="number"
            placeholder="Amount"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Transfer"}
          </button>

        </form>

      </div>
    </Layout>
  );
}