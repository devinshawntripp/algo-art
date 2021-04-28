const express = require('express')
const http = require('http')
const path = require('path');
var socketio = require('socket.io')
const bodyparser = require('body-parser')
const PORT = process.env.PORT || 8174
const app = express()
// const cors = require('cors')
const twitterRouter = require('./routers/twitter-router')
require('dotenv').config();
// streamHandler = require('./utils/streamHandler');
var twitter = require('twitter');

//require('dotenv').config({ path: path.resolve(__dirname, '/home/STUDENTS/CSELibrary/unt-library-system/server/.env') });

const server = http.createServer(app);
const io = socketio(server, {
   cors: {
     origin: "*",
     methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
     allowedHeaders:["secretHeader"],
     credentials: true
   }
   });



// app.use(express.static(path.join(__dirname, '../client/build')))
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(cors())
// app.use('/twitter', twitterRouter)
require('./routers/twitter-router.js')(app, io)



// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))




// var client = new Twitter({
//     consumer_key: process.env.CONSUMER_KEY,
//     consumer_secret: process.env.CONSUMER_SECRET,
//     access_token_key: process.env.ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.ACCESS_TOKEN_SECRET
// });


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

