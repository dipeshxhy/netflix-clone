import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'

const SignUpPage = () => {
    const { searchParams } = new URL(document.location)
    const emailValue = searchParams.get("email")
    const [email, setEmail] = useState(emailValue || "")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { signup } = useAuthStore()
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        signup({ email, username, password })
    
    }

    return (
        <div className='bg-hero relative h-screen text-white'>
            <header className='container mx-auto py-2 '>
                <div>
                    <Link to={"/"}>
                        <img src="/netflix-logo.png" className='w-52 ' alt="" />
                    </Link>
                </div>
            </header>
            <div className='w-full flex justify-center items-center '>
                <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                    <h1 className='text-3xl font-semibold text-center'>Sign Up</h1>
                    <form className='space-y-3' onSubmit={handleSignUp}>
                        <div>
                            <label htmlFor="email" className='block text-sm text-gray-300 font-medium'>Email</label>
                            <input type="email" id='email' className='w-full px-2 py-1 border border-gray-700 bg-transparent rounded-md focus:outline-none focus:ring text-white' placeholder='you@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="username" className='block text-sm text-gray-300 font-medium'>Username</label>
                            <input type="text" id='username' className='w-full px-2 py-1 border border-gray-700 bg-transparent rounded-md focus:outline-none focus:ring text-white ' placeholder='johndoe' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="pssword" className='block text-sm text-gray-300 font-medium'>Password</label>
                            <input type="password" id='email' className='w-full px-2 py-1 border border-gray-700 bg-transparent rounded-md focus:outline-none focus:ring text-white ' placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className='w-full bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 '>Sign Up</button>
                    </form>
                    <div className='text-center text-gray-300'>
                        Already a member?
                        <Link to={"/login"} className='text-red-600 hover:underline ml-3'>Sign in </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
