import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useContentStore } from '../store/content'

const useGetTrendingContent = () => {
const [trendingContent, setTrendingContent] = useState(null)
const {contentType}=useContentStore()
useEffect(()=>{
    const getTrendingContent=async()=>{
        const response=await axios.get(`/api/${contentType}/trending`)
        setTrendingContent(response.data.content)

    }
    getTrendingContent()
},[contentType])

return {trendingContent}
}

export default useGetTrendingContent