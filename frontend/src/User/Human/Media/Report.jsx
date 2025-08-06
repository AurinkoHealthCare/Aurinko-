import React from "react";
// import TrialReports from "../../Data/report_pdf_data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

const Reports = () => {
  const openPdf = (pdfPath) => {
    window.open(pdfPath, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Trial Reports
      </h2>

      {/* <div className="space-y-4">
        {TrialReports.map((Report) => (
          <div
            key={Report.id}
            className="p-4 border border-gray-300 rounded-lg bg-white shadow-md hover:bg-gray-100 transition cursor-pointer flex flex-wrap items-center gap-4"
            onClick={() => openPdf(Report.pdf)}
          >
             <h3 className="text-lg  text-gray-600">
                {Report.id}.
              </h3>
              <h3 className="text-lg font-semibold text-gray-800">
                {Report.title}
              </h3>
              <div className="w-4/5">
              <p className="text-gray-600">{Report.paragraph}</p>
              </div>
            <FontAwesomeIcon
              icon={faFilePdf}
              size="2x"
              className="text-red-500 hover:text-red-600 transition"
            />
          </div>
        ))}
      </div> */}
    </main>
  );
};

export default Reports;
