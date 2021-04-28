import React from 'react'
import {Card} from 'react-bootstrap'
import './componentcss/TweetCard.css'




export default function TweetCard(props) {
    return (
        <Card className="tweet">{props.tweetText}</Card>
    )
}