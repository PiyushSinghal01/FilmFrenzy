import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { ThreeCircles } from 'react-loader-spinner'
import Reviews from './Reviews'

const Detail = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    title : "",
    year : "",
    image : "",
    description : "",
    rating : 0,
    rated : 0
  });

  useEffect(() => {
    const getData = async() =>{
      setLoading(true);

      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      console.log(_data.data());

      setLoading(false);
    }

    getData();
  }, [id])


  // console.log(data)
  return (
    <>
    { loading ? <div className='h-96 w-full flex justify-center items-center'><ThreeCircles color='white' height={55}></ThreeCircles></div> :
      <div className='p-4 mt-4 flex-col md:flex-row items-center md:items-start w-full flex justify-center'>
        <img src={data.image}
          className='h-96 w-72 md:sticky md:top-24'
          alt="Poster" />

          <div className='md:ml-4 ml-0 w-full md:w-1/2'>
            <h1 className='text-3xl font-bold text-gray-400 mb-2'>{data.title} <span className='text-xl'>({data.year})</span></h1>
            <ReactStars size={20} edit={false} value={data.rating / data.rated} />
            <p className='mt-3'>{data.description}</p>

            <hr className='my-4' />
            <Reviews id={id} prevRating={data.rating} userRated={data.rated}></Reviews>
          </div>

          
      </div>
    }
    </>
  )
}

export default Detail