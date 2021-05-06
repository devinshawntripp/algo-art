import React, {useState, useEffect, useCallback, useContext} from 'react'
import socketIOClient from 'socket.io-client'
import TweetCard from './TweetCard'
import {SocketContext} from '../Context/socket';





export default function TweetList() {
    // , {reconnection: true, forceNew: false}
    // {upgrade: false, reconnection: false, transports: ['websocket'], forceNew: false}
    const [tweetItems, setTweetItems] = useState([])
    const socket = useContext(SocketContext)
    const [everyThree, setEveryThird] = useState(0)
    
   
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const handleAdd = useCallback((data) => {
        var count = 15
        
        // let newList = [...tweetItems, data]
        let newList = tweetItems.concat(data)

        let reverseList = newList.reverse()

        // let filteredList = newList.filter(function(d) {
        //     if(count != 0){
        //         count--; return true
        //     } 
        //     return false
        // })
        //update the dom every third item
        
        console.log(newList)

        setTweetItems(reverseList)
    })

    useEffect(() => {
        socket.emit("connectionToTwitter", "connecting")
        return () => {
            socket.on('disconnect', () => {
                socket.off('connectionToTwitter')
            })
        }
    }, [])
    

    

    useEffect(() => {

        socket.on('message', (message) => {
            console.log("Recieved a message: ", message)
        })
        
        
        socket.once('tweets', handleAdd)

        return () => {
            socket.on('disconnect', () => {
                socket.off("tweets");
                socket.off('message')
                socket.off('connectionToTwitter')
                socket.removeAllListeners("tweets")
                console.log("Socket Disconnected")
                // socket.emit('connectionClose', () => {})
            })
        }

    }, [tweetItems.length])


        

    return (
        <div style={{ height: "400px", scrollY: "auto", overflowY: "auto"}} >
            {tweetItems.map(tweet => {
                return <TweetCard tweet={tweet}/>
            })}
        </div>
    )
}
