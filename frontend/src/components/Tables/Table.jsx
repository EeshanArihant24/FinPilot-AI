export default function Table({

  columns,

  data,

}) {
  return (

    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            {columns.map((col) => (

              <th
                key={col}
                className="text-left p-4"
              >
                {col}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >

              {Object.values(row).map((value, i) => (

                <td
                  key={i}
                  className="p-4"
                >
                  {value}
                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}