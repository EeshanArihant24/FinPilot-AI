export default function SummaryCard({

  title,

  value,

  color = "text-blue-600",

}) {
  return (

    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

      <h3 className="text-gray-500 text-sm">

        {title}

      </h3>

      <h1 className={`text-3xl font-bold mt-4 ${color}`}>

        {value}

      </h1>

    </div>

  );

}