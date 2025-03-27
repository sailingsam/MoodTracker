export default function DashboardCard({ title, children }) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      {children}
    </div>
  );
}
