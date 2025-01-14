import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import See from '../assets/see.svg'
import notSee from '../assets/not_see.svg'
import axios from 'axios';

function Register() {
  const [isSee, setIsSee] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const navigate = useNavigate()

  function validate() {
    if (!username) {
      alert('Iltimos username ni kiriting!')
      return false
    }
    if (!password) {
      alert('Iltimos password ni kiriting!')
      return false
    }
    if (!confirm) {
      alert('Iltimos confirm ni kiriting!')
      return false
    }
    if (password !== confirm) {
      alert('Password bilan confirm ni value si birhil bo`lish kerak!')
      return false
    }
    return true
  }

  function handleSubmit(event) {
    event.preventDefault()

    const isValid = validate()

    if (!isValid) {
      return
    }

    const Register = {
      username,
      password
    }

    axios.post('https://json-api.uz/api/project/blog-api/auth/register', Register, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='flex flex-col justify-center items-center bg-white dark:bg-black h-screen select-none'>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#121212] shadow-md mx-auto p-6 rounded-lg w-full max-w-md text-gray-700 dark:text-white">
        <h1 className="mb-4 font-semibold text-2xl text-center">Register</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium text-sm">Username</label>
          <input onChange={(e) => { setUsername(e.target.value) }} placeholder='Enter username' id="username" type="text" className="shadow-sm mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-black focus:outline-none" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password1" className="block font-medium text-sm">Password</label>
          <input onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter password' id="password1" type={!isSee ? 'password' : 'text'} className="shadow-sm mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-black focus:outline-none" />
          <img className='right-3 bottom-3 absolute w-5 h-5 cursor-pointer' onClick={() => { setIsSee(!isSee) }} src={isSee ? notSee : See} />
        </div>
        <div className="mb-4">
          <label htmlFor="password2" className="block font-medium text-sm">Confirm Password</label>
          <input onChange={(e) => { setConfirm(e.target.value) }} placeholder='Confirm password' id="password2" type={!isSee ? 'password' : 'text'} className="shadow-sm mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-black focus:outline-none" />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-2 rounded-md focus:ring-2 focus:ring-blue-500 w-full text-white focus:outline-none"> Register </button>
        <div className='flex justify-center gap-2 mt-2 w-full'>
          <p>Do you have an account?</p>
          <Link className='text-blue-500 underline' to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default React.memo(Register);
