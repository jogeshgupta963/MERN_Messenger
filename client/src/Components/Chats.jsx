import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import GroupChatModal from './GroupChatModal'
import MyChats from './MyChats'
function Chats() {
  return (
    <>
      <Row className="mt-4">
        <Col md={4}>
          <div className="text-left h5 ">My Chats</div>
        </Col>
        <Col className="mr-5" md={7}>
          <GroupChatModal>
            <Button className variant="secondary">
              New Group Chat +{' '}
            </Button>
          </GroupChatModal>
        </Col>
        <MyChats />
      </Row>
    </>
  )
}

export default Chats
