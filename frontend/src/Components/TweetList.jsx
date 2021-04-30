import React, {useState, useEffect, useCallback, useContext} from 'react'
import socketIOClient from 'socket.io-client'
import TweetCard from './TweetCard'
import {SocketContext} from '../Context/socket';





export default function TweetList() {
    // , {reconnection: true, forceNew: false}
    // {upgrade: false, reconnection: false, transports: ['websocket'], forceNew: false}
    const [tweetItems, setTweetItems] = useState([])
    const socket = useContext(SocketContext)
    
   
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const handleAdd = useCallback((data) => {
        console.log(tweetItems)
        var count = 15
        let newList = [...tweetItems, data]

        let reverseList = newList.reverse()

        let filteredList = newList.filter(function(d) {
            if(count != 0){
                count--; return true
            } 
            return false
        })

        setTweetItems(newList)
    })

    

    useEffect(() => {

        socket.on('message', (message) => {
            console.log("Recieved a message: ", message)
        })

        
        socket.on('tweets', handleAdd)

        return () => {
            socket.on('disconnect', () => {
                socket.off("tweets");
                socket.off('message')
                socket.removeAllListeners("tweets")
                console.log("Socket Disconnected")
                // socket.emit('connectionClose', () => {})
            })
        }

    }, [tweetItems.length])

    // useEffect(() => {
        

    //     if(connected){
            // socket.on('tweets', data => {
            //     console.info(data);
            //     var newList = [...tweetItems, data]
            //     // newList = newList.reverse()
            //     console.log(newList)
            //     setTweetItems(newList)
            // })
    //     }
        // return () => {
        //     if(socket){
        //         socket.on('disconnect', () => {
        //             socket.off("tweets");
        //             socket.removeAllListeners("tweets")
        //             setConnected(false)
        //             console.log("Socket Disconnected")
        //         })
        //     }
            
        // }
        
    // }, [connected])

    return (
        <div style={{ height: "300rem", scrollY: "auto", overflowY: "auto"}} >
            {tweetItems.map(tweet => {
                return <TweetCard tweet={tweet}/>
            })}
        </div>
    )
}
