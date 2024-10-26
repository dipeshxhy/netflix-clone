import React, { useEffect } from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import Homepage from './pages/Home/Homepage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Footer from './components/footer/Footer'
import  { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUser'
import { Loader } from 'lucide-react'
import WatchPage from './pages/Watch Page/WatchPage'
import SearchPage from './pages/Search/SearchPage'
import SearchHistory from './pages/Search History/SearchHistory'
import NotFoundPage from './pages/Not Found/NotFoundPage'



const App = () => {
 const{user,isCheckingAuth,authCheck}= useAuthStore()


 useEffect(()=>{
   
     authCheck()
   
 },[authCheck])
 if(isCheckingAuth){
  return (
    <div className='h-screen'>
      <div className='flex justify-center items-center h-full bg-black'>
        <Loader className='animate-spin text-red-600 size-10'/>
      </div>

    </div>
  )
 }
  return (
    <div className='bg-black relative h-screen  w-full text-white'>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={!user?<LoginPage/>:<Navigate to={"/"} />} />
        <Route path='/signup' element={!user?<SignUpPage/>:<Navigate to={"/"} />} />
        <Route path='/watch/:id' element={user?<WatchPage/>:<Navigate to={"/login"} />} />
        <Route path='/search' element={user?<SearchPage/>:<Navigate to={"/login"} />} />
        <Route path='/history' element={user?<SearchHistory/>:<Navigate to={"/login"} />} />
        <Route path='/*' element={<NotFoundPage/>} />


      </Routes>
      <Footer/>
      <Toaster/>
    </div>
  )
}

export default App