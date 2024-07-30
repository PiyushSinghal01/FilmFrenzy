import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { getDocs } from 'firebase/firestore'
import { moviesRef } from '../firebase/firebase'
import { ThreeDots } from 'react-loader-spinner'
import { NavLink } from 'react-router-dom'

const Cards = () => {
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const _data = await getDocs(moviesRef);
            _data.forEach((doc) => {
                setData((prev) => [...prev, {...doc.data(), id:doc.id}]);
                // console.log(doc.id)
            })
            setLoading(false);
        }

        getData();
    }, [])

    return (
    <div className='flex flex-wrap justify-evenly p-3'>
      {loading ? <div className='w-full flex justify-center items-center h-96'><ThreeDots color='white' height={40}></ThreeDots></div> :
        data.map((curElem, i)=>{
            return(
                <NavLink key={i} to={`/detail/${curElem.id}`}>
                    <div className='card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
                        <img className='h-80 w-56' src={curElem.image} alt="MOVIE POSTER" />
                        <h1><span className='text-gray-500'></span> {curElem.title}</h1>
                        <h1 className='flex items-center'><span className='text-gray-500 mr-1'>Rating:</span><ReactStars size={20} edit={false} value={curElem.rating / curElem.rated} /></h1>
                        <h1><span className='text-gray-500'>Year:</span> {curElem.year}</h1>
                    </div>
                </NavLink>
            )
        })
      }
    </div>
  )
}

export default Cards