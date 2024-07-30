import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Appstate } from '../App';

const Header = () => {
  const {login} = useContext(Appstate);
  
  return (
    <div className='text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500 sticky top-0 bg-gray-950 z-10'>
      <Link to={'/'}><span>Film<span className='text-white'>Frenzy</span></span></Link>
      {
        login ? <Link to={'/addmovie'}><h1 className='text-lg text-white flex items-center cursor-pointer'><AddIcon className='mr-1' />Add New</h1></Link> :
        <Link to={'/login'}><button className='bg-green-600 px-3 py-1 text-lg text-white font-normal'>Log-In</button></Link>
      }
    </div>
  )
}

export default Header
