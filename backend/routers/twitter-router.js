const Twitter = require('twitter')



module.exports = (app, io) => {
    var client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    let timeout = 0

    let socketConnection;
    let twitterStream;


    app.locals.searchTerm = 'giveaway'
    app.locals.showRetweets = false;

    //twitter stream
    const streamtweets = async () => {
        console.log("Resuming stream for: " + app.locals.searchTerm)
        client.stream('statuses/filter', {track: app.locals.searchTerm, tweet_mode: 'extended', language: 'en'}, (streamData) => {
            streamData.on('data', (data) => {
                sleep(1000)
                sendMessage(data)
             });

             streamData.on('error', (error) => {
                 console.log(error)
             })

             twitterStream = streamData
        })
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
        streamtweets();

        // socket.once('connectionToTwitter', () => {
        //     // console.log(socket.id)
            
        //     // console.log("Client has connected to the server")
            
        // })

        socket.on('message', (message) => {
            console.log("Server message: ", message)
        })


        // socket.on('connectionClose', () => {
        //     SERVER_STATE.totalConnections--;
        //     console.log("Client has disconnected to the server")
        // })
        socket.on("connection", () => console.log("Client has connected to the server"))
        socket.on("disconnect", () => {
            SERVER_STATE.totalConnections--;
            console.log("Client has disconnected to the server")
            // twitterStream.destroy()
            // socket.off()

            // reconnect(twitterStream, socket)
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
        twitterStream.destroy();
        streamtweets();
    });


    const sendMessage = (data) => {
        if(data.text.includes('RT')){
            return;
        }
        
        socketConnection.emit("tweets", data)
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