  import { LogOut, MenuIcon, Search } from 'lucide-react'
  import React, { useState } from 'react'
  import { Link } from 'react-router-dom'
  import {useAuthStore} from "../../store/authUser"
  import { useContentStore } from '../../store/content'

  const HomeNavbar = () => {
    const [showMenu,setShowMenu]= useState(false)
  const {user,logout}= useAuthStore()
  const{setContentType}= useContentStore()
    return (
      <div>
          <div className="container z-50 relative flex justify-between items-center py-5">
              <div className='flex  items-center gap-2'>
                <Link to={"/"}> <img src="/netflix-logo.png" alt="logo" className='w-32   md:w-40' /></Link>
                  <div>
                      <ul className=' gap-2 hidden  sm:flex '>
                    <Link to={"/"} onClick={()=>setContentType("movie")} >    <li className='cursor-pointer hover:underline transition-all duration-200'>Movies</li></Link> 
                      <Link to={"/"} onClick={()=>setContentType("tv")}>   <li className='cursor-pointer hover:underline transition-all duration-200'>Tv Shows</li></Link>
                      <Link to={"/history"}>  <li className='cursor-pointer hover:underline transition-all duration-200'>Search History</li></Link> 
                      </ul>
                  </div>
              </div>
              <div className='flex gap-2 items-center '>
                <Link to="/search"> <Search className='size-5 cursor-pointer'/></Link> 
                  <img src={user.image} alt="" className='size-5' />
              <LogOut className='size-5 cursor-pointer' onClick={logout} />
                  <MenuIcon className='sm:hidden block' onClick={()=>setShowMenu(!showMenu)} />
              </div>
          </div>
          {
              showMenu && (
  <div className='container absolute bg-black/60 h-full top-20 z-[999]  '>
              <div >
                  <ul className='text-lg font-semibold space-y-2'>
                    <Link to={"/"} onClick={()=>setContentType("movie")} >  <li className='cursor-pointer hover:underline ' >Movies</li></Link>
                    <Link to={"/"} onClick={()=>setContentType("tv")}> <li className='cursor-pointer hover:underline'>TV Shows</li></Link> 
                  <Link to="/history">  <li className='cursor-pointer hover:underline '>Search History</li></Link> 
                  </ul>
              </div>

          </div>
              )
          }
          
      </div>
    )
  }

  export default HomeNavbar