import React,{useState,useEffect} from 'react'
import "./posts.css";
import { useSelector } from 'react-redux';
import Post from './Post/post';


function Posts ({setCurrentId}) {
          
          const posts = useSelector((state)=>state.posts);
          console.log(posts)

    return (
      <div>
          
          <div className='container' >
                    <div className='post-container'>
                                <div className='post-left'>
                                  {posts.map((post)=>(
                                    <div key={post._id}>
                                      <Post post={post} setCurrentId={setCurrentId}/>
                                    </div> 
                                  ))}     
                                </div> 
                    </div>
          </div>
      </div> 
    )
  }

export default Posts
