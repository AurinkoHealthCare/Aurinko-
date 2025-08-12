import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

const Reports = ({ category = "Reports", type = "" }) => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, [category]);

  const getPdfUrl = (filePath) => {
    if (!filePath) return "#";
    return `http://localhost:2026/${filePath.replace(/\\/g, "/").split("backend/")[1]}`;
  };


  return (
    <main className="max-w-7xl mx-auto py-12 px-5">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 tracking-wide">
        📄 {type || category} Reports
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">⏳ Loading PDFs...</p>
      ) : !Array.isArray(pdfs) || pdfs.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No Reports Found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pdfs.map((pdf) => (
            <div
              key={pdf._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between border-t-4 border-red-400"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-gray-800">{pdf.title}</h3>
                <span className="text-xs inline-block w-fit px-2 py-1 bg-red-100 text-red-700 font-semibold rounded-full">
                  {pdf.category}
                </span>
                <p className="text-gray-600 text-sm mt-1">{pdf.details}</p>
              </div>
              <div className="mt-6">
                <a
                  href={getPdfUrl(pdf.filePath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition"
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

export default Reports;
