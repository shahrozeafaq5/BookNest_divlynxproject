export default function AdminStats() {
  const stats = [
    { label: "Total Books", value: 12 },
    { label: "Total Orders", value: 5 },
    { label: "Total Users", value: 8 },
    { label: "Revenue", value: "$420" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl shadow p-5"
        >
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-2xl font-semibold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
