import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

const Articles = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const category = "Articles";

  const fetchPdfs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/pdf/${category}`);
      setPdfs(res.data.data || []);
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
  }, []);

  const getPdfUrl = (filePath) => {
    if (!filePath) return "#";
    return `http://localhost:2026/${filePath
      .replace(/\\/g, "/")
      .split("backend/")[1]}`;
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Articles Reports
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">⏳ Loading PDFs...</p>
      ) : !Array.isArray(pdfs) || pdfs.length === 0 ? (
        <p className="text-center text-gray-500">No PDFs found.</p>
      ) : (
        <ul className="space-y-4">
          {pdfs.map((pdf) => (
            <li key={pdf._id}>
              <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md hover:bg-gray-100 transition flex flex-wrap md:flex-nowrap items-center justify-between gap-x-4 gap-y-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {pdf.title}
                  </h3>
                  <p className="text-sm text-gray-500">{pdf.category}</p>
                </div>
                <a
                  href={getPdfUrl(pdf.filePath)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    size="2x"
                    className="text-red-500 hover:text-red-600 transition"
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Articles;
