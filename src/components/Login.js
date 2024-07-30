import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { usersRef } from "../firebase/firebase";
import { where, query, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Appstate } from "../App";

const Login = () => {
    const useAppState = useContext(Appstate);
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState({
        mobile: "",
        password: "",
    });

    const navigate = useNavigate();

    const verifyUser = async() =>{
        setLoading(true);
        try{
            const quer = query(usersRef, where('mobile', '==', login.mobile))
            const querySnapshot = await getDocs(quer);

            if(querySnapshot.empty)
            {
                swal({
                    title: "Invalid Credentials",
                    icon: "error",
                    buttons: false,
                    timer: 2000
                })
            }
            else{
                querySnapshot.forEach((doc) => {
                    const _data = doc.data();
                    const isUser = bcrypt.compareSync(login.password, _data.password);
    
                    if(isUser)
                    {
                        swal({
                            title: "Logged In",
                            icon: "success",
                            buttons: false,
                            timer: 2000
                        })
                        useAppState.setLogin(true);
                        useAppState.setUserName(_data.name);
                        navigate("/");
                    }
                    else{
                        swal({
                            title: "Invalid Credentials",
                            icon: "error",
                            buttons: false,
                            timer: 2000
                        })
                    }
                })
            } 
        }
        catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <div className="flex justify-center mt-6">
            <div className="flex flex-col md:w-1/3">
                <h1 className="text-2xl font-bold mb-3">Log-In</h1>
                <label htmlFor="mobile" className="leading-7 text-sm text-white">Mobile</label>
                <input
                    type="number"
                    value={login.mobile}
                    onChange={(e) => {
                        setLogin({ ...login, mobile: e.target.value });
                    }}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3"
                ></input>

                <label htmlFor="password" className="leading-7 text-sm text-white">Password</label>
                <input
                    type="password"
                    value={login.password}
                    onChange={(e) => {
                        setLogin({ ...login, password: e.target.value });
                    }}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3"
                ></input>
                
                <button onClick={ verifyUser } className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                    {loading ? <TailSpin height={25} color="white"></TailSpin> : "Log-In"}
                </button>

                <p className="mt-4">Do not have an account?<Link to={"/signup"}><span className="text-blue-500"> Sign Up </span></Link></p>
            </div>
        </div>
    );
};

export default Login;
