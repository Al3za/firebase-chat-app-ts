import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {

    const auth = getAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [authing, setAuthin] = useState<boolean>(false)

    
    const signUpWithEmailPassword = async () => {
        setAuthin(true)

        createUserWithEmailAndPassword(auth, email, password )
            .then(res => {
                navigate('/')
            }).catch((err) => {
                alert(err.code)
                setAuthin(false)
            })
    }

    return (
       
        <div className='app' >
            <div className="login-form">
            
                <div className="title">Sign Up</div>
               <div className="input-container">
                 <label>Username </label>
                 <input className='LoginInputs' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="input-container">
                 <label> Password </label>
                 <input className='LoginInputs' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            
               </div>
               <div className="button-container">
                    <button className='BtnSubmit' onClick={() => signUpWithEmailPassword()} disabled={authing} > Sign Up </button>
               </div>
                   </div>
        </div>
    )

}

export default SignUpPage