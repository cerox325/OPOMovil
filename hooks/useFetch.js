
import {useEffect, useState} from 'react';
const  useFetch = (url) => {

const [loading, setLoading] = useState(true)
const [data, setData] = useState([])

const fetchData = async () => {
    const reponse = await fetch(url)
    const data = await reponse.json()
    setData(data)
    setLoading(false)
}

useEffect(() => {
    fetchData()
}, [])

return {loading, data}
}

export default useFetch