import React from 'react'
import {Card, Row} from 'react-bootstrap'
import './componentcss/TweetCard.css'




export default function TweetCard(props) {
    return (
        <Card className="tweet">
            <Row style={{display: "flex", flexWrap: "nowrap", padding: "5px"}}>
                <img src={props.tweet.user.profile_image_url} className="twitter_prof_pic"/>

                <div>
                {props.tweet.text}
                </div>
            </Row>
            
            
        </Card>
    )
}