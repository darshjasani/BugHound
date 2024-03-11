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
        <div className='click'>
            <button onClick={changeLogin}>Login</button>
            <button onClick={changeSignUp}>Sign Up</button>
        </div>
        {display == 'login' ? (
            <div className='login'>
            <div>
                Username :&nbsp;
                <input type='text'/>
            </div>
            <div>
                Password :&nbsp;
                <input type='password' />
            </div>
            <div>
                <button>Login</button>
            </div>
        </div>
        ) : (
            <div className='signup'>
            <div>
                Username :&nbsp;
                <input type='text'/>
            </div>
            <div>
                Password :&nbsp;
                <input type='password' />
            </div>
            <div>
                Confirm Password :&nbsp;
                <input type='password' />
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
        

        
    </>
  )
}

export default Login