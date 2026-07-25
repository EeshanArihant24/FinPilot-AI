import Layout from "../../layouts/Layout";

export default function Admin() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,245</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold">Total Transactions</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">8,742</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold">Fraud Alerts</h2>
            <p className="text-3xl font-bold text-red-600 mt-2">12</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Admin Controls
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
              Manage Users
            </button>

            <button className="bg-green-600 text-white px-5 py-2 rounded-lg">
              View Transactions
            </button>

            <button className="bg-red-600 text-white px-5 py-2 rounded-lg">
              Fraud Reports
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}