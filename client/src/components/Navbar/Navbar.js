import React, { useState,useEffect } from 'react';
import './navbar.css';
import { Link,  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

function Navbar(){
          const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
          console.log(user)
          const dispatch = useDispatch();
          const navigate = useNavigate();
         

          useEffect(()=>{
                    const token = user?.token;

                    if (token){
                              const decodedToken  = jwt_decode(token);

                              if(decodedToken.exp*1000 <new Date().getTime()) logout();
                    }

                    setUser(JSON.parse(localStorage.getItem('profile')));
          })

          const logout = ()=>{
                    dispatch({type:"LOGOUT"});
                    navigate('/');
                    setUser(null);
          }
          return (
                    <div className='navbar'>
                              {user ? (
                              <nav>
                                        <div className="loader"></div>
                                        <h1 className='head'><Link to='/'>Memories</Link></h1>
                                        <div className="Btn" >
                                                  <div className="text" onClick={logout}>Logout</div>
                                                  <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                                                  <div ></div>
                                        </div>
                              </nav>
                    

                              ):(
                              <nav>
                                        <div className="loader"></div>
                                        <h1 className='head'><Link to='/'>Memories</Link></h1>          
                                        <div className="Btn" >
                                                            
                                                  <Link to='/auth' className="text">Login</Link>
                                                  <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                                                  <div ></div>
                                        </div>
                              </nav>

                              )}
                    </div>

          )
}

export default Navbar;