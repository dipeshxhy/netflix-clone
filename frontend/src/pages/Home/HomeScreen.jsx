import React from 'react'
import { useAuthStore } from '../../store/authUser'
import HomeNavbar from '../../components/Navbar/HomeNavbar'
import HomeHero from '../../components/Home Screen/Home Hero/HomeHero'
import Footer from '../../components/footer/Footer'


const HomeScreen = () => {
  const {logout}=useAuthStore()
  return (
    <div className='relative z-[999] bg-black/35 '>
      <HomeNavbar/>
      <HomeHero/>
    
 
    
    </div>
  )
}

export default HomeScreen