import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../Firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {


    const [success, setSuccess] = useState(false)
    const [LoginError, setLoginError] = useState('')
    const emailRef = useRef()

    const handleLogin = (e) => {
        e.preventDefault();

        console.log(e.target)
        const email = e.target.email.value
        const password = e.target.password.value

        console.log(email, password)
        setSuccess(false)

        setLoginError('')

        //signIn user
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                setSuccess(true)


                // ...
            })
            .catch((error) => {

                const errorMessage = error.message;

                setLoginError(errorMessage)
            });
    }

    const handlePassword = () => {
        console.log('Reset password',emailRef.current.value)
        const email=emailRef.current.value

        if(!email){
            console.log('please provide a valid email address')
        }
        else
        {
            sendPasswordResetEmail(auth,email)
            .then(()=>
            {
                console.log('password reset email has been sent')
            })
        }

    }


    return (


        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className=" card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" ref={emailRef} name='email' className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                    <label onClick={handlePassword} className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>

                {
                    success && <p className='text-green-400'>User Login successful</p>
                }
                {
                    LoginError && <p>{LoginError}</p>
                }
            </form>
        </div>


    );
};

export default Login;