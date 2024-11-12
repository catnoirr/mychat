"use client"
import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { db, collection, query, where, getDocs, addDoc, orderBy, onSnapshot, serverTimestamp } from "../../firebaseConfig";

function Chat() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const userAId = "userAId"; // Replace with the actual logged-in user ID

  // Fetch users based on the search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const getUsers = async () => {
        const q = query(
          collection(db, "users"),
          where("name", ">=", searchTerm),
          where("name", "<=", searchTerm + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        setUsers(querySnapshot.docs.map((doc) => doc.data()));
      };
      getUsers();
    } else {
      setUsers([]); // Clear results if the search term is empty
    }
  }, [searchTerm]);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const q = query(
        collection(db, "chat", `${userAId}_${selectedUser.id}`, "messages"),
        orderBy("timestamp")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      });

      return () => unsubscribe(); // Clean up on unmount
    }
  }, [selectedUser]);

  // Function to send a message
  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const roomId = `${userAId}_${selectedUser.id}`;
        await addDoc(collection(db, "chat", roomId, "messages"), {
          text: newMessage,
          senderId: userAId,
          senderName: "Sagar", // Replace with dynamic sender name
          isRead: false,
          timestamp: serverTimestamp(),
        });
        setNewMessage(""); // Clear the input after sending
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <div className="p-4 w-full">
      <div className="bg-black rounded-3xl shadow-md w-full mt-6">
        {/* Search Bar */}
        <header className="flex items-center justify-between bg-black text-white p-4 rounded-t-3xl">
          <input
            type="text"
            className="p-2 text-center rounded-full border-2 text-black focus:outline-none focus:border-4"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>

        {/* Search Results */}
        {searchTerm && (
          <div className="bg-white shadow-md rounded-lg p-2 mt-2">
            {users.map((user, index) => (
              <div
                key={index}
                onClick={() => setSelectedUser(user)}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-2 text-sm">{user.name}</div>
              </div>
            ))}
          </div>
        )}

        {/* Chat Section */}
        {selectedUser && (
          <>
            <header className="flex items-center justify-between bg-black text-white p-4 rounded-t-3xl mt-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-2">
                  <span className="text-xl font-semibold">{selectedUser.name}</span>
                </div>
              </div>
            </header>

            <div className="p-4 bg-white h-full rounded-3xl flex flex-col justify-between border border-gray-200">
              <div className="space-y-2 h-full overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.senderId === userAId ? "justify-end" : "justify-start"}`}
                  >
                    <div className="border text-black rounded-full p-4 w-fit text-sm">
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center p-3 rounded-b-lg bg-white border-t border-gray-200">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Your Message..."
                  className="flex-grow rounded-full border border-black p-4 px-7 shadow-lg focus:outline-none focus:border-black"
                />
                <div className="relative group ml-2">
                  <button className="text-black" onClick={sendMessage}>
                    <FaPaperPlane className="w-5 h-5" />
                  </button>
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-black border-2 p-3 rounded-full text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Send
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
