import React, { useState,useEffect } from 'react';
import './form.css';
import FileBase from "react-file-base64";
import {useDispatch} from "react-redux";
import { createPost,updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import '../Posts/Post/post.css';
import '../Auth/auth.css';


export function Form({currentId,setCurrentId}) {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [postData,setPostData] = useState({title:'',message:'',tags:'',selectedFile:''});
  const post = useSelector((state)=> (currentId ? state.posts.find((message)=>message._id === currentId):null));
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
})

  useEffect(()=>{
    if(post) setPostData(post);
  },[post])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId,{...postData , name: user?.result?.name}));
      clear();
    }else{
      dispatch(createPost({...postData , name: user?.result?.name}));
      clear(); 
    }
    
  };
  

  const clear = ()=>{
    setPostData({title:'',message:'',tags:'',selectedFile:''})
  }

    return (
  <div className='leftside'>    
  {!user ? (  
            <div class="card-signin">
            {/* <div className="loader2"></div> */}
              <h4 className='head2'> Please Sign In , For creating your Memory and like others post</h4>
            </div> 
    ):(
              <div>
                <div class="card-profile">
                  <div className="loader2"></div>
                    <h4 className='head2'> Welcome,</h4>
                    <h4 className='head2'>{user ? (`${user.result.name}`):("")}</h4>
                </div>
          
                <form className="form" onSubmit={handleSubmit} >
                      <p className="form-title">{currentId ? 'Edit' : 'Create'} Your Memory</p>
                      {/* <div className="input-container">
                                <input type="creator" placeholder="Creator" value={postData.creator} onChange={(e)=>setPostData({...postData, creator:e.target.value})}/>
          
                      </div> */}
                      <div className="input-container">
                                <input type="title" placeholder="Title" value={postData.title} onChange={(e)=>setPostData({...postData, title:e.target.value})}/>
                      </div>
                      <div className="input-container">
                                <input type="message" placeholder="Message" value={postData.message} onChange={(e)=>setPostData({...postData, message:e.target.value})}/>
                      </div>
                      <div className="input-container">
                                <input type="tags" placeholder="Tags" value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value.split(' , ')})}/>
                      </div>
          
                      <div className="actions">
                        <label  className="button upload-btn">
                          <FileBase  type="file" id="file" multiple={false} onDone={({base64})=>setPostData({...postData, selectedFile:base64})}/>
                        </label>
                      </div>
          
                      <button type="submit" className="submit">
                                Create
                      </button>
          
                      <button type="submit" className="submit2"  onClick={clear} >
                                Clear
                      </button>
                </form>
              </div>  
    )} 
       
     </div>

     

  

    )
  }


export default Form
