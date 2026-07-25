import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {

  const [form, setForm] = useState({

    name: "",
    email: "",
    phone: "",
    password: "",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(form);

  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-green-600 to-teal-600 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-8">

          Register

        </h1>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="border w-full rounded-lg p-3 mb-4"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="border w-full rounded-lg p-3 mb-4"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="border w-full rounded-lg p-3 mb-4"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border w-full rounded-lg p-3 mb-5"
        />

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3"
        >
          Register
        </button>

        <p className="text-center mt-5">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}