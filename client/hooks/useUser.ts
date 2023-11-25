import { getCookies } from "@/lib/actions/AuthCookies";
import { useEffect, useState } from "react"
import { UserDoc } from '../../server/src/user/types'


function useUser () {
    const [data , setData] = useState<UserDoc>()
    const [loading , setLoading] = useState<boolean>(true);
    const [error, setError] = useState();

    const fetchData = async () => {
        const accessTocken = await getCookies()
        try {
            setLoading(true)
            const response = await fetch(process.env.NEXT_PUBLIC_Server_Url + 'user' ,{
                method :'GET' ,
                headers:{
                  Authorization : "Bearer "+ accessTocken
                },
                next : { tags : ['user']}
              } );
            const data = await response.json()
            setData(data);
        } catch (error : any) {
            setError(error);
            setLoading(false);
        }
        setLoading(false);
    }

    useEffect (() => {fetchData()} , [])
    return { data, loading, error } ; 
}



export default useUser;