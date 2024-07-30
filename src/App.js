import React, { useState } from 'react'
import Header from './components/Header'
import Cards from './components/Cards'
import { Routes, Route } from 'react-router-dom'
import AddMovie from './AddMovie'
import Detail from './components/Detail'
import Login from './components/Login'
import Signup from './components/Signup'
import { createContext } from 'react'

const Appstate = createContext();


const App = () => {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <Appstate.Provider value={{login, setLogin, userName, setUserName}}>
      <div>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/addmovie' element={<AddMovie />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </Appstate.Provider>
  )
}

export default App;
export {Appstate};