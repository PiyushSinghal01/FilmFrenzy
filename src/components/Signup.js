import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
// import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
// import {auth} from "../firebase/firebase";
// import firebase from "firebase/compat/app";

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [signup, setSignup] = useState({
        name: "",
        mobile: "",
        password: "",
    });
    
    // const [otpLoading, setOtpLoading] = useState(false);
    // const [otpSent, setOtpSent] = useState(false);
    // const [otp, setOtp] = useState("");

    // const generateRecaptcha = () => {
    //     if(!window.recaptchaVerifier)
    //     {
    //         window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //             'size': 'invisible',
    //             'callback': (response) => {
    //                 requestOtp();
    //             },
    //             'expired-callback': () => {}
    //           },auth);
    //     }
    // }

    // const requestOtp = () => {
    //     setLoading(true);
    //     generateRecaptcha();

    //     const appVerifier = window.recaptchaVerifier
    //     console.log(appVerifier);

    //     const formatPh = `+91${signup.mobile}`;

    //     signInWithPhoneNumber(auth, formatPh, appVerifier)
    //     .then((confirmationResult) => {
    //         window.confirmationResult = confirmationResult;
    //         setOtpSent(true);
    //         setLoading(false);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         setLoading(false);
    //     });

    // }

    const navigate = useNavigate();

    const addData = async () => {
        try{
           setLoading(true); 

           const salt = bcrypt.genSaltSync(10);
           const hashPass = bcrypt.hashSync(signup.password, salt);

           await addDoc(usersRef, {
            name: signup.name,
            mobile: signup.mobile,
            password: hashPass
           });

           swal({
            text: "Successfully Signed Up",
            icon: "success",
            buttons: false,
            timer: 2000
           })
           setSignup({
            name:"",
            mobile:"",
            password:""
           });
           navigate('/login');
           setLoading(false);
        } 
        catch(error){
            console.log(error);
        }
    }


    return (
        <div className="flex justify-center mt-6">
            <div className="flex flex-col md:w-1/3">
                <h1 className="text-2xl font-bold mb-3">Sign Up</h1>
                {/* {
                    otpSent ? <>
                        <label htmlFor="otp" className="leading-7 text-sm text-white">OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                            }}
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3"
                        ></input>

                        <button className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mb-2">
                            {otpLoading ? <TailSpin height={25} color="white"></TailSpin> : "Confirm Otp"}
                        </button>
                    </> : 
                    <> */}

                    <label htmlFor="name" className="leading-7 text-sm text-white">Name</label>
                    <input
                        type="text"
                        value={signup.name}
                        onChange={(e) => {
                            setSignup({ ...signup, name: e.target.value });
                        }}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3"
                    ></input>

                    <label htmlFor="mobile" className="leading-7 text-sm text-white">Mobile</label>
                    <input
                        type="number"
                        value={signup.mobile}
                        onChange={(e) => {
                            setSignup({ ...signup, mobile: e.target.value });
                        }}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3"
                    ></input>

                    <label htmlFor="password" className="leading-7 text-sm text-white">Password</label>
                    <input
                        type="password"
                        value={signup.password}
                        onChange={(e) => {
                            setSignup({ ...signup, password: e.target.value });
                        }}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3"
                    ></input>
                    
                    <button onClick={addData} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mb-2">
                        {loading ? <TailSpin height={25} color="white"></TailSpin> : "Sign Up"}
                    </button>
                {/* </>
                } */}

                <p className="mt-4">Already have an account?<Link to={"/login"}><span className="text-blue-500"> Log In </span></Link></p>
                <div id="recaptcha-container"></div>
            </div>
        </div>
    );
};

export default Signup;