const transactions = [
  {
    id: 1001,
    type: "Deposit",
    amount: "$500",
    status: "Completed",
  },
  {
    id: 1002,
    type: "Transfer",
    amount: "$250",
    status: "Pending",
  },
  {
    id: 1003,
    type: "Withdraw",
    amount: "$150",
    status: "Completed",
  },
];

export default function TransactionTable() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-900 text-white">

          <tr>

            <th className="p-4">ID</th>

            <th>Type</th>

            <th>Amount</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {transactions.map((item) => (
            <tr key={item.id} className="text-center border-b">

              <td className="p-4">{item.id}</td>

              <td>{item.type}</td>

              <td>{item.amount}</td>

              <td>{item.status}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}