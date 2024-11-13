import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../Firebase.init';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { sendEmailVerification } from 'firebase/auth';
const SignUp = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false)

    const [eye, setEye] = useState(false)

    const [ShowPassword, setShowPassword] = useState(false)


    const handleShowed = (t) => {
        setEye(t);
        setShowPassword(t)
    }



    const handleSubmit = (event) => {
        event.preventDefault();

        setErrorMessage('')
        setSuccess(false)








        const email = event.target.email.value
        const password = event.target.password.value
        const photo=event.target.Photo.value
        const name=event.target.name.value
        const terms=event.target.terms.checked
        console.log(photo,name)
       

        if(!terms)
        {
            setErrorMessage('Please accept our terms and conditions')
            return;
        }


        if (password.length < 6) {
            console.log(errorMessage)
            setErrorMessage('password should in 6 character')
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('Password should have one charecter, one number,one uppercase and one')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true)

         //email verification
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                   console.log('Verification email send')
                })
           
                //Update profile and photo Url

                const profile={
                    displayName:name,
                    photoURL:photo
                }

                updateProfile(auth.currentUser,profile)
                .then(()=>
                {
                    console.log('updatded profile')
                })
                .catch((error)=>{
                    console.log('error in profile',error)
                })


            }
            )
            .catch(error => {
                console.log('Error', error.message)
                setErrorMessage(error.message)
                console.log(error.massage.length)
            }
            )
    }




    return (


        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">

            <h1 className="text-2xl font-bold pl-4 pt-4">Sign up now!</h1>
            <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="text" name='Photo' placeholder="Photo" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>

                    </label>

                    <input type={ShowPassword ? 'password' : 'text'}
                        name='password'
                        placeholder="password"
                        className="input input-bordered" required />
                    <button className='absolute left-72 top-12'
                        onClick={() => handleShowed(!eye)}>  {eye ? <FaEyeSlash /> : <FaEye />}</button>

                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>

                <div className="form-control">
                    <label className="label justify-start cursor-pointer">
                     
                        <input type="checkbox" name='terms'  className="checkbox " />
                        <span className="label-text ml-2">Accept our terms and condition</span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>

                {
                    errorMessage && <p className='text-red-500'>{errorMessage}</p>
                }
                {
                    success && <p className='text-green-600'>Sign up success full</p>
                }


                
            </form>


        </div>

    );
};

export default SignUp;