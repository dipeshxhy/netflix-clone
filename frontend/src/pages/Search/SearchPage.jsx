import React, { useState } from 'react'
import HomeNavbar from '../../components/Navbar/HomeNavbar'
import { useContentStore } from '../../store/content'
import { Search } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { ORIGINAL_IMG_BASE_URL } from '../../utils/constants'

const SearchPage = () => {
    const [activeTab,setActiveTab]=useState("movie")
    const [searchTerm,setSearchTerm]=useState("")
    const [results,setResults]=useState([])
    const {setContentType} =useContentStore()
    const handleTabClick=(tab)=>{
        setActiveTab(tab)
        tab==="movie"?setContentType("movie"):setContentType("tv")
        setResults([])
    }
    const handleSearch=async(e)=>{
        e.preventDefault()
        try {
            const res=await axios.get(`/api/search/${activeTab}/${searchTerm}`)
            setResults(res.data.content)
            
        } catch (error) {
            // console.log(error.response)
            if(error.response.status===404){
                toast.error("Nothing found,make sure you are searching under the right category")
            }else{
                toast.error("An error occurred ,please try again later")
            }
            
        }
    }
console.log("results",results)

  return (
    <div className=' '>
        <div className='relative bg-black'>
            <HomeNavbar/>
            <div className="container  "> 
                <div className='space-x-7 text-center'>

            <button onClick={()=>handleTabClick("movie")} className={`px-4 py-2 rounded ${activeTab==="movie"?"bg-red-600":"bg-gray-800"} hover:bg-red-700` }>Movie</button>
            <button onClick={()=>handleTabClick("tv")} className={`px-4 py-2 rounded ${activeTab==="tv"?"bg-red-600":"bg-gray-800"} hover:bg-red-700` }>TV Shows</button>
            <button onClick={()=>handleTabClick("person")} className={`px-4 py-2 rounded ${activeTab==="person"?"bg-red-600":"bg-gray-800"} hover:bg-red-700` }>Person</button>
                </div>
                <form onSubmit={handleSearch}  className='flex gap-2 items-stretch py-8 bg-transparent justify-center '>
                    <input type="text" className='w-3/4  bg-gray-800 p-2 rounded text-lg focus:outline-none focus:ring ' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder={'Search for a ' + activeTab}  />
                    <button type="submit" className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
                        <Search className='size-6'/>
                    </button>
                </form>
                <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
                    {
                        results.map((result)=>{
                            if(!result.poster_path && !result.profile_path) return null

                            return (
                                <div key={result.id} className='bg-gray-800 p-4 rounded'
                                >
                                    {
                                        activeTab==="person"?(
                                            <div to={"/actor/"+result.name} className='flex flex-col items-center'>
                                            <img src={ORIGINAL_IMG_BASE_URL+result.profile_path}  alt={result.name} className='max-h-96 rounded mx-auto' />
                                            <h2 className='text-xl font-bold mt-2'>{result.name}</h2>
                                            </div>
                                        ):(
                                            <Link to={"/watch/"+result.id}
                                            onClick={()=>setContentType(activeTab)}
                                            >
                                            <img src={ORIGINAL_IMG_BASE_URL + result.poster_path} alt={result.title || result.name} className='w-full h-auto rounded' />
                                            <h2 className='text-xl font-bold mt-2'>{result.title || result.name}</h2>

                                            </Link>
                                        )
                                    }

                                </div>

                            )

                            
                        })
                    }

                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchPage