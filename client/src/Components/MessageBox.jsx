import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Message from './Message'

function MessageBox() {
  // const content = useRef('')
  const [msg, setMsg] = useState()
  const [content, setContent] = useState('')
  const [messages, setMessages] = useState([])
  const { chat } = useSelector((state) => state.chat)
  const sendMessage = async (e) => {
    e.preventDefault()
    try {
      if (!content) {
        setMsg({
          variant: 'warning',
          message: 'Please enter a message',
        })
        return
      }

      const { data } = await axios.post('/message', {
        content: content,
        chatId: chat._id,
      })
      // content.current.value = ''
      setContent('')
      setMessages([...messages, data])
    } catch (err) {
      setMsg({
        variant: 'danger',
        message: err.message,
      })
    }
  }
  return (
    <>
      {msg && <Message variant={msg.variant} msg={msg.message} />}
      <div
        style={{
          height: '68%',
          overflow: 'auto',
          borderRadius: '1rem',
          backgroundColor: '#292524',
        }}
        className="mt-1"
      >
        <div
          style={{ height: '95.7%', backgroundColor: '#292524' }}
          className="m-2"
        ></div>
      </div>

      <InputGroup className="my-3">
        <Form.Control
          // ref={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ backgroundColor: '#292524', color: 'antiquewhite' }}
          placeholder="Type..."
          value={content}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button
          variant="secondary"
          style={{ backgroundColor: '#292524' }}
          id="button-addon2"
          onClick={sendMessage}
        >
          Send
        </Button>
      </InputGroup>
    </>
  )
}

export default MessageBox
