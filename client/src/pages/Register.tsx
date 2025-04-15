import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmpassRef = useRef<HTMLInputElement>(null)
  const[loading, setLoading] = useState(false)
  const[error, setError] = useState('')
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const password = passwordRef.current?.value;
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const confirmPassword = confirmpassRef.current?.value;

    setLoading(true)


    if (password != confirmPassword && username){
      alert('password does not match')
      setLoading(false)
      return
    }

    try {
      await api.post('/api/register/', { username , email , password })
      .then(res=> {
        if(res.status == 201) navigate("/login")
      })
    } catch (error: any) {
      setError(error.response?.data.password)
      console.log(error)
      setLoading(false)
    }
  }

    useEffect(() => {
      if (isAuthenticated) {
        navigate('/dashboard');  // 🔁 redirect if already logged in
      }
    }, [isAuthenticated, navigate]);

  return (
    <div className='flex flex-col justify-center items-center h-[100vh] space-y-2'>
      <div className='border-2 border-red-600 py-4 px-12' hidden={!error}>
        <h3 className='font-medium text-xl'>{error}</h3>
      </div>
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <h3 className='font-bold text-lg md:text-xl text-amber-600'>Register to Start Guessing</h3>
      <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-4 p-12 rounded-3xl border-1 border-amber-400 drop-shadow-2xl'>
          <div className='flex flex-col'>
            <label htmlFor="username">Username: </label>
            <input type="text" name='username' placeholder='username' className='border-1 rounded-3xl p-2' ref={usernameRef} required/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="email">Email: </label>
            <input type="email" name='email' placeholder='email' className='border-1 rounded-3xl p-2' ref={emailRef} required/>
          </div>
        <div className='flex flex-col'>
          <label htmlFor="password" className='space-x-0.5'>Password: </label>
          <input type="password" name='password' placeholder='password' className='border-1 rounded-3xl p-2' ref={passwordRef} required/>
        </div>        
        <div className='flex flex-col'>
          <label htmlFor="password" className='space-x-0.5'>Confirm Password: </label>
          <input type="password" name='password' placeholder='password' className='border-1 rounded-3xl p-2' ref={confirmpassRef} required/>
        </div>   
        <button className='border-amber-800 border-1 py-2 px-4 rounded-3xl hover:bg-amber-500 hover:text-white font-medium cursor-pointer' disabled={loading} >
        {loading ? (<>
                          <div role="space-x-2">
                              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                              </svg>
                          </div>
                          </>) : "Register"}
        </button>
      </form>
      <p className=''>Already have an account? <span className='text-red-600 font-medium'><Link to="/login">Login...</Link></span></p>
    </div>
  )
}

export default Register