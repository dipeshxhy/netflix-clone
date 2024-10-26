import React from 'react'
import {Link} from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className='h-screen bg-gradient-to-b from-black to-gray-800' style={{backgroundImage:"url(/404.png)"}}>
        <div className='bg-black w-full'>
        <header className='container py-4 ' >
            <Link to={"/"}><img src="/netflix-logo.png" alt="" className='w-32'/></Link>
        </header>

        </div>
        <main className='text-center mt-20 error-page-content'>
            <h1 className='text-center font-semibold text-4xl py-10'>Lost Your Way</h1>
            <p className='text-lg font-bold  mb-8'>Sorry,We can't find that page. you'll find lots to explore on the home page.</p>
            <Link to={"/"} className='text-xl  rounded font-bold '><span className='bg-slate-100 text-black p-3 rounded '>Netflix Home </span> </Link>
        </main>

    </div>
  )
}

export default NotFoundPage