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
      name: "Savannah Nguyen",
      lastMessage: "Currently, I train three times ...",
      time: "14:10 PM",
      unreadCount: 1,
    },
    {
      name: "Ronald Richards",
      lastMessage: "Oh, I’ve heard about that",
      time: "12:10 PM",
      unreadCount: 0,
    },
   
  ];

  return (
    <div className="flex flex-col px-4 py-6 ">
      {/* Header */}
      <div className="bg-black rounded-3xl shadow-lg  ">
      <div className="flex justify-between items-center  px-4 py-3 ">
        <h2 className="text-xl font-semibold text-white">Messenger (25)</h2>
        <FaCommentAlt className="h-6 w-7 text-white cursor-pointer" />
      </div>
       <div className="bg-white rounded-3xl border p-3" >
              {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-3xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* My Coach Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-black">Chats</h3>
        <div className="mt-4 space-y-4">
          {chats.slice(0, 2).map((chat, index) => (
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
              {/* {chat.unreadCount > 0 && (
                <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center absolute top-0 right-0 -mt-2 -mr-2">
                  {chat.unreadCount}
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>

      {/* All Friends Section */}
      {/* <div>
        <h3 className="font-medium text-gray-700">ALL FRIENDS</h3>
        <div className="mt-4 space-y-4">
          {chats.slice(2).map((chat, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md hover:bg-purple-50"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                  <span className="text-purple-700">{chat.name[0]}</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-purple-800">{chat.name}</p>
                  <p className="text-sm text-gray-600">{chat.lastMessage}</p>
                </div>
              </div>
              <div className="text-sm text-gray-400">{chat.time}</div>
              {chat.unreadCount > 0 && (
                <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center absolute top-0 right-0 -mt-2 -mr-2">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div> */}
      </div>
      </div>
    </div>
  );
};

export default Messenger;
