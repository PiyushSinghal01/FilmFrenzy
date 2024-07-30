import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { db, reviewsRef } from '../firebase/firebase';
import { addDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({id, prevRating, userRated}) => {
    const useAppState = useContext(Appstate);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [thought, setThought] = useState("");
    const [rvwLoading, setRvwLoading] = useState(false);

    const [rvwData, setRvwData] = useState([]);

    const navigate = useNavigate();


    const sendReview = async () => {
      setLoading(true);
      try{
        if(useAppState.login)
        {
          await addDoc(reviewsRef, {
            movieid: id,
            name: useAppState.userName,
            rating: rating,
            thought: thought,
            timestamp: new Date().getTime()
          });
  
          const _doc = doc(db, "movies", id);
          await updateDoc(_doc, {
            rating : prevRating + rating,
            rated : userRated + 1
          })
          
          swal({
            title: "Review Sent",
            icon: "success",
            buttons: false,
            timer: 2000
          })
  
          setRating(0);
          setThought("");
        }
        else{
          navigate('/login')
        }
      } 
      catch(error) {
        console.log(error)
      }
      setLoading(false);
    }

    useEffect(() => {
      const getData = async() => {
        setRvwLoading(true);
        setRvwData([]);

        const quer = query(reviewsRef, where('movieid', '==', id))
        const _data = await getDocs(quer);

        _data.forEach((doc) => {
          // console.log(doc.data());
          setRvwData((prev) => [...prev, doc.data()]);
        })

        setRvwLoading(false);
      }

      getData();
    },[loading])

  return (
    <div className='mt-4 w-full'>
      <h1 className='text-xl font-bold mt-6'>Write a review...</h1>
      <ReactStars size={30} half={true} onChange={(rate) => setRating(rate)} value={rating}/>      
      <input 
        type="text" 
        value={thought}
        onChange={(e) => { setThought(e.target.value) }}
        className='w-full p-3 outline-none bg-gray-900 h-14' 
        placeholder='Share Your Thoughts...' 
      />
      <button onClick={ sendReview } className='bg-green-700 w-full p-1 flex justify-center'>
        {loading ? <TailSpin height={25} color='white'></TailSpin> : "Share"}
      </button>

      <hr className='my-8'/>

      <p className='text-2xl font-bold'>Reviews</p>
      { rvwLoading ? <div className='flex justify-center'><ThreeDots color='white' /></div> : 
        <div className='mt-2'>
        {
          rvwData.map((curElem, i) => {
            return(
              <div key={i} className='bg-gray-900 p-2 w-full mt-2'>
                <div className='flex gap-5 items-center justify-between'>
                  <p className='text-blue-500 text-lg font-bold'>{curElem.name}</p>
                  <p className='text-xs'>{new Date(curElem.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <ReactStars edit={false} value={curElem.rating}></ReactStars>
                </div>
                <div>
                  <p>{curElem.thought}</p>
                </div>
              </div>
            )
          })
        }
        </div>
      }
    </div>
  )
}

export default Reviews
