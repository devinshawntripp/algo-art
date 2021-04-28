const Twitter = require('twitter')



module.exports = (app, io) => {
    var client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    let socketConnection;
    let twitterStream;


    app.locals.searchTerm = 'Javascript'
    app.locals.showRetweets = false;

    //twitter stream
    const stream = () => {
        console.log("Resuming stream for: " + app.locals.searchTerm)
        client.stream('statuses/filter', {track: app.locals.searchTerm, tweet_mode: 'extended', language: 'en'}, (stream) => {
            stream.on('data', (data) => {
                sendMessage(data)
             });

             stream.on('error', (error) => {
                 console.log(error)
             })

             twitterStream = stream
        })
    }




    //twitter stream
    io.on('connection', socket => {
        socketConnection = socket;
        stream();
        socket.on("connection", () => console.log("Client has connected to the server"))
        socket.on("disconnect", () => console.log("Client has disconnected to the server"))
    })


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