import React,{useState,useEffect} from 'react'
import './auth.css';
import FileBase from "react-file-base64";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { signin,signup} from '../../actions/auth';


const intialState = { username:'', email:'',password:'',profileImage:''}

const Auth = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [isSignup,setIsSignup] = useState(false);
  const [formData,setFormData] = useState(intialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleSubmit = (e) =>{
    e.preventDefault();
    if (isSignup){
      dispatch(signup(formData,navigate))
    }else{
      dispatch(signin(formData,navigate))
    }
  }

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const switchMode = () =>{
      setIsSignup((prevIsSingup)=>!prevIsSingup);
      setShowPassword(false);
  }

  const handleShowPassword = () =>{
    setShowPassword ((prevShowPassword)=>!prevShowPassword)
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "773032737988-cvoi95uh6gi255of258pu78io90d8tfa.apps.googleusercontent.com",
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const googleSuccess =async(res)=>{
    const result  = res?.profileObj;
    const token = res?.tokenId;

    try{
      dispatch({type:"AUTH",data:{token,result}});
      navigate('/');

    }catch(error){
      console.log(error);
    }
    
  }

  const googleFailure =(error)=>{
    console.log(error);
    console.log("Google Sign In was unsuccessful  Try Again")
  }



  return (
          <div className="form-container">
                  <div className='form-head'>
                    <div className="loader2"></div>
                    <p className="title">{isSignup ? 'Sign Up' : 'Sign In'}</p>
                  </div>  
                    <form className="form2" onSubmit={handleSubmit}>
                      {
                        isSignup && (
                          <div>
                            <div className="input-group">
                              <label htmlFor="name">Username</label>
                              <input type="text" name="name" id="name" placeholder="" onChange={handleChange}/>
                            </div>

                              <div className="input-group">
                              <label  >Profile Photo</label>
                                <FileBase  className="button upload-btn" type="file" id="file" multiple={false} onDone={({base64})=>setFormData({...formData, profileImage:base64})}/>
                              </div>
                            </div>

                        )
                      }
                              <div className="input-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" placeholder="" onChange={handleChange}/>
                              </div>

                              <div className="input-group">
                                        <label htmlFor="password">Password</label>
                                        <input type= "password" name="password" id="password"  onChange={handleShowPassword}/>
                                        <div className="forgot">
                                                  {/* <a>Show Password </a> */}
                                        </div>
                              </div>
                            {/* {isSignup && (
                              <div className="input-group">
                                  <label htmlFor="confirmPassword">Confirm Password</label>
                                  <input type= "password" name="confirmPassword" id="confirmPassword"  onChange={handleChange}/>
                              </div>

                            )} */}
                              <button type="submit" className="sign2">{isSignup ? "Sign Up" : "Sign In"}</button>
                    </form>
                    <div className="social-message">
                              <div className="line"></div>
                              <p className="message">Login with social accounts</p>
                              <div className="line"></div>
                    </div>
                    <div className="social-icons">
                              <GoogleLogin
                                clientId="773032737988-cvoi95uh6gi255of258pu78io90d8tfa.apps.googleusercontent.com"
                                render={(renderProps)=>(
                                  <div aria-label="Log in with Google" className="icon" onClick={renderProps.onClick} aria-disabled={renderProps.disabled}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-5 h-5 fill-current">
                                              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                    </svg>
                                  </div>

                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                              />
                    </div>
                    <p className="forgot" onClick={switchMode}>
                      {isSignup ? "Already have an account ? Sign In" : "Don't have an account? Sign Up" }
                    </p>
          </div>
  )
}

export default Auth
// "773032737988-cvoi95uh6gi255of258pu78io90d8tfa.apps.googleusercontent.com"