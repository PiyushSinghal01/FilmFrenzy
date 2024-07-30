import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "./firebase/firebase";
import swal from "sweetalert";
import { Appstate } from "./App";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const useAppState = useContext(Appstate);
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title : "",
    year : "",
    description : "",
    image : "",
    rating : 0,
    rated : 0
  })

  const [loading, setLoading] = useState(false);

  const addMovie = async () => {
    setLoading(true);
    try{
      if(useAppState.login)
      {
        await addDoc(moviesRef, form)
          swal({
            title : "Successfully Added",
            icon : "success",
            buttons: false,
            timer : 1500
          });
          setForm({
            title : "",
            year : "",
            description : "",
            image : ""
          })
          navigate('/');
      }
      else{
        navigate('/login');
      }
    }
    catch(error) 
    {
      console.log(error)
    }
    setLoading(false);
  }

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-col text-center w-full mb-6">
          <h1 className="sm:text-3xl text-xl font-bold title-font mb-2 text-white">Add Movie</h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="name" className="leading-7 text-sm text-white">Title</label>
                <input 
                  type="text" 
                  value={form.title}
                  onChange={(e) => {setForm({...form, title: e.target.value})}}
                  id="name" 
                  name="title" 
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="year" className="leading-7 text-sm text-white">Year</label>
                <input 
                  type="text" 
                  value={form.year}
                  onChange={(e) => {setForm({...form, year: e.target.value})}}
                  id="year" 
                  name="email" 
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label for="image" className="leading-7 text-sm text-white">Image Link</label>
                <input 
                  type="text"
                  id="image" 
                  value={form.image}
                  onChange={(e) => {setForm({...form, image: e.target.value})}}
                  name="image" 
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3" >
                </input>

                <label for="message" className="leading-7 text-sm text-white">Description</label>
                <textarea 
                  id="message" 
                  value={form.description}
                  onChange={(e) => {setForm({...form, description: e.target.value})}}
                  name="description" 
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" >
                </textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button onClick={addMovie} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                {loading ? <TailSpin height={25} color="white"></TailSpin>:"Add"}
              </button>
            </div>
            <br />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddMovie;
