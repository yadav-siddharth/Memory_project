import React  from 'react';
import {Routes,Route} from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';

function App(){
          return (
                    <>
                    <Navbar />
                              <Routes>
                                        <Route path="/"  element={<Home/>}/>
                                        <Route path='/auth'  element={<Auth/>}/>
                              </Routes>
                    </>

          )
}

export default App;