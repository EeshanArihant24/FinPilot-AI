import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await authService.login(email, password);

            navigate("/");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
  <div className="relative min-h-screen overflow-hidden bg-slate-950">

    {/* Animated Background */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950"></div>

    <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>

    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl animate-pulse"></div>

    <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">

      <div className="grid w-full gap-12 lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-center">

          <span className="mb-6 inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
            🚀 AI Powered Banking
          </span>

          <h1 className="text-6xl font-black leading-tight text-white">

            Welcome to

            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              FinPilot AI

            </span>

          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">

            Experience next-generation digital banking with AI-powered fraud
            detection, intelligent financial insights, secure transactions,
            and smart money management.

          </p>

          {/* Features */}

         {/* AI Illustration */}

<div className="relative mt-12 hidden lg:flex justify-center">

  {/* Glow */}

  <div className="absolute h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

  {/* Main Card */}

  <div className="relative h-[420px] w-[420px]">

    {/* Robot */}

    <div className="absolute left-1/2 top-6 flex h-28 w-28 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-400/40 bg-slate-900 shadow-2xl">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-cyan-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2m-5 5h10M7 10v6a4 4 0 004 4h2a4 4 0 004-4v-6M9 15h.01M15 15h.01"
        />
      </svg>

    </div>

    {/* Dashboard */}

    <div className="absolute bottom-0 w-full rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 backdrop-blur-xl">

      <h3 className="mb-6 text-center text-xl font-bold text-white">

        AI Banking Dashboard

      </h3>

      {/* Fraud */}

      <div className="mb-4 rounded-xl bg-slate-800 p-4">

        <div className="flex justify-between">

          <span className="text-slate-300">

            Fraud Detection

          </span>

          <span className="font-bold text-green-400">

            99.7%

          </span>

        </div>

      </div>

      {/* Analytics */}

      <div className="mb-4 rounded-xl bg-slate-800 p-4">

        <div className="flex justify-between">

          <span className="text-slate-300">

            Risk Score

          </span>

          <span className="font-bold text-cyan-400">

            Low

          </span>

        </div>

      </div>

      {/* Balance */}

      <div className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 p-5">

        <p className="text-sm text-cyan-100">

          Smart Balance

        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">

          $25,840

        </h2>

      </div>

    </div>

  </div>

</div>

            <div className="flex items-center gap-3 text-slate-200">
              ✅ AI Fraud Detection
            </div>

            <div className="flex items-center gap-3 text-slate-200">
              🔒 Secure Authentication
            </div>

            <div className="flex items-center gap-3 text-slate-200">
              📊 Smart Financial Analytics
            </div>

            <div className="flex items-center gap-3 text-slate-200">
              ⚡ Real-time Banking
            </div>

          </div>



        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

            <div className="mb-8 text-center">

             <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/40">

    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-10 w-10 text-white"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2m-5 5h10M7 10v6a4 4 0 004 4h2a4 4 0 004-4v-6M9 15h.01M15 15h.01"
        />
    </svg>

</div>

              <h2 className="text-3xl font-bold text-white">

                Welcome Back

              </h2>

              <p className="mt-2 text-slate-300">

                Login to continue your banking journey

              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-cyan-400"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-cyan-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/40 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <p className="mt-6 text-center text-slate-300">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}