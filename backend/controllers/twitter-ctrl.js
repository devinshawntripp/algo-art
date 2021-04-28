var twitter = require('twitter');




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


getTweets = async (req, res) => {
    return null
}


module.exports = {
    getTweets
}