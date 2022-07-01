import React, { useState, useRef } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap'

function Login() {
  //hooks
  const email = useRef('')
  const password = useRef('')

  //functions
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email.current.value, password.current.value)
  }
  return (
    <Container className="auth-container">
      <h2 style={{ fontWeight: 'bolder' }} className="text-center mt-3">
        Login
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="email">
          <Form.Label className="h4 mt-5" sm="4">
            Email
          </Form.Label>
          <Form.Control
            style={{ backgroundColor: 'antiquewhite' }}
            placeholder="email.."
            ref={email}
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Row} controlId="password">
          <Form.Label className="h4 mt-5" sm="4">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            style={{ backgroundColor: 'antiquewhite' }}
            placeholder="password..."
            ref={password}
          ></Form.Control>
        </Form.Group>
        <Button variant="success" className="mt-2">
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login
