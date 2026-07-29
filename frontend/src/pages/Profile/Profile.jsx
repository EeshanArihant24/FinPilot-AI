import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Layout from "../../layouts/Layout";
import authService from "../../services/authService";
import { getAccount } from "../../services/bankingService";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userResponse = await authService.getCurrentUser();
      const currentUser = userResponse.data;

      setUser(currentUser);

      if (currentUser.accountId) {
        const accountResponse = await getAccount(currentUser.accountId);
        setAccount(accountResponse.data);
      }
    } catch (err) {
      console.error(err);
      alert("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex flex-col items-center">

          <FaUserCircle
            size={120}
            className="text-blue-600"
          />

          <h1 className="text-3xl font-bold mt-4">
            {user?.name}
          </h1>

          <p className="text-gray-500">
            FinPilot AI User
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div>
            <label className="font-semibold">Email</label>
            <input
              readOnly
              value={user?.email || ""}
              className="border w-full rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Account Number</label>
            <input
              readOnly
              value={account?.accountNumber || ""}
              className="border w-full rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Balance</label>
            <input
              readOnly
              value={`₹${account?.balance ?? 0}`}
              className="border w-full rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Account ID</label>
            <input
              readOnly
              value={account?.id || ""}
              className="border w-full rounded-lg p-3 mt-2"
            />
          </div>

        </div>

      </div>
    </Layout>
  );
}