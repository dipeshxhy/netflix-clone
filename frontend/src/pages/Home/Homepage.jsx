import React from 'react'
import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { useAuthStore } from '../../store/authUser'

const Homepage = () => {
 const {user}=useAuthStore()
  return (
   <div className='relative '>
    {
user?<HomeScreen/> :<AuthScreen/>
    }
   </div>
  )
}

export default Homepage