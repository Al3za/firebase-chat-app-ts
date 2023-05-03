import React, { useState } from 'react';
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from '@firebase/firestore';
//import { db } from '../App';



const LoginPage = () => {

    const auth = getAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [authing, setAuthin] = useState<boolean>(false)


    const SignInWithEmailPassword = () => {
       
        // when u close the window it vill log out 
       // setPersistence(auth, browserSessionPersistence).then(() => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async() => {
                setAuthin(true)
                navigate('/ChatPath')
            }).catch((error) => {
                const errorCode = error.code
                alert(errorCode)
                setAuthin(false)
            })
      //  })
    }

    return (
        
        <div className='app' >
            <div className="login-form">
            
                <div className="title">Sign In</div>
               <div className="input-container">
                 <label>Username </label>
                 <input className='LoginInputs' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="input-container">
                 <label> Password </label>
                 <input className='LoginInputs' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            
               </div>
               <div className="button-container">
                    <button className='BtnSubmit' onClick={() => SignInWithEmailPassword()} disabled={authing} > Log In with Email </button>
                </div><br />
                   dont have an account?
                  <button  onClick={()=> navigate('/signUp')} > Sign Up </button>
                   </div>
        </div>
        
    )
}

export default LoginPage

    