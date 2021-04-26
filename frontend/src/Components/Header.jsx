import react from 'react'
import '../Styles/header.css'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import logo from '../AlgoArt.png'
import {Link} from 'react-router-dom'
import '../App.css'






export default function Header() {
    return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm" className="App-header">
            <img src={logo} className="Header-logo" alt="logo"/>
            <Navbar.Brand>Algo-Art</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/" className="navlink">Home</Link>
                    {/* <Link to="/"><Nav.Link href="#features">Features</Nav.Link></Link>
                    <Link to="/"><Nav.Link href="#pricing">Pricing</Nav.Link></Link>
                    <Link to="/"><Nav.Link href="#Apis">Apis</Nav.Link></Link> */}
                    <Link to="/Vitality" className="navlink">Vitality</Link>
                    <Link to="/Sentiment" className="navlink">Sentiment</Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}