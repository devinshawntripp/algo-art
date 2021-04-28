import React, {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import TweetCard from './TweetCard'





export default function TweetList() {
    // const [tweetObj, setTweetObj] = useState({
    //     items: []
    // })
    const [tweetItems, setTweetItems] = useState([])
    const [connected, setConnected] = useState(false)
    var socket = null

  

    useEffect(() => {
        socket = socketIOClient('http://localhost:8174/')
        
        socket.on('connect', () => {
            console.log("Socket has successfully connected to server")
            setConnected(true)
        })
    },[connected])

    useEffect(() => {
        

        if(connected){
            socket.on('tweets', data => {
                console.info(data);
                let newList = [...tweetItems, data]
                console.log(newList)
                setTweetItems(newList)
            })
        }
        return () => {
            if(socket){
                socket.on('disconnect', () => {
                    socket.off("tweets");
                    socket.removeAllListeners("tweets")
                    setConnected(false)
                    console.log("Socket Disconnected")
                })
            }
            
        }
        
    }, [connected])

    return (
        <div style={{ height: "30rem", scrollY: "auto", overflowY: "auto"}} >
            {tweetItems.map(tweet => {
                return <TweetCard tweetText={tweet.text}/>
            })}
        </div>
    )
}
