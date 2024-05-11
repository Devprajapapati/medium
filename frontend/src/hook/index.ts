import axios from "axios"
import { useEffect, useState } from "react"

interface prop{
    title:string,
    content:string,
    published:boolean
}
export const useBlog = () => {
    const [loading,setLoading] = useState<boolean>(true)
    const [blog,setBlogs] = useState<prop[]>([])

    
    useEffect(()=>{
axios.get('http://localhost:8787/api/v1/blog/getallblog',{
    headers:{
        Authorization: localStorage.getItem('token')
    }
})
.then((response)=>{setBlogs(response.data.postFound)})
        setLoading(false)
    },[])


    return {
        loading,blog
    }
}

interface hub{
    id: string;
    title: string;
    content: string;
    author:{
        name:string
    }
}

export const useSingle = ({postid}:{postid:string}) =>{
    const [loading,setLoading] = useState<boolean>(true)
    const [blog,setBlog] = useState<hub>({})

    useEffect(()=>{
        async function api(){
            axios.get(`http://localhost:8787/api/v1/blog/getblog/${postid}`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            .then((response)=>{setBlog(response.data.id),console.log("datblog",response)})
                    setLoading(false)
        }
        api()
            },[postid])

    return {
        loading,blog
    }
}