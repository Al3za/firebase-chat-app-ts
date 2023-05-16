import { initializeApp } from 'firebase/app';
import { config } from '../config/Config';
import {
    getFirestore,
    collection,
    DocumentData,
    query,
    onSnapshot,
    CollectionReference,
    addDoc,
    orderBy
} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

export const app = initializeApp(config.firebaseConfig);
const firestore = getFirestore();

const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(firestore, collectionName) as CollectionReference<T>;
 };

 interface ChatItem {
   user:string,
   datum: string,
   hour: string,
   text: string,
   timeStamp: Date
};

const Chat_Collection = createCollection<ChatItem>("Chats");

export default function ChatApp() {

const auth = getAuth();  
const userName = auth.currentUser?.email
//console.log(userName?.split('@')[0])
  
const [ChatText, setChatText] = useState<string>('');
  const [Chats, setChats] = useState<ChatItem[]>([]);

  useEffect(() => {
    const q = query(Chat_Collection, orderBy('timeStamp', 'desc'))
    // const q anger path till vår firebase.data
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // onSnapshot anropas varje gång data har ändrats på servern
      // varje uppdateringar blir fångat i querySnapshot. en snapshot av data hur den ser ut just nu
      const latest: ChatItem[] = [];
      querySnapshot.forEach((doc) => {
        latest.push(doc.data())
      })
      // unsubscribe hämta alla document i collection 'todos'(q)
      // och forEach document i denna collection hämtar vi ut datan (text,timestamp)
      setChats(latest)
    })
    return unsubscribe;
    // och vi returnerar allas documents data
  }, []);

  const addTodo = async (text: string) => {
    const now = new Date();
    const datums = now.toLocaleDateString(); //string
    const hours = now.toLocaleTimeString();
    setChatText('');
    addDoc(Chat_Collection , {
      user:userName?.split('@')[0],
      text: text,
      datum: datums,
      hour: hours,
      timeStamp: new Date()
    })
  };

  return (
     <div className="App">
      <h1>welcome to chat app</h1>
      <div>
        {Chats.map((item,index) => {
          return <div key={index}>
            <li>{item.text}</li>
            <p> from {item.user} </p>
            <p>{item.datum} - {item.hour} </p>
          </div>
        })}
      </div>
      <input type="text" value={ChatText} onChange={(e) => setChatText(e.target.value)} />
      <button onClick={(e) => addTodo(ChatText)}> send </button>
      <div>
      <div className='wrapper' ><button className='button-62' onClick={() => signOut(auth)}> Sign out </button> </div>
      </div>
    </div>
  )
};