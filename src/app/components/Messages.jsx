"use client";
import { FaCommentAlt } from "react-icons/fa";

const Messenger = () => {
  const chats = [
    {
      name: "Kathryn Murphy",
      lastMessage: "Here is a weekly workout plan",
      time: "17:35 PM",
      unreadCount: 2,
    },
    {
      name: "Brooklyn Simmons",
      lastMessage: "Hello, Coach! I want to improve ...",
      time: "16:25 PM",
      unreadCount: 0,
    },
    {
      name: "Brooklyn Simmons",
      lastMessage: "Hello, Coach! I want to improve ...",
      time: "16:25 PM",
      unreadCount: 0,
    },
    {
      name: "Brooklyn Simmons",
      lastMessage: "Hello, Coach! I want to improve ...",
      time: "16:25 PM",
      unreadCount: 0,
    },
    {
      name: "Brooklyn Simmons",
      lastMessage: "Hello, Coach! I want to improve ...",
      time: "16:25 PM",
      unreadCount: 0,
    },
    {
      name: "Brooklyn Simmons",
      lastMessage: "Hello, Coach! I want to improve ...",
      time: "16:25 PM",
      unreadCount: 0,
    },
    {
      name: "Brooklyn Simmons",
      lastMessage: "Hello, Coach! I want to improve ...",
      time: "16:25 PM",
      unreadCount: 0,
    },
    // Add other chats as needed
  ];

  return (
    <div className="flex flex-col px-4 py-10 md:w-3/6">
      {/* Header */}
      <div className="bg-black rounded-3xl shadow-lg ">
        <div className="flex justify-between items-center px-4 py-3">
          <h2 className="text-xl font-semibold text-white">All Users (25)</h2>
          <FaCommentAlt className="h-6 w-7 text-white cursor-pointer" />
        </div>
        <div className="bg-white rounded-3xl border p-3">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-3xl bg-white border border-gray-300 focus:outline-none focus:border-4"
            />
          </div>

          {/* My Coach Section */}
          <div className="mb-6">
            <div
              className="mt-4 space-y-4 overflow-y-auto"
              style={{
                maxHeight: "430px", // Adjust height as needed
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE and Edge
              }}
            >
              {/* Hides scrollbar in Chrome, Safari, and Edge */}
              <style>
                {`
                  .scroll-container::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>

              {chats.map((chat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-3xl shadow-md hover:bg-white hover:text-black hover:border-2"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full border flex items-center justify-center">
                      <span className="text-black">{chat.name[0]}</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold black">{chat.name}</p>
                      <p className="text-sm text-black">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{chat.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
