import React from 'react'
import './login.css'
import { BASE_URL } from '../auth/api'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeToken } from '../../redux/actions/auth'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

async function registerUser(credentials) {
  const url = BASE_URL+'register'
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


const Register = () => {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  const dispatch = useDispatch();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await registerUser({
            username,
            email,
            password
        });
        if(!token.token) {
            const notify = () => toast("Please enter Valid Data");
            notify();
        } 
        else {
        dispatch(changeToken(token.token));
        navigate('/')
        }
        }
  return (
    <div className="login-wrapper">
        <ToastContainer
            position="bottom-left"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            />
      <h1>Please Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password"  onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register