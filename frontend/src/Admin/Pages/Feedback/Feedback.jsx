import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
// import "./Feedback.css"; // custom CSS for scrollbar hide

const Feedback = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
    axios
      .get("/submit/allcontacts")
      .then((res) => {
        setContacts(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-indigo-700 mb-4">
        📬 User Feedback Submissions
      </h1>

      {contacts.length === 0 ? (
        <div className="text-center bg-white p-6 rounded-xl shadow-lg">
          <p className="text-gray-500 text-md">No feedback submissions yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-4">
          {/* Scrollable container with hidden scrollbar */}
          <div className="max-h-[500px] overflow-y-scroll hide-scrollbar">
            <table className="min-w-full text-sm">
              <thead className="bg-indigo-600 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">#</th>
                  <th className="px-4 py-2 text-left font-medium">Name</th>
                  <th className="px-4 py-2 text-left font-medium">Email</th>
                  <th className="px-4 py-2 text-left font-medium">Phone</th>
                  <th className="px-4 py-2 text-left font-medium">Message</th>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr
                    key={contact._id}
                    onMouseEnter={() => setActiveRow(index)}
                    onMouseLeave={() => setActiveRow(null)}
                    className={`transition duration-200 ease-in-out ${
                      activeRow === index
                        ? "bg-indigo-100 shadow-md"
                        : index % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-4 py-2 text-indigo-600 hover:underline">
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </td>
                    <td className="px-4 py-2 text-gray-700">📞 {contact.phone}</td>
                    <td className="px-4 py-2 text-gray-700 max-w-[250px] truncate">
                      {contact.message}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
