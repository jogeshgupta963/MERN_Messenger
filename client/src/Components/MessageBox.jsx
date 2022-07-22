import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import { fetchchatMessages } from '../redux/chatMessages'
import MessageDisplay from './MessageDisplay'
import socket from '../socket'
function MessageBox() {
  const [msg, setMsg] = useState()
  const [content, setContent] = useState('')
  const [dummy, setDummy] = useState(false)
  const { chat } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.user)
  const { chatMessages } = useSelector((state) => state.chatMessages)
  const dispatch = useDispatch()

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
      socket.emit('new_message', data)

      setContent('')
      setDummy(!dummy)
    } catch (err) {
      setMsg({
        variant: 'danger',
        message: err.message,
      })
    }
  }

  useEffect(() => {
    if (chat) {
      dispatch(fetchchatMessages({ id: chat._id }))
      socket.emit('join_chat', chat._id)
    }
  }, [chat, dispatch, dummy])

  return (
    <>
      {msg && <Message variant={msg.variant} msg={msg.message} />}

      <MessageDisplay />

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
