import React, { useEffect, useState } from 'react'
import './Login.css'
function Login() {
    const [display, setDisplay] = useState('login');
    const changeLogin = ()=>{
        setDisplay('login');
    }
    const changeSignUp = ()=>{
        setDisplay('signup');
    }
    
  return (
    <>
        <div className='loginBody'>
            <div className='card'>

                <div className='click'>
                    <button 
                    className='loginButton'
                    onClick={changeLogin}
                    style={{
                        color:display=='login'?'black':'rgb(100,100,100)',
                        borderLeft:display=='login'? '2px solid grey':'0px',
                        borderTop:display=='login'? '2px solid grey':'0px'
                    }}>Login</button>
                    <button
                    className='signupButton'
                    onClick={changeSignUp}
                    style={{
                        color:display=='signup'?'black':'rgb(100,100,100)',
                        borderRight:display=='signup'? '2px solid grey':'0px',
                        borderTop:display=='signup'? '2px solid grey':'0px'}}>Sign Up</button>
                </div>

                <div className='detailsBody'>
                    {display == 'login' ? (
                        <div className='login'>
                            <div>
                                Username :<br/>
                                <input type='text' placeholder='Enter username'/>
                            </div>
                            <div>
                                Password :<br/>
                                <input type='password' placeholder='Enter password'/>
                            </div>
                            <div>
                                <button>Login</button>
                            </div>
                    </div>
                    ) : (
                        <div className='signup'>
                        <div>
                            Username :&nbsp;
                            <input type='text' placeholder='Enter username'/>
                        </div>
                        <div>
                            Password :&nbsp;
                            <input type='password' placeholder='Enter password'/>
                        </div>
                        <div>
                            Confirm Password :&nbsp;
                            <input type='password' placeholder='Confirm password'/>
                        </div>
                        <div>
                            Role : &nbsp;
                            <select>
                                <option>User</option>
                                <option>Tester</option>
                                <option>Manager</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div>
                            <button>Sign Up</button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </>
  )
}

export default Login