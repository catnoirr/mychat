"use client";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from "../../firebaseConfig";

const Messenger = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [confessionText, setConfessionText] = useState("");
  const [confessions, setConfessions] = useState([]);
  const [filter, setFilter] = useState("all");

  // Handle opening the confession input form
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle confession submission
  const handleSubmit = async () => {
    if (confessionText.trim()) {
      const newConfession = {
        text: confessionText,
        date: serverTimestamp(), // Firestore server timestamp
      };
      await addDoc(collection(db, "confessions"), newConfession);
      setConfessionText("");
      setIsEditing(false);
      fetchConfessions(); // Refresh confessions after submission
    }
  };

  // Cancel confession input
  const handleCancel = () => {
    setIsEditing(false);
    setConfessionText("");
  };

  // Fetch confessions from Firestore
  const fetchConfessions = async () => {
    const confessionCollection = collection(db, "confessions");
    const confessionSnapshot = await getDocs(confessionCollection);
    const confessionData = confessionSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(), // Convert if Firestore Timestamp
    }));

    setConfessions(confessionData);
  };

  // Delete confessions older than 24 hours
  const deleteOldConfessions = async () => {
    const now = new Date();
    const confessionCollection = collection(db, "confessions");

    const confessionSnapshot = await getDocs(confessionCollection);
    confessionSnapshot.docs.forEach(async (docSnapshot) => {
      const confession = docSnapshot.data();
      const confessionDate = confession.date?.toDate ? confession.date.toDate() : new Date();

      // If confession is older than 24 hours, delete it
      if (now - confessionDate > 24 * 60 * 60 * 1000) {
        await deleteDoc(doc(db, "confessions", docSnapshot.id));
      }
    });

    // Refresh confessions after deletion
    fetchConfessions();
  };

  // Filter confessions based on selected filter
  const filterConfessions = () => {
    if (filter === "today") {
      const today = new Date().setHours(0, 0, 0, 0);
      return confessions.filter((confession) => confession.date >= today);
    } else if (filter === "recent") {
      return [...confessions].sort((a, b) => b.date - a.date);
    } else {
      return confessions;
    }
  };

  // Fetch and clean up confessions on component mount
  useEffect(() => {
    fetchConfessions();
    deleteOldConfessions();
  }, []);

  return (
    <div className="flex flex-col px-4 py-10">
      {/* Header */}
      <div className="bg-black rounded-3xl shadow-lg p-4">
        <div className="flex justify-between items-center px-4 py-3">
          <h2 className="text-xl font-semibold text-white">Confessions</h2>
          <FaEdit
            className="h-6 w-7 text-white cursor-pointer"
            onClick={handleEditClick}
          />
        </div>

        {/* Confession Form Section */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-3xl border p-6 w-96">
              <h3 className="text-lg font-semibold text-black mb-4">Write a Confession</h3>
              <textarea
                className="w-full px-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:border-4"
                placeholder="Write your confession here..."
                value={confessionText}
                onChange={(e) => setConfessionText(e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-3xl"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex justify-start mt-6 space-x-4">
          <button
            className={`px-4 py-2 rounded-3xl ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-3xl ${filter === "today" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setFilter("today")}
          >
            Today
          </button>
          <button
            className={`px-4 py-2 rounded-3xl ${filter === "recent" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setFilter("recent")}
          >
            Recent
          </button>
        </div>

        {/* Confession Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6 md:h-[300px] lg:h-[400px] h-[500px] overflow-y-auto scroll-container rounded-3xl">
          {filterConfessions().map((confession, index) => (
            <div key={index} className="bg-white rounded-3xl border p-4 shadow-md">
              <p className="text-sm text-black">{confession.text}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(confession.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS to Hide Scrollbar */}
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        .scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Messenger;
