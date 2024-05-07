import {Container, Nav, Navbar, Button} from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  logout, isAuthenticated, amIAdmin } from "../../app/slices/userSlice";

import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const hasAcces =  useSelector(isAuthenticated)
  const isAdmin = useSelector(amIAdmin)
  const dispatch = useDispatch();

  const logoutAction =()=>{
    dispatch(logout())
    navigate("/")
  }
  return (
    <>
      <Navbar fixed="top" bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/home">
          <img
              src="../src/images/LogoBTS.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          
          <Nav className="me-auto">
            {hasAcces && (
              <>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/characters">Tatuadores</Nav.Link>
                <Button variant="primary" size="lg" onClick={()=> logoutAction()}>Log out</Button>
                </>
            )}
            {!hasAcces &&  (
              <>
               <Nav.Link href="/login">Login</Nav.Link>
               <Nav.Link href="/register">Sign Up</Nav.Link>
              </>

            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;