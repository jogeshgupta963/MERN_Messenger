import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { Chats, Header, Messages } from '../Components'
function HomeScreen() {
  return (
    <>
      {!Cookies.get('JWT') && <Navigate to="/" />}
      <Header />
      <Row
        style={{
          border: '2px solid white ',
          height: '100vh',
        }}
        className="m-4"
      >
        <Col
          md={3}
          style={{
            borderRight: '2px solid white',
          }}
        >
          <Chats />
        </Col>
        <Col
          style={{
            borderLeft: '2px solid white',
          }}
        >
          <Messages />
        </Col>
      </Row>
    </>
  )
}

export default HomeScreen
