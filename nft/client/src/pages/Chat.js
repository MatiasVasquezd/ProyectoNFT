import React, { useRef, useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuth } from "../context/authContext";
import { firestore } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';


//const auth = useAuth();

const Chat = () => {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  
  const [messages] = useCollectionData(query, { idField: 'id' });
  
  const [formValue, setFormValue] = useState('');
  const { user } = useAuth();
  
  const sendMessage = async (e) => {
   
      e.preventDefault();
  
      const { uid, photoURL } = user.currentUser;
      console.log(messages);
      await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
      })
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
  }


    const [show, setShow] = useState('hidden');
    const minimizarHandler = () => {
        
        if(show==='hidden'){
            
            setShow('show')
        }else{
            
            setShow('hidden')
        }
        
    }
  return (

    <div className="w-80 border rounded fixed bg-white bottom-0 right-0">
      
        <div>
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300 hover:cursor-pointer"  onClick={minimizarHandler}>
                <img className="object-cover w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                <span className="block ml-2 font-bold text-gray-600">Emma</span>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                </span>
            </div>
              
            <div className={`${show} w-full p-6 overflow-y-auto h-48`}>
              <ul className="space-y-2">
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
              </ul>
              {/* <ul className="space-y-2">
                <li className="flex justify-start">
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                    <span className="block">Hi</span>
                  </div>
                </li>
                <li className="flex justify-end">
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                    <span className="block">Hiiii</span>
                  </div>
                </li>
                <li className="flex justify-end">
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                    <span className="block">how are you?</span>
                  </div>
                </li>
                <li className="flex justify-start">
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                    <span className="block">Lorem ipsum dolor sit, amet consectetur adipisicing elit. </span>
                  </div>
                </li>
              </ul> */}

            </div>

            <div className={`flex ${show} items-center justify-between w-full`}>

              {/* <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button> */}
              <form onSubmit={sendMessage} className='flex items-center justify-between w-full p-2 border-t border-gray-300'>
                <input type="text" placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-g
                  
                  ray-100 rounded-full outline-none focus:text-gray-700"
                  name="message" required 
                  value={formValue} onChange={(e) => setFormValue(e.target.value)}
                  />
              {/* <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button> */}
                <button type="submit" disabled={!formValue}>
                  <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    
  )
}


function ChatMessage(props) {
const { text, uid, photoURL } = props.message;
const { user } = useAuth();
const messageClass = uid === user.currentUser.uid ? 
'flex justify-start' 
: 
'flex justify-end';

return (
    <li className={messageClass}>
      <div className='relative max-w-xl px-4 py-2 text-gray-700 rounded shadow'>
      {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
      <p className="block">{text}</p>
      </div>
    </li>
  )
}

export default Chat
