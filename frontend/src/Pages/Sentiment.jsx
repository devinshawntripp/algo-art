import React, { useState } from 'react'
import {FormControl, Form, Button, Container, Card, Row, Col } from 'react-bootstrap'
import TweetList from '../Components/TweetList'
import axios from 'axios'




export default function Sentiment() {
    const [searchTerm, setSearchTerm] = useState('javascript')

    const searchBox = {
        padding: "2.0rem",
        display: "flex",
        // width: "60.0rem",
        flexDirection: "row",
        width: "75%"
    }

    const handleSubmit = () => {
        console.log(searchTerm)
        axios.post('http://localhost:8174/setSearchTerm', {searchTerm})
    }
    return (
        <Container style={{justifyContent: "center", alignItems: "center", marginLeft: "auto", marginRight: "auto"}}>
            <Col>
                <Row>
                    <Form style={searchBox}>
                        <Form.Control style={{marginRight: "2.0rem"}} type="search" placeholder="Search" value={searchTerm && searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        <Button style={{width: '10.0rem', height: "3.0rem"}} variant="primary" onClick={handleSubmit}>
                            Get Tweets
                        </Button>
                    </Form>
                    {/* <Card style={{backgroundColor: "black", width: "20%", height: "50%"}}>
                        STATISTICS
                    </Card> */}
                    <TweetList />
                </Row>
                
            </Col>
            
        </Container>
    )
}