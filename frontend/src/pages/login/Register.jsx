import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        accountType: "SAVINGS",
        initialBalance: 0,
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await authService.register(form);

            navigate("/");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Registration failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h3 className="text-center mb-4">
                                Register
                            </h3>

                            <form onSubmit={handleSubmit}>

                                <input
                                    className="form-control mb-3"
                                    name="name"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    className="form-control mb-3"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    className="form-control mb-3"
                                    name="phone"
                                    placeholder="Phone"
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    className="form-control mb-3"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />

                                <select
                                    className="form-select mb-3"
                                    name="accountType"
                                    value={form.accountType}
                                    onChange={handleChange}
                                >
                                    <option value="SAVINGS">Savings</option>
                                    <option value="CURRENT">Current</option>
                                </select>

                                <button
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Creating Account..." : "Register"}
                                </button>

                            </form>

                            <p className="text-center mt-3">

                                Already have an account?

                                <Link to="/login">
                                    {" "}Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}