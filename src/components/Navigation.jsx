import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.jpg';

class Navigation extends React.Component {
  logout_handler = async(e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    console.log(token)
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL + 'logout', {
        method: 'POST',
        body: JSON.stringify({token: token.toString()}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (res.status !== 200) throw new Error('Exception message');
      localStorage.removeItem("token")
      localStorage.removeItem("time")
      window.location.href = '/login'
    }
    catch (e){
      console.log(e);
    }

  };

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand
          href="http://iiitvadodara.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt="IIIT Vadodara"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {this.props.islogedIn ? (
              <Nav.Link href="/generate">Generate Certificates</Nav.Link>
            ) : null}
            <Nav.Link href="/verify">Verify Certificates</Nav.Link>
            {this.props.islogedIn? (
              <Nav.Link onClick={this.logout_handler}>Logout</Nav.Link>
            ) : null}
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
