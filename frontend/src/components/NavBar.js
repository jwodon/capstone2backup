import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/NavBar.css'; // Import custom styles

function NavBar() {
    const context = useContext(UserContext);

    if (!context) {
        return null;
    }

    const { currentUser, logout } = context;

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="navbar-custom">
            <Container fluid>
                {' '}
                {/* Switch to container-fluid */}
                <Navbar.Brand as={Link} to="/" className="text-white">
                    TrackTDEE
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/about" className="text-white">
                            About TDEE
                        </Nav.Link>

                        {currentUser && (
                            <Nav.Link as={Link} to="/charts" className="text-white">
                                Progress
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {currentUser ? (
                            <>
                                <Nav.Link as={Link} to="/profile" className="text-white">
                                    {currentUser.username}
                                </Nav.Link>
                                <Nav.Link as={Link} to="/" onClick={logout} className="text-white">
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="text-white">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup" className="text-white">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
