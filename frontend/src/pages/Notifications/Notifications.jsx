import { FaBell } from "react-icons/fa";

const notifications = [
  {
    id: 1,
    title: "Money Deposited",
    message: "$1000 has been credited successfully.",
    time: "5 mins ago",
  },
  {
    id: 2,
    title: "Transfer Successful",
    message: "$250 transferred to John.",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Fraud Alert",
    message: "Suspicious transaction detected.",
    time: "Yesterday",
  },
];

export default function Notifications() {
  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <FaBell className="text-blue-600" />
        Notifications
      </h1>

      <div className="space-y-5">

        {notifications.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >

            <h2 className="font-semibold text-lg">
              {item.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {item.message}
            </p>

            <span className="text-sm text-gray-400">
              {item.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}