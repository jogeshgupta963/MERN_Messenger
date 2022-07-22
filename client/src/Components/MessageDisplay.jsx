import React, { useState } from 'react'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchchatMessages } from '../redux/chatMessages'

// import io from 'socket.io-client'
import socket from '../socket'
// const endpoint = 'http://localhost:3001'
// let socket

function MessageDisplay() {
  const { chat } = useSelector((state) => state.chat)
  const { chatMessages } = useSelector((state) => state.chatMessages)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [socketConnection, setSocketConnection] = useState(false)
  useEffect(() => {
    socket.emit('setup', user._id)
    socket.on('connection', () => setSocketConnection(true))
  }, [user._id])

  useEffect(() => {
    socket.on('message_recieved', (msg) => {
      if (!chat || chat._id !== msg.chat._id) {
        return
      }
      dispatch(fetchchatMessages({ id: msg.chat._id }))
    })
  })
  return (
    <div
      style={{
        height: '60vh',
        maxHeight: '60vh',
        overflow: 'auto',
        borderRadius: '1rem',
        backgroundColor: '#292524',
      }}
      className="mt-1"
    >
      <div
        style={{
          height: '95.7%',
          maxHeight: '95.7%',
          backgroundColor: '#292524',
          overflow: 'auto',
        }}
        className="m-2"
      >
        {chatMessages.map((message) => (
          <Row style={{ backgroundColor: '#292524' }} key={message._id}>
            <Col style={{ backgroundColor: '#292524' }} md={6}>
              {message.sender._id !== user._id && (
                <div
                  style={{
                    borderRadius: '1rem',
                    textWrapping: 'nowrap',
                    border: '2px solid antiquewhite',
                  }}
                  className="mt-3"
                >
                  <small className="ps-4 d-flex text-white">
                    {message.sender.name}
                  </small>
                  <p className="px-3">{message.content}</p>
                </div>
              )}
            </Col>
            <Col style={{ backgroundColor: '#292524' }} md={6}>
              {message.sender._id === user._id && (
                <div
                  style={{
                    borderRadius: '1rem',
                    textWrapping: 'nowrap',
                    border: '2px solid antiquewhite',
                  }}
                  className="mt-3"
                >
                  <small className="pe-4 d-flex justify-content-end text-white">
                    You
                  </small>
                  <p className="px-3">{message.content}</p>
                </div>
              )}
            </Col>
          </Row>
        ))}
      </div>
    </div>
  )
}

export default MessageDisplay
