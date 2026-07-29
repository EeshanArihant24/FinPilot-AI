import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(email, password);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

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
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950"></div>

      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl animate-pulse"></div>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">
        <div className="grid w-full gap-12 lg:grid-cols-2">

          {/* LEFT */}
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
              detection, intelligent financial insights, secure transactions
              and smart money management.
            </p>

            <div className="mt-10 space-y-4 text-lg">
              <div className="text-slate-200">✅ AI Fraud Detection</div>
              <div className="text-slate-200">🔒 Secure JWT Authentication</div>
              <div className="text-slate-200">💳 Wallet & Transfers</div>
              <div className="text-slate-200">📈 Mutual Funds & FD</div>
              <div className="text-slate-200">⚡ Fast Banking Experience</div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

              <div className="mb-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
                  <span className="text-3xl text-white">🏦</span>
                </div>

                <h2 className="text-3xl font-bold text-white">
                  Login
                </h2>

                <p className="mt-2 text-slate-300">
                  Sign in to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-cyan-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-cyan-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white hover:scale-[1.02] transition"
                >
                  {loading ? "Signing In..." : "Login"}
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