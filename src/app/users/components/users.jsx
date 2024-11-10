"use client";
import { useState, useEffect } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { db } from "../../../firebaseConfig"; // Adjust the path as needed
import { collection, getDocs } from "firebase/firestore";

const Messenger = () => {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [requestText, setRequestText] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map(doc => ({
        name: doc.data().name,
        email: doc.data().email,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }));
      setChats(userData);
    };

    fetchChats();
  }, []);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle click on a user
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Handle send request
  const handleSendRequest = () => {
    // Send request logic here, e.g., send requestText, selectedUser.name, and selectedUser.email
    console.log("Request sent to:", selectedUser, "Message:", requestText);
    setIsModalOpen(false);
    setRequestText("");
  };

  return (
    <div className="flex flex-col px-4 py-6">
      {/* Header */}
      <div className="bg-black rounded-3xl shadow-lg">
        <div className="flex justify-between items-center px-4 py-3">
          <h2 className="text-xl font-semibold text-white">All Users ({filteredChats.length})</h2>
          {/* <FaCommentAlt className="h-6 w-7 text-white cursor-pointer" /> */}
        </div>
        <div className="bg-white rounded-3xl border p-3">
          {/* Responsive Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-3/4 md:w-1/2 px-4 py-2 rounded-3xl bg-white border border-gray-300 focus:outline-none focus:border-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Chat List */}
          <div className="mb-6">
            <div className="mt-4 space-y-4 overflow-y-auto" style={{ maxHeight: "500px" }}>
              {filteredChats.map((chat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-3xl shadow-md hover:bg-white hover:text-black hover:border-2 cursor-pointer"
                  onClick={() => handleUserClick(chat)}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full border flex items-center justify-center">
                      <span className="text-black">{chat.name[0]}</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-black">{chat.name}</p>
                      <p className="text-sm text-black">{chat.email}</p>
                    </div>
                  </div>
                  {/* <div className="text-sm text-gray-400">{chat.time}</div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-3xl p-6 w-11/12 md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Send Request to {selectedUser.name}</h2>
            <p className="mb-2">Email: {selectedUser.email}</p>
            <textarea
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Enter message (up to 20 words)"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              maxLength={200} // 20 words approximately
            />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleSendRequest}
              >
                Send Request
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messenger;
