import React  from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import './post.css'
import {AiFillLike,AiOutlineLike} from 'react-icons/ai';
import {FiMoreHorizontal} from 'react-icons/fi';
import {RiDeleteBinLine} from 'react-icons/ri';
import { deletePost } from '../../../actions/posts';

function Post ({post , setCurrentId}){
          const user = JSON.parse(localStorage.getItem('profile'));
          const dispatch = useDispatch();

          const Likes = () => {
                    if(post.likes.length > 0 ){
                              return post.likes.find((like)=> like ===(user?.result?.googleId || user?.result?._id))
                              ?(
                                        <><AiFillLike size={20} style={{color:" rgb(168, 7, 7)"}}/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length-1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' :''}`}</>   
                              ):(
                                        <><AiFillLike size={20} style={{color:" rgb(168, 7, 7)"}}/>&nbsp;{post.likes.length} {post.likes.length ===1 ? 'Like' : 'Likes'}</>
                              )
                    }
                    return <><AiOutlineLike size={20} style={{color:" rgb(168, 7, 7)"}}/>&nbsp;</>
          }



          return(
                    <div>
                              <div className="card-user">
                                        <img className="img" alt='' src={post.selectedFile}  />
                                        <div className="textBox">
                                        <div className="textContent">
                                                  <p className="h1">{post.name}</p>
                                                  <span className="span">{moment(post.createdAt).fromNow()}</span>
                                        </div>
                                        <div></div>
                              </div></div>
                              <div className="card">
                                        <img className="card-image" src={post.selectedFile}  alt=''/>
                                        {/* <div className="ribbon"><span>Recommend</span></div> */}
                                        <div className="category">
                                                   {post.tags.map((tag)=> `#${tag}`)}
                                                   {(user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
                                                   <div className="btn2">
                                                            <FiMoreHorizontal size={20} style={{color:"black"}} onClick={()=>{setCurrentId(post._id)}}/>

                                                  </div>
                                                   )}
                                         </div>
                                        <div className="heading"> {post.title}  
                                        </div>
                                        <div className="author2">{post.message}</div>
                                        <div className="author">
                                                  <div class="btn1">
                                                            {/* <AiFillLike size={20} style={{color:" rgb(168, 7, 7)"}} onClick={()=>{dispatch(likePost(post._id))}}/> */}
                                                            <Likes disabled={!user?.result}/>
                                                            {/* <span style={{color:" rgb(168, 7, 7)"}}>&nbsp;Like&nbsp;{post.likeCount}&nbsp;</span> */}
                                                  </div> 
                                                  {(user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
                                                  <div class="btn">
                                                            <RiDeleteBinLine size={20} style={{color:"black"}} onClick={()=>{dispatch(deletePost(post._id))}}/>
                                                  </div>
                                                  )}

                                        </div>      
                              </div>

                    </div>
          )
}

export default Post;