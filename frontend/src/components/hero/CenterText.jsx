import React, { useState } from 'react'
import {ChevronRight} from "lucide-react"
import { useNavigate } from 'react-router-dom'
const CenterText = () => {
    
    const [email, setEmail] = useState("")
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
       navigate("/signup?email="+email)
    }
  return (
    <div className=''>
        <div className="container text-gray-300 text-center py-32     ">
           <div className='space-y-2'>
            <h1 className='text-5xl font-bold text-gray-300'>Unlimited movies,Tv Shows, and More</h1>
            <p className='text-center text-sm text-gray-300'>Watch anywhere.Cancel anytime</p>
            <p className='text-sm text-center'>Ready to watch?Enter your email to create or restart your membership.</p>
            <form className='flex flex-col mx-auto text-center md:flex-row w-1/2 gap-2' onSubmit={handleSubmit}>
               
                <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email Address' className='bg-transparent rounded-md flex-1  focus:outline-none focus:ring border-2 border-gray-900 px-4 ' />
                <button type="submit" className='btn-primary flex items-center  justify-center md:ml-2'>Get Started
                    <ChevronRight className='size-5 md:size-6'/>
                </button>

               
            </form>
           </div>
        </div>
    </div>
  )
}

export default CenterText