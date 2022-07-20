import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import ProfileModal from './ProfileModal'
import SearchBox from './SearchBox'

function SearchUser() {
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [userProfile, setUserProfile] = useState()
  const [searchUser, setSearchUser] = useState([])
  const search = useRef('')

  const searchHandle = async (e) => {
    try {
      const { data } = await axios.get(`/user?search=${search.current.value}`)

      setSearchUser(data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleClose = () => setShow(false)
  const handleCloseModal = () => setShowModal(false)

  const toggleShow = () => setShow((s) => !s)

  return (
    <>
      <Button variant="secondary" onClick={toggleShow} className="me-2">
        Search
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        name="Enable body scrolling"
        scroll="true"
        backdrop="false"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form
            style={{
              marginLeft: '2rem',
              width: '75%',
            }}
            className="d-flex"
          >
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-1"
              ref={search}
              onChange={searchHandle}
            />
          </Form>
          {/* list */}

          <ListGroup className="mt-5">
            {searchUser.map((user) => (
              <ListGroup.Item
                onClick={() => {
                  setShowModal(true)
                  setUserProfile(user)
                }}
                className="mt-1 "
                style={{
                  // backgroundColor: 'black',
                  backgroundColor: 'rgb(30, 28, 29)',
                  color: 'antiquewhite',
                }}
                key={user._id}
              >
                <img
                  src={user.pic}
                  style={{
                    width: '2rem',
                    marginRight: '2rem',
                    borderRadius: '50%',
                  }}
                  alt=""
                />
                {user.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      {showModal && (
        <ProfileModal
          show={showModal}
          handleClose={handleCloseModal}
          user={userProfile}
          addToChat={true}
        />
      )}
    </>
  )
}

export default SearchUser
