import React, { useEffect, useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  DocumentData,
  query,
  onSnapshot,
  CollectionReference,
  addDoc,
  doc,
  deleteDoc,
  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVM5NkcTdu4qlMK-eoTfoEf0LMCd7y0bw",
  authDomain: "typescrypt-backend3.firebaseapp.com",
  projectId: "typescrypt-backend3",
  storageBucket: "typescrypt-backend3.appspot.com",
  messagingSenderId: "454895339056",
  appId: "1:454895339056:web:30dd3525bae8f76f0d4ff5",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
//const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
}; // den är vår collection reference

interface TodoItem {
  id?: string,
  text: string,
  timeStamp: Date
};

const todosCollection = createCollection<TodoItem>("todos");
// todosCollection pekar mot vår firestore databas collection 'todos'
// vi passera todos parameters till funktionen createCollection
// createCollection är copplad till vår firebase db som pekar mott collektion 'todos'


function App() {
  const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([])
  
  useEffect(() => {
    const q = query(todosCollection,)
    // const q anger path till vår firebase.data
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // onSnapshot anropas varje gång data har ändrats på servern
      // varje uppdateringar blir fångat i querySnapshot. en snapshot av data hur den ser ut just nu
      const latest: TodoItem[] = []
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
          latest.push(doc.data())
      })
            // unsubscribe hämta alla document i collection 'todos'(q)
      // och forEach document i denna collection hämtar vi ut datan (text,timestamp)

      setTodos(latest)
    })
    return unsubscribe;
    // och vi returnerar allas documents data
  }, [])

 

  const removeTodo = async (item: TodoItem)=>{
    const docRef = doc(firestore, 'todos', item.id||'')
    deleteDoc(docRef)
    // not working yet
  }



  const addTodo = async (text: string) => {
    setTodoText('');
    addDoc(todosCollection, {
      // addDoc adderar en document :text and timestamp i vår collektion
      text: text,
      timeStamp: new Date()
   })
  };
 
  return (
    <div className="App">
      chat app
      <div>
        {todos.map((item) => {
          return <div>
            <li key={item.id}>{item.text}</li> <span onClick={()=>removeTodo(item)} >delete</span>
          </div>
        })}
      </div>
      <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
      <button onClick={(e)=>addTodo(todoText)}> send </button>
    </div>
  );
}

export default App;


// om firebase db

// klienten ställer frågan direkt till databasen
// man ställer inte fråga hela tiden, man ställer en fråga och man väntar på svar