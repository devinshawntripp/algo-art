import React from 'react'
import {FormControl, Form, Button, Container } from 'react-bootstrap'




export default function Sentiment() {

    const searchBox = {
        padding: "2.0rem",
        display: "flex",
        // width: "60.0rem",
        flexDirection: "row",

    }
    return (
        <Container style={{justifyContent: "center", alignItems: "center", marginLeft: "auto", marginRight: "auto"}}>
            <Form style={searchBox}>
                <Form.Control style={{marginRight: "2.0rem"}} type="search" placeholder="Search" />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}