import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div >
        <div className="container relative py-2">
            <div className="flex justify-between items-center">
        <Link to={"/"}>    <img src="netflix-logo.png" alt="logo" className='w-32' /></Link>
<Link to="/login"><button className='bg-red-500 text-white font-semibold px-3 py-2 rounded-md'>Sign In</button></Link>
            </div>
        </div>

    </div>
  )
}

export default Navbar