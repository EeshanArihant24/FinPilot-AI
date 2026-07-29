import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { toast } from "react-hot-toast";
import {
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaCopy,
} from "react-icons/fa";

import Layout from "../../layouts/Layout";
import authService from "../../services/authService";
import { getAccount } from "../../services/bankingService";

export default function Wallet() {
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const currentUser = (await authService.getCurrentUser()).data;

      setUser(currentUser);

      const accountData = (
        await getAccount(currentUser.accountId)
      ).data;

      setAccount(accountData);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load wallet.");
    } finally {
      setLoading(false);
    }
  };

  const copyAccount = () => {
    navigator.clipboard.writeText(account?.accountNumber || "");
    toast.success("Account number copied");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-zinc-700 border-t-violet-500"></div>

            <h2 className="mt-5 text-5xl font-black text-white">
  ₹{Number(account?.balance || 0).toLocaleString()}
</h2>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-8"
      >
        {/* Header */}

        <div>

          <p className="text-sm uppercase tracking-[4px] text-violet-400">
            Wallet
          </p>

          <h1 className="mt-2 text-4xl font-black text-white">
            My Wallet
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage your account and perform banking operations.
          </p>

        </div>

        {/* Balance */}

        <div className="rounded-3xl border border-zinc-800 bg-[#141414] p-8">

          <div className="flex items-center gap-3 text-violet-400">

            <FaWallet size={20} />

            <span className="font-medium">
              Available Balance
            </span>

          </div>

          <h2 className="mt-5 text-5xl font-black text-white">

            ₹
            <CountUp
              end={Number(account?.balance || 0)}
              separator=","
              duration={1.5}
            />

          </h2>

          <p className="mt-3 text-zinc-400">
            {account?.accountType}
          </p>

        </div>

        {/* Actions */}

        <div className="grid gap-5 md:grid-cols-3">

          <ActionCard
            icon={<FaArrowDown />}
            title="Deposit"
            color="bg-green-600"
            onClick={() => navigate("/deposit")}
          />

          <ActionCard
            icon={<FaArrowUp />}
            title="Withdraw"
            color="bg-red-600"
            onClick={() => navigate("/withdraw")}
          />

          <ActionCard
            icon={<FaExchangeAlt />}
            title="Transfer"
            color="bg-violet-600"
            onClick={() => navigate("/transfer")}
          />

        </div>

        {/* Account Details */}

        <div className="rounded-3xl border border-zinc-800 bg-[#141414] p-8">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Account Details
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <InfoRow
              icon={<FaUser />}
              title="Account Holder"
              value={user?.name}
            />

            <InfoRow
              icon={<FaEnvelope />}
              title="Email"
              value={user?.email}
            />

            <InfoRow
              icon={<FaPhone />}
              title="Phone"
              value={user?.phone}
            />

                        <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#0d0d0d] p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400">
                  <FaUniversity />
                </div>

                <div>

                  <p className="text-sm text-zinc-500">
                    Account Number
                  </p>

                  <h3 className="text-lg font-semibold text-white">
                    {account?.accountNumber}
                  </h3>

                </div>

              </div>

              <button
                onClick={copyAccount}
                className="rounded-xl bg-violet-600/20 p-3 text-violet-400 transition hover:bg-violet-600/30"
              >
                <FaCopy />
              </button>

            </div>

          </div>

        </div>

      </motion.div>

    </Layout>
  );
}

function InfoRow({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-[#0d0d0d] p-5 transition hover:border-violet-500">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400">
        {icon}
      </div>

      <div>

        <p className="text-sm text-zinc-500">
          {title}
        </p>

        <h3 className="text-lg font-semibold text-white">
          {value || "-"}
        </h3>

      </div>

    </div>
  );
}

function ActionCard({
  icon,
  title,
  color,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group rounded-3xl border border-zinc-800 bg-[#141414] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-500"
    >

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${color}`}
      >
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Continue →
      </p>

    </button>
  );
}