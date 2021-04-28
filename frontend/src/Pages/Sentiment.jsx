import React, { useState } from 'react'
import {FormControl, Form, Button, Container, Card, Row, Col } from 'react-bootstrap'
import TweetList from '../Components/TweetList'




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
        fetch('/setSearchTerm', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({searchTerm})
        })
    }
    return (
        <Container style={{justifyContent: "center", alignItems: "center", marginLeft: "auto", marginRight: "auto"}}>
            <Col>
                <Row>
                    <Form style={searchBox}>
                        <Form.Control style={{marginRight: "2.0rem"}} type="search" placeholder="Search" />
                        <Button style={{width: '10.0rem'}} variant="primary" onClick={handleSubmit}>
                            Get Tweets
                        </Button>
                    </Form>
                    <Card style={{backgroundColor: "black", width: "20%", height: "50%"}}>
                        STATISTICS
                    </Card>
                    <TweetList/>
                </Row>
                
            </Col>
            
        </Container>
    )
}