// Import the Messenger component
import Messages from "../components/Messages"
import ChatBox from "../components/ChatBox"
import HomePage from "../components/Home"

export default function Home() {
  return (
    <div className="flex  flex-col  ">
      
       
      
      <main className="flex    flex-col md:flex-row ">
    
        <Messages />
        
        <ChatBox/>
        
      </main>
      <div>
   <HomePage/>
      </div>
      {/* <ProfileCard/> */}
    </div>
  );
}
