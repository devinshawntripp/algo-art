const Twitter = require('twitter')
// const tf = require('@tensorflow/tfjs')
const tf = require('@tensorflow/tfjs-node')


module.exports = async (app, io) => {
    var client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        // bearer_token: process.env.TWITTER_BEARER_TOKEN
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    const model = await tf.node.loadSavedModel('/Users/devintripp/Desktop/Current\ Work/SentimentAI/SentimentModel')


    let timeout = 0

    let socketConnection;
    let twitterStream;
    var dataItems = []


    app.locals.searchTerm = 'giveaway'
    app.locals.showRetweets = false;

    //twitter stream
    const streamtweets = () => {
       
        twitterStream = client.stream('statuses/filter', {track: app.locals.searchTerm, tweet_mode: 'extended', language: 'en'})

        twitterStream.on('data', (data) => {
            // sendMessage(data)
            addDataItem(data)
        })

        twitterStream.on('error', (error) => {
            console.log("error")
        })

        // // Close the stream after 30 seconds
        setTimeout(() => {
            twitterStream.removeAllListeners('data')
            console.log("Twitter stream closed")
        }, 100 * 1000);


        
    }


    const SERVER_STATE = {
        totalConnections: 0
      } 

    const sleep = async (delay) => {
        return new Promise((resolve) => setTimeout(() => resolve(true), delay));
    };

    


    //twitter stream
    io.on('connection', socket => {
        console.log(socket.id)
        console.log("Client has connected to the server")
        SERVER_STATE.totalConnections++;
        socketConnection = socket;
        socket.emit('message', `Welcome from server. There are a total of ${SERVER_STATE.totalConnections} connections.`);
        socket.broadcast.emit('message', `New user joined. There are a total of ${SERVER_STATE.totalConnections} connections.`);


        socket.once('connectionToTwitter', (data) => {
            console.log("Connecting to: ", data)
            streamtweets();
        })
        

        // socket.once('connectionToTwitter', () => {
        //     // console.log(socket.id)
            
        //     // console.log("Client has connected to the server")
            
        // })

        socket.on('message', (message) => {
            console.log("Server message: ", message)
        })


    
        socket.on("disconnect", () => {
            SERVER_STATE.totalConnections--;
            console.log("Client has disconnected to the server")
            socket.removeAllListeners("connectionToTwitter")
        })
    })

    const reconnect = async (stream, socket) => {
        timeout++;
        stream.destroy()
        await sleep(2 ** timeout * 1000);
        // streamTweets(socket, token);
        streamtweets()
    };


    /**
     * Sets search term for twitter stream.
     */
    app.post('/setSearchTerm', (req, res) => {
        let term = req.body.searchTerm;
        app.locals.searchTerm = term;
        if(twitterStream){
            twitterStream.destroy();
        }
        console.log("Hjjhjhkhjgjhfgjh")
        streamtweets();
    });


    const sendMessage = (data) => {
        if(data.text.includes('RT')){
            return;
        }
        
        setInterval(function() {
            console.log("This should only run every 5 seconds")
            socketConnection.emit("tweets", data)
        }, 5000);
    }



    const addDataItem = data => {
        if(data.text.includes('RT')){
            return;
        }



        dataItems.push(data)
        console.log(dataItems.length)
        if(dataItems.length == 3){
            socketConnection.emit("tweets", dataItems)
            dataItems = []
        }
    }
    
    
    // const stream = client.stream('statuses/filter', {track: 'cyberpunk', tweet_mode: 'extended', language: 'en'});
    // stream.on('data', (data) => {
    //    if (!data.retweeted_status) {
    //       const tweetText = data?.extended_tweet?.full_text || data.text;
    //       console.log(tweetText);
    //    }
    // });
    // stream.on('error', (error) => {
    //    throw error;
    // });
}