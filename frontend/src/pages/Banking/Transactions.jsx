import { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import { getTransactions } from "../../services/bankingService";

export default function Transactions() {
  const ACCOUNT_ID = 1; // Temporary until JWT Login

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions(ACCOUNT_ID);
      setTransactions(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load transactions.");
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
      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Transaction History
        </h1>

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Description</th>
                <th className="p-4">Date</th>
              </tr>

            </thead>

            <tbody>

              {transactions.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6"
                  >
                    No transactions found.
                  </td>
                </tr>

              ) : (

                transactions.map((transaction) => (

                  <tr
                    key={transaction.id}
                    className="border-b text-center hover:bg-gray-100"
                  >
                    <td className="p-4">
                      {transaction.id}
                    </td>

                    <td className="p-4">
                      {transaction.type}
                    </td>

                    <td className="p-4 font-semibold">
                      ${transaction.amount}
                    </td>

                    <td className="p-4">
                      {transaction.description}
                    </td>

                    <td className="p-4">
                      {transaction.transactionDate}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </Layout>
  );
}