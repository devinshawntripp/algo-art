import React from 'react'
import {Card} from 'react-bootstrap'
import background from '../MachineLearningbackground.jpeg'
import './PageStyles/Home.css'
import DotsAnimation from '../Components/DotsAnimation'



export default function Home() {
    const cardStyle = {
        width: "30%",
        flexWrap: "wrap", 
        // backgroundColor: "rgb(82, 95, 127)",
        // backgroundColor: "rgb(248, 249, 254)",
        backgroundColor: "rgb(41, 46, 56)",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "25%",
        height: "20.0rem"

    }

    const rowOfCards = {
        display: "flex",
        flexDirection: "row"
    }
    return (
        <>
        {/* <img src={background} className="background-image"/> */}
        
        <div>
            <div id="title">Algorithimic Art</div>
            <div id="animation">
                <DotsAnimation />
            </div>
            
            <div style={rowOfCards}>
            {/* <Card style={cardStyle}>
                <div style={{marginTop: "1.0rem"}}>Who are we?</div>
            <div style={{marginTop: "50%", width: "75%", marginLeft: "auto", marginRight: "auto"}}>Algorithmic Art is a company that is focused on bringing machine learning applications to your business</div></Card>
            <Card style={cardStyle}>Algorithmic Art is a company that is focused on bringing machine learning applications to your business</Card>
            <br></br>
            <Card style={cardStyle}>Many business have access to a wide variety of machine learning models, but are unsure how to use them for there specific use case.
                That's where we come in. Algorithmic Art will fine tune these algorithms to work for your specific business and use case. Everything from sentiment analysis,
                to determining stock in inventory by calibrating patterns in your business. 
            </Card> */}
            </div>
        </div>
        </>
    );
}