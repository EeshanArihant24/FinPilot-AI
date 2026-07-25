


export default function DashboardCard({
  title,
  value,
  color,
}) {
  return (
    <div className={`${color} rounded-xl text-white p-6 shadow-lg`}>
      <p className="text-lg">{title}</p>

      <h2 className="text-3xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}