import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, ListGroup, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Message from './Message'
import axios from 'axios'

function ChatModal({ children, chatName }) {
  const groupChatName = useRef('')
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState('')
  const { chat } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.user)
  const search = useRef('')
  const [searchUsers, setSearchUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState()
  const [displayList, setDisplayList] = useState(false)

  const fetchAllUsers = async () => {
    try {
      let { data } = await axios.get('/user')
      const userIds = chat.users.map((prof) => prof._id)
      let arr = data.filter((prof) => {
        return !userIds.includes(prof._id)
      })
      setSearchUsers(arr)
    } catch (err) {
      setMsg({
        variant: 'danger',
        message: err.message,
      })
    }
  }
  useEffect(() => {
    fetchAllUsers()
  }, [])

  const getSearchedUsers = async () => {
    try {
      const { data } = await axios.get(`/user?search=${search.current.value}`)
      const userIds = chat.users.map((prof) => prof._id)
      let arr = data.filter((prof) => {
        return !userIds.includes(prof._id)
      })
      console.log(chat.users)
      console.log(arr)
      setSearchUsers(arr)
    } catch (err) {
      setMsg({
        variant: 'danger',
        message: err.message,
      })
    }
  }
  const removeCondition =
    chat.isGroupChat && chat.groupAdmin._id.toString() === user._id.toString()

  const editChat = async () => {
    try {
      const { data } = await axios.put('/chat/group/rename', {
        chatName: groupChatName.current.value,
        chatId: chat._id,
      })
      if (!data) throw new Error('Something went wrong')
      window.location.reload()
    } catch (error) {
      setMsg({
        variant: 'danger',
        message: 'Error editing chat',
      })
    }
  }
  const addUser = async () => {
    try {
      const { data } = await axios.put('/chat/group/add', {
        chatId: chat._id,
        userId: selectedUsers._id,
      })
      if (!data) throw new Error('Something went wrong')

      window.location.reload()
    } catch (err) {
      setMsg({
        variant: 'danger',
        message: err.message,
      })
    }
  }

  const removeUser = async (userId) => {
    try {
      const { data } = await axios.put('/chat/group/remove', {
        chatId: chat._id,
        userId,
      })
      if (!data) throw new Error('Something went wrong')
      window.location.reload()
    } catch (err) {
      setMsg({
        variant: 'danger',
        message: 'Error removing chat',
      })
    }
  }
  const toggle = () => setShow(!show)

  return (
    <>
      <span onClick={toggle}>{children}</span>

      {msg && <Message variant={msg.variant} msg={msg.message} />}
      <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title style={{ width: '100%' }} className="text-center">
            {chatName()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {chat.isGroupChat && (
            <>
              <Row className="justify-content-center">
                <Col md={8}>
                  <input
                    ref={groupChatName}
                    type="text"
                    placeholder="Enter group name"
                    className="form-control"
                    // style={{ width: '90%' }}
                  />
                </Col>
                <Col md={2}>
                  <Button variant="info" onClick={editChat}>
                    Save
                  </Button>
                </Col>
              </Row>
              <Row className="mt-2 justify-content-center">
                <Col md={8}>
                  <input
                    ref={search}
                    onClick={() => {
                      if (displayList === false) {
                        getSearchedUsers()
                      }
                      setDisplayList(!displayList)
                    }}
                    onChange={getSearchedUsers}
                    type="text"
                    placeholder={
                      selectedUsers ? selectedUsers.name : 'Search User'
                    }
                    className="form-control"
                  />
                </Col>
                <Col md={2}>
                  <Button onClick={addUser} variant="info">
                    Add
                  </Button>
                </Col>
              </Row>
              <Row className="mt-2 justify-content-center">
                <ListGroup className="mt-2 z-2">
                  {displayList && (
                    <>
                      {searchUsers.map((userProfile) => (
                        <ListGroup.Item
                          key={userProfile._id}
                          onClick={() => {
                            setSelectedUsers(userProfile)
                            setDisplayList(false)
                          }}
                        >
                          {userProfile.name}
                        </ListGroup.Item>
                      ))}
                    </>
                  )}
                </ListGroup>
              </Row>
            </>
          )}
          <ListGroup className="mt-2">
            {chat.users.map((aUser) => (
              <>
                <ListGroup.Item className="bg-secondary">
                  <img
                    src={aUser.pic}
                    style={{ width: '2rem', borderRadius: '50%' }}
                    alt=""
                  />

                  <span className="p-2 bg-secondary text-black">
                    {aUser.name}
                  </span>
                  <Row>
                    <Col md={8} className="bg-secondary">
                      <small className="ms-4 bg-secondary text-antiquewhite">
                        {aUser.email}
                      </small>
                    </Col>
                    <Col className="bg-secondary">
                      <span className="bg-secondary">
                        {removeCondition && (
                          <Button
                            variant="danger"
                            className="d-flex justify-content-end "
                            onClick={() => removeUser(aUser._id)}
                          >
                            Remove
                          </Button>
                        )}
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
          {chat.isGroupChat && (
            <Button variant="danger" onClick={() => removeUser(user._id)}>
              Leave Group
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ChatModal
