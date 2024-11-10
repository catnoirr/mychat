// Import the Messenger component
import Sidebar from "./components/Sidebar";
import Messages from "./components/Messages"
import ChatBox from "./components/ChatBox"
import Hero from "./components/Hero"
import ProfileCard from "./components/ProfileCard"

export default function Home() {
  return (
    <div className="flex  flex-col  ">
      
       
      
      <main className="flex  md:gap  flex-col md:flex-row ">
    
        <Messages />
        
        <ChatBox/>
        
      </main>
      {/* <ProfileCard/> */}
    </div>
  );
}
