
export const secondaryAppConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID, 
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINDSENDERID,
    appId: process.env.REACT_APP_APPID 

};



// matching rules(Chats)

// service cloud.firestore {
//     match /databases/{database}/documents {
  
//       match /Chats/{ChatsID}/children/{childrenID} {
//         allow read, write: if request.auth != null;
//       }
//       match /prova/{provaID}/children/{childrenID} {
//         allow read;
//       }
//     }
//   }