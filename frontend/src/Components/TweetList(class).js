import React, {useContext} from 'react'
import socketIOClient from 'socket.io-client'
import TweetCard from './TweetCard'
import {SocketContext} from '../Context/socket';
import { render } from '@react-three/fiber';





class TweetList extends React.Component {

    static contextType = SocketContext;
    constructor(props) {
        super(props)
        
        this.state = {
            socket: this.context
        }
    }

    

    componentDidMount() {
        console.log(this.state.socket)

    }

    componentWillUnmount() {

    }



    render() {
        return (
            <div>HELLO</div>
        )
    }
   
    // const sleep = (milliseconds) => {
    //     return new Promise(resolve => setTimeout(resolve, milliseconds))
    // }

    // const handleAdd = useCallback((data) => {
    //     var count = 15
    //     let newList = [...tweetItems, data]

    //     // let reverseList = newList.reverse()

    //     // let filteredList = newList.filter(function(d) {
    //     //     if(count != 0){
    //     //         count--; return true
    //     //     } 
    //     //     return false
    //     // })

    //     setTweetItems(newList)
    // })


    

    

    // useEffect(() => {

    //     socket.on('message', (message) => {
    //         console.log("Recieved a message: ", message)
    //     })
    //     socket.emit("connectionToTwitter", "connecting")
        
        

    //     return () => {
    //         socket.on('disconnect', () => {
    //             socket.off("tweets");
    //             socket.off('message')
    //             socket.off('connectionToTwitter')
    //             socket.removeAllListeners("tweets")
    //             console.log("Socket Disconnected")
    //             // socket.emit('connectionClose', () => {})
    //         })
    //     }

    // }, [])

    // useEffect(() => {
    //     socket.on('tweets', handleAdd)
    //     return () => {
    //         socket.on('disconnect', () => {
    //             socket.off("tweets");
           
    //             socket.removeAllListeners("tweets")
    //             console.log("Socket Disconnected")
    //         })
    //     }
    // }, [tweetItems.length])

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
    



    // <div style={{ height: "300rem", scrollY: "auto", overflowY: "auto"}} >
            //     {tweetItems.map(tweet => {
            //         return <TweetCard tweet={tweet}/>
            //     })}
            // </div>
    
    
}



export default TweetList;
