import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { getPosts } from '../../actions/posts';
import "../Posts/posts.css";


const Home = () => {
const [currentId,setCurrentId] = useState(null);
const dispatch = useDispatch();

useEffect(()=>{
          dispatch(getPosts());
},[currentId,dispatch]);

  return (
          <div className='container'>  
                    <div className='post-container'>
                              <div className='post-left'>
                                        <Posts setCurrentId={setCurrentId}/>
                              </div> 
                              
                              <div className='post-right'>
                                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                              </div>
                    </div>
          </div>
  )
}

export default Home
