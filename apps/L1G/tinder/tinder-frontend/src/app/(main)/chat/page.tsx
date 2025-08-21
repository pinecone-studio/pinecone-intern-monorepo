import ChatPerson from '@/components/ChatPerson';
import { Header } from '@/components/Header';
import { Matches } from '@/components/Matches';


const Chat = () => {
 return (
   <div>
     <Header />
     <Matches />
     <ChatPerson />
   </div>
 );
};


export default Chat