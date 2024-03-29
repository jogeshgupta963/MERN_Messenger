import axios from 'axios'
import React, { useRef, useState } from 'react'
import {
  Button,
  Row,
  Form,
  ListGroup,
  Modal,
  Stack,
  Col,
} from 'react-bootstrap'

function GroupChatModal({ children }) {
  const [show, setShow] = useState(false)
  const groupChatName = useRef('')
  const search = useRef('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [searchUser, setSearchUser] = useState([])

  const searchHandle = async (e) => {
    try {
      const { data } = await axios.get(`/user?search=${search.current.value}`)
      setSearchUser(data)
    } catch (error) {
      console.log(error)
    }
  }
  const createHandle = async (e) => {
    try {
      if (!groupChatName || selectedUsers.length < 2) {
        throw new Error('Please fill all the fields')
      }
      const { data } = await axios.post('/chat/group', {
        name: groupChatName.current.value,
        users: JSON.stringify(selectedUsers.map((user) => user._id)),
      })
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <span variant="primary" onClick={handleShow}>
        {children}
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="border" closeButton>
          <Modal.Title style={{ width: '100%' }} className="text-center m-2">
            Create Group Chat
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="border">
          <Row>
            <div className="d-flex justify-content-center ">
              <Form>
                <Form.Label
                  style={{ width: '100%' }}
                  className="text-centre mx-3"
                >
                  Group Chat Name :
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Group Chat Name"
                  ref={groupChatName}
                  style={{
                    backgroundColor: '#9ca3af',
                  }}
                />
                <Form.Label
                  style={{ width: '100%' }}
                  className="text-centre mx-3 mt-4"
                >
                  Participants :
                </Form.Label>

                <Form.Control
                  type="text"
                  ref={search}
                  placeholder="Search User"
                  onChange={searchHandle}
                  style={{
                    backgroundColor: '#9ca3af',
                  }}
                />
              </Form>
            </div>
          </Row>
          {searchUser.length > 0 && (
            <Stack gap={2} style={{ scroll: 'auto' }}>
              {searchUser.map((user) => (
                <div
                  key={user._id}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '1rem',
                  }}
                  className={
                    selectedUsers.includes(user)
                      ? ' bg-light p-3  hover-shadow text-black'
                      : ' bg-dark p-3 hover-shadow text-antiquewhite'
                  }
                  onClick={() => {
                    if (selectedUsers.includes(user)) {
                      let arr = selectedUsers.filter(
                        (ele) => ele._id !== user._id,
                      )
                      setSelectedUsers(arr)
                      return
                    }
                    setSelectedUsers([...selectedUsers, user])
                  }}
                >
                  <div
                    key={user._id}
                    className={
                      selectedUsers.includes(user)
                        ? ' bg-light  hover-shadow text-black'
                        : ' bg-dark  hover-shadow text-antiquewhite'
                    }
                  >
                    {user.name}
                  </div>
                </div>
              ))}
            </Stack>
          )}
        </Modal.Body>
        <Modal.Footer className="border">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={createHandle}>
            Create Chat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default GroupChatModal
