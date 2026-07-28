import { useState } from "react";
import Layout from "../../layouts/Layout";
import axios from "axios";

export default function FraudDetection() {

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Shopping");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const predict = async () => {

    try {

      setLoading(true);

      /*
       Replace this URL with your FastAPI endpoint

       Example:
       http://localhost:8000/predict
      */

      const response = await axios.post(
        "http://localhost:8000/predict",
        {
          amount: Number(amount),
          category,
          location,
        }
      );

      setResult(response.data);

    } catch (err) {

      console.error(err);

      alert("Prediction service unavailable.");

    } finally {

      setLoading(false);

    }

  };

  return (
    <Layout>

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          AI Fraud Detection
        </h1>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg p-3 mb-5"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg p-3 mb-5"
        >
          <option>Shopping</option>
          <option>Transfer</option>
          <option>Food</option>
          <option>Bills</option>
          <option>Travel</option>
        </select>

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded-lg p-3 mb-5"
        />

        <button
          onClick={predict}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {result && (

          <div className="mt-8 border rounded-xl p-5 bg-gray-50">

            <h2 className="text-xl font-bold mb-3">
              Prediction Result
            </h2>

            <p className="text-lg">
              <strong>Status:</strong> {result.prediction}
            </p>

            <p className="text-lg">
              <strong>Confidence:</strong> {result.confidence}
            </p>

          </div>

        )}

      </div>

    </Layout>
  );
}