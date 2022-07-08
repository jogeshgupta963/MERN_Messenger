import React, { useState, useRef } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

import { Message } from './index'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/user.js'

function Signup() {
  //hooks
  const email = useRef('')
  const name = useRef('')
  const password = useRef('')
  const confirmPassword = useRef('')
  const [msg, setMsg] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password.current.value !== confirmPassword.current.value) {
        setMsg({
          variant: 'danger',
          msg: 'Passwords do not match',
        })
        return
      }
      const { data } = await axios.post('/user/', {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      })
      console.log(data)
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
    <Container className="auth-container">
      <h2 style={{ fontWeight: 'bolder' }} className="text-center mt-3">
        Signup
      </h2>
      <Message variant={msg.variant} msg={msg.msg} />
      <Form>
        <Form.Group as={Row} controlId="name">
          <Form.Label className="h4 mt-5" sm="4">
            Name
          </Form.Label>
          <Form.Control
            style={{ backgroundColor: 'antiquewhite' }}
            placeholder="name.."
            ref={name}
          ></Form.Control>
        </Form.Group>
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

        <Form.Group as={Row} controlId="passwordConfirm">
          <Form.Label className="h4 mt-5" sm="4">
            Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            style={{ backgroundColor: 'antiquewhite' }}
            placeholder="re-enter password..."
            ref={confirmPassword}
          ></Form.Control>
        </Form.Group>
        <Button variant="success" className="mt-2" onClick={handleSubmit}>
          > Signup
        </Button>
      </Form>
    </Container>
  )
}

export default Signup
