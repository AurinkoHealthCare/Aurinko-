import { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Users, MapPin, FileText, Globe } from "lucide-react";

const VisitorStats = () => {
  const [data, setData] = useState([]);
  const [myCountry, setMyCountry] = useState("");
  const [maxCount, setMaxCount] = useState(0);
  const [topLocation, setTopLocation] = useState("");
  const [totalVisits, setTotalVisits] = useState(0);
  const [contactCount, setContactCount] = useState(0);

  // Pagination states
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("/visitors/track", { withCredentials: true });
      const visitors = res.data.allVisits;

      const formatted = visitors.map((item) => {
        const country = item._id.country || "Unknown";
        const region = item._id.region || "Unknown";
        const city = item._id.city || "Unknown";
        return {
          location: `${country} → ${region} → ${city}`,
          country,
          count: item.count,
        };
      });

      const sorted = formatted.sort((a, b) => b.count - a.count);
      const highest = sorted[0]?.count || 0;
      const total = formatted.reduce((acc, curr) => acc + curr.count, 0);

      setData(sorted);
      setMaxCount(highest);
      setTopLocation(sorted[0]?.location || "Unknown");

      // ✅ Browsing From fix
      setMyCountry(res.data.visitor?.country || "Unknown");

      setTotalVisits(total);

      const contactRes = await axios.get("/submit/allcontacts");
      setContactCount(contactRes.data.count || 0);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchData();
}, []);


  const getBadge = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "";
  };

  // Pagination logic
  const paginatedData = data.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(data.length / perPage);

  // Pie Chart Colors
  const COLORS = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#6366f1", "#a855f7", "#ec4899", "#14b8a6", "#78716c"];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl w-full mx-auto flex-grow px-4 py-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          🌐 Visitor Insights
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Explore where your visitors come from and how they engage.
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-indigo-100 border border-indigo-300 rounded-lg p-4 flex items-center gap-3 shadow-sm">
            <Globe className="text-indigo-700 w-6 h-6" />
            <div>
              <p className="text-xs text-indigo-800">Browsing From</p>
              <p className="text-lg font-bold text-indigo-900">{myCountry}</p>
            </div>
          </div>

          <div className="bg-red-100 border border-red-300 rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <MapPin className="text-red-700 w-6 h-6" />
            <div>
              <p className="text-xs text-red-800">Top Location</p>
              <p className="text-lg font-bold text-red-900">
                {topLocation} ({maxCount})
              </p>
            </div>
          </div>

          <div className="bg-green-100 border border-green-300 rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <Users className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-xs text-green-800">Total Visits</p>
              <p className="text-lg font-bold text-green-900">{totalVisits}</p>
            </div>
          </div>

          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <FileText className="text-yellow-700 w-6 h-6" />
            <div>
              <p className="text-xs text-yellow-800">Contact Forms</p>
              <p className="text-lg font-bold text-yellow-900">{contactCount}</p>
            </div>
          </div>
        </div>

        {/* Charts + Visitor List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Top 10 Countries</h3>
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.slice(0, 10)}
                    dataKey="count"
                    nameKey="country"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    fill="#8884d8"
                    label={(entry) => entry.country}
                  >
                    {data.slice(0, 10).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Visitor List with Pagination */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              📋 Visitor Locations List
            </h3>
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2">
              {paginatedData.map(({ location, count }, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded border shadow-sm"
                >
                  <span className="text-gray-700 truncate max-w-[70%] text-sm font-medium">
                    {getBadge((page - 1) * perPage + index)} {location}
                  </span>
                  <span
                    className={`font-semibold text-sm ${
                      count === maxCount ? "text-red-600" : "text-green-700"
                    }`}
                  >
                    👥 {count}
                  </span>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-3">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                ◀ Prev
              </button>
              <span className="text-sm text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorStats;
