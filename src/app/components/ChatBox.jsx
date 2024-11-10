import React from "react";
import { FaPaperPlane } from "react-icons/fa";

function Chat() {
  return (
    <div className="p-4 w-full">
    <div className="bg-black rounded-3xl shadow-md h-full w-full mt-6 ">
       
      <header className="flex items-center justify-between bg-black text-white p-4 rounded-t-3xl">
        <h2 className="text-3xl font-semibold">Uni</h2>
        <input type="text "className="p-2 text-center rounded-full border-2  text-black focus:outline-none focus:border-4" placeholder="Search" />
        {/* <button className="text-sm underline">@offxsagr</button> */}
      </header>
     
      <div className="p-4 bg-white h-full rounded-3xl flex flex-col justify-between border border-gray-200">
        <div className="flex items-center mb-4">
          <img
            src="./profile.jpg"
            alt="Coach"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Sagar Paswan</span>
            <span className="text-xs text-green-500">Active now</span>
          </div>
        </div>
        
        <div className="space-y-2 h-full overflow-y-auto">
          {/* User message (Right-aligned) - Green */}
          <div className="flex justify-end">
            <div className="border text-black rounded-full p-4 w-fit text-sm">
              Hi, I'm interested in starting cardio training
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-500">14 May 2024</div>

          {/* Coach message (Left-aligned) - Blue */}
          <div className="flex justify-start">
            <div className=" text-black rounded-full p-4 w-fit text-sm border">
              Hello! Glad to hear you want to start cardio training
            </div>
          </div>

          {/* Left-aligned voice message - Blue */}
          <div className="flex justify-start">
            <div className="border text-black rounded-full p-4 w-fit text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-4 bg-gray-400 rounded"></div>
                <span>Voice Message</span>
              </div>
            </div>
          </div>

          {/* Coach message (Left-aligned) - Blue */}
          <div className="flex justify-start">
            <div className="border text-black rounded-full p-4 w-fit text-sm">
              Good! I recommend starting with easy exercises and gradually increasing
            </div>
          </div>

          {/* User message (Right-aligned) - Green */}
          <div className="flex justify-end">
            <div className="border text-black rounded-full p-4 w-fit text-sm">
              Thanks, that sounds great!
            </div>
          </div>
        </div>

        {/* Input section */}
        <div className="flex items-center p-3 rounded-b-lg bg-white border-t border-gray-200">
          <input
            type="text"
            placeholder="Your Message..."
            className="flex-grow  rounded-full border border-black p-4 px-7 shadow-lg focus:outline-none focus:border-black"
          />
           <div className="relative group ml-2">
            <button className="text-black">
              <FaPaperPlane className="w-5 h-5" />
            </button>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2  text-black border-2 p-3  rounded-full text-xs  px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Send
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Chat;
