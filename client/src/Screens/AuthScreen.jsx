import React from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import { Login, Signup } from '../Components'

function AuthScreen() {
  const [auth, setAuth] = React.useState(false)
  return (
    <div>
      {Cookies.get('JWT') && <Navigate to="/home" />}
      <Container className="home-container m-5 ">
        <Row>
          <Col md={6} className="mt-5">
            <Button variant="outline-info" onClick={() => setAuth(false)}>
              Login
            </Button>
          </Col>
          <Col md={6} className="mt-5">
            <Button variant="outline-primary" onClick={() => setAuth(true)}>
              Signup
            </Button>
          </Col>
        </Row>
        <Container className="home-container mt-3 mx-5 my-5 ">
          {!auth ? <Login /> : <Signup />}
        </Container>
      </Container>
    </div>
  )
}

export default AuthScreen
