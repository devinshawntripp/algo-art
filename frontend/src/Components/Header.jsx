import react from 'react'
import '../Styles/header.css'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import logo from '../AlgoArt.png'
import '../App.css'






export default function Header() {
    return (
        <Navbar collapseOnSelect fixed="top" bg="dark" variant="dark" expand="sm">
            <img src={logo} className="Header-logo" alt="logo"/>
            <Navbar.Brand href="#home">Algo-Art</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <Nav.Link href="#Apis">Apis</Nav.Link>
                    <Nav.Link href="#Vitality">Vitality</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}