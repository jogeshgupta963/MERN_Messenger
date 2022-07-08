import React, { useState, useRef } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap'
import { Link, Navigate, useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Message } from './index'
import { useSelector, useDispatch } from 'react-redux'

import { getUser } from '../redux/user.js'
function Login() {
  //hooks
  const email = useRef('')
  const password = useRef('')
  const [msg, setMsg] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/user/login', {
        email: email.current.value,
        password: password.current.value,
      })

      if (data.status === 'success') {
        setMsg({
          variant: 'success',
          msg: data.msg,
        })
        dispatch(getUser(data.data))
        navigate('/home')
        return
      }
      setMsg({
        variant: 'danger',
        msg: data.msg,
      })
    } catch (error) {
      setMsg({
        variant: 'danger',
        msg: error.message,
      })
    }
  }
  return (
    <>
      <Container className="auth-container">
        <h2 style={{ fontWeight: 'bolder' }} className="text-center mt-3">
          Login
        </h2>
        <Message variant={msg.variant} msg={msg.msg} />
        <Form>
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

          <Button variant="success" className="mt-2" onClick={handleSubmit}>
            Login
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Login
