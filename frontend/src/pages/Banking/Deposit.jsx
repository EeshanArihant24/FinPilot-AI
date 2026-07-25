export default function Deposit() {

  return (

    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold mb-8">

        Deposit Money

      </h1>

      <input
        type="number"
        placeholder="Amount"
        className="border w-full p-3 rounded-lg mb-5"
      />

      <textarea
        placeholder="Description"
        className="border w-full p-3 rounded-lg mb-5"
      />

      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
      >
        Deposit
      </button>

    </div>

  );

}