import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

const Articles = ({ category = "Articles", type = "" }) => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Theme mapping function
  const getThemeClasses = () => {
    switch (type?.toLowerCase()) {
      case "human":
        return {
          border: "border-red-400",
          badge: "bg-red-100 text-red-700",
          button: "bg-red-100 text-red-600 hover:bg-red-200"
        };
      case "veterinary":
        return {
          border: "border-blue-400",
          badge: "bg-blue-100 text-blue-700",
          button: "bg-blue-100 text-blue-600 hover:bg-blue-200"
        };
      case "agriculture":
        return {
          border: "border-green-400",
          badge: "bg-green-100 text-green-700",
          button: "bg-green-100 text-green-600 hover:bg-green-200"
        };
      default:
        return {
          border: "border-gray-400",
          badge: "bg-gray-100 text-gray-700",
          button: "bg-gray-100 text-gray-600 hover:bg-gray-200"
        };
    }
  };

  const theme = getThemeClasses();

  const fetchPdfs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/pdf/${category}`);
      const data = res.data.data || [];

      const filtered = type
        ? data.filter((pdf) => pdf.type?.toLowerCase() === type.toLowerCase())
        : data;

      setPdfs(filtered);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
      toast.error("❌ Failed to fetch PDFs!");
      setPdfs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, [category, type]);

  const getPdfUrl = (filePath) => {
    if (!filePath) return "#";
    return `http://localhost:2026/${filePath
      .replace(/\\/g, "/")
      .split("backend/")[1]}`;
  };

  return (
    <main className="max-w-7xl mx-auto py-12 px-5">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 tracking-wide">
        📄 {type || category} Articles
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">⏳ Loading PDFs...</p>
      ) : !Array.isArray(pdfs) || pdfs.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No Articles Found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pdfs.map((pdf) => (
            <div
              key={pdf._id}
              className={`bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between border-t-4 ${theme.border}`}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-gray-800">{pdf.title}</h3>
                <span className={`text-xs inline-block w-fit px-2 py-1 font-semibold rounded-full ${theme.badge}`}>
                  {pdf.category}
                </span>
                <p className="text-gray-600 text-sm mt-1">{pdf.details}</p>
              </div>
              <div className="mt-6">
                <a
                  href={getPdfUrl(pdf.filePath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition ${theme.button}`}
                >
                  <FontAwesomeIcon icon={faFilePdf} />
                  View PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Articles;
