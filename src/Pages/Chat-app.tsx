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
//import { db } from '../App';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
//import { useNavigate } from 'react-router-dom';

export const app = initializeApp(config.firebaseConfig);
const firestore = getFirestore();

const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(firestore, collectionName) as CollectionReference<T>;
 };

 interface TodoItem {
   //id?: string,
   user:string,
   datum: string,
   hour: string,
   text: string,
   timeStamp: Date
};

const Chat_Collection = createCollection<TodoItem>("Chats");

export default function ChatApp() {

const auth = getAuth();  
const userID = auth.currentUser?.uid;
const userName = auth.currentUser?.email
//console.log(userName?.split('@')[0])
  
const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const q = query(Chat_Collection, orderBy('timeStamp', 'desc'))
    // const q anger path till vår firebase.data
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // onSnapshot anropas varje gång data har ändrats på servern
      // varje uppdateringar blir fångat i querySnapshot. en snapshot av data hur den ser ut just nu
      const latest: TodoItem[] = [];
      querySnapshot.forEach((doc) => {
        latest.push(doc.data())
      })
      // unsubscribe hämta alla document i collection 'todos'(q)
      // och forEach document i denna collection hämtar vi ut datan (text,timestamp)
      setTodos(latest)
    })
    return unsubscribe;
    // och vi returnerar allas documents data
  }, []);

  const addTodo = async (text: string) => {
    const now = new Date();
    const datums = now.toLocaleDateString(); //string
    const hours = now.toLocaleTimeString();
    setTodoText('');
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
        {todos.map((item,index) => {
          return <div key={index}>
            <li>{item.text}</li>
            <p> from {item.user} </p>
            <p>{item.datum} - {item.hour} </p>
          </div>
        })}
      </div>
      <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
      <button onClick={(e) => addTodo(todoText)}> send </button>
      <div>
      <div className='wrapper' ><button className='button-62' onClick={() => signOut(auth)}> Sign out </button> </div>
      </div>
    </div>
  )
};