import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function UserScreen() {

    // getting id from url 
    const { _id } = useParams()

    // initialisin state variable 
    const [topicData, setTopicData] = React.useState({ data: [] })

    // initialisin effect hook and this will be called once while page is loading
    React.useEffect(() => {
        getTopicData();
    }, [])

    // this function will collect all data in mondodb using id 
    async function getTopicData() {

        const { data } = await axios.post("/api/topic/get", { _id })
        if (data) {
            updateTopicData(data.topicData.data)
        }
    }

    // this function will update topic data 
    function updateTopicData(data) {
        setTopicData({ ...topicData, data })
    }


    return (
        <div className='row'>
            <div className='userMainDiv'>

                
            </div>
        </div>
    )
}
