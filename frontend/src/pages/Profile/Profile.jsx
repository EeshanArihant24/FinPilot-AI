import { FaUserCircle } from "react-icons/fa";

export default function Profile() {

  return (

    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

      <div className="flex flex-col items-center">

        <FaUserCircle
          size={120}
          className="text-blue-600"
        />

        <h1 className="text-3xl font-bold mt-4">
          Ruturaj
        </h1>

        <p className="text-gray-500">
          Frontend Developer
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div>

          <label className="font-semibold">
            Email
          </label>

          <input
            value="ruturaj@gmail.com"
            readOnly
            className="border w-full rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">
            Phone
          </label>

          <input
            value="+91 9876543210"
            readOnly
            className="border w-full rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">
            Account Number
          </label>

          <input
            value="102030405"
            readOnly
            className="border w-full rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">
            IFSC
          </label>

          <input
            value="FINP0001"
            readOnly
            className="border w-full rounded-lg p-3 mt-2"
          />

        </div>

      </div>

    </div>

  );

}