import axios from 'axios'
import React, { useEffect, useState } from 'react'
import HomeNavbar from '../../components/Navbar/HomeNavbar'
import { SMALL_IMG_BASE_URL } from '../../utils/constants'
import { Trash } from 'lucide-react'

const SearchHistory = () => {
    const [searchHistory,setSearchHistory]=useState([])

    useEffect(()=>{
const getSearchHistory=async()=>{
    try {
        const response=await axios.get('/api/search/history')
        setSearchHistory(response.data.content)
        
    } catch (error) {
        console.log(error.message)
        setSearchHistory([])
        
    }
}
    getSearchHistory()
    
    },[])
    if(searchHistory?.length===0){
        return(
            <div>
                <HomeNavbar/>
                <h1 className='text-xl font-extrabold text-center'>Search History</h1>
                <p className='text-lg font-bold text-center'>No Search History Found 😥   </p>
            </div>
        )
    }
    const formatDate=(dateString)=>{
        const date=new Date(dateString)
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }
const handleDelete=async(item)=>{
    try {
        await axios.delete(`/api/search/history/${item.id}`)
        setSearchHistory(searchHistory.filter((i)=>i.id!==item.id))
        
    } catch (error) {
        console.log(error.message)
        
    }
 
}
  return (
    <div className='bg-black'>
        <HomeNavbar />
        <div className="container">
        <h1 className='text-2xl font-bold text-center py-3'>Search History</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
                {
                    searchHistory.map((item)=>(
                        
                        <div key={item.id} className='bg-gray-800 rounded p-4 flex items-center gap-4'>

<img src={SMALL_IMG_BASE_URL + item.image} alt={item.name || item.title} className='size-16 rounded-full object-cover' 

/>

<div className='flex  flex-col gap-2'>
    <span className='text-sm font-bold'>{item.title} 

       
    </span>
<span className='text-sm'>{formatDate(item.createdAt)} </span>
<span
className={`py-1 px-3 text-center rounded-full text-sm ml-auto ${item.searchType==="movie"?"bg-red-600":item.searchType==="tv"?"bg-blue-600":"bg-green-500"}`}
>
{item.searchType[0].toUpperCase()+item.searchType.slice(1)}
</span>

</div>

<Trash className='size-5 hover:fill-red-600 hover:text-red-600' onClick={()=>handleDelete(item)}/>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default SearchHistory