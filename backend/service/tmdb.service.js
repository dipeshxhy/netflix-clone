import axios from "axios";



    export const fetchfromTMDB=async(url)=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer '+process.env.TMDB_API_KEY
            }
          };
          
          const response = await axios.get(url, options);
          if(response.status!==200){
            throw new Error(`Failed to fetch data from TMDB: ${response.statusText}`)
          }
          return response.data
    }