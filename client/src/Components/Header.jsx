import React, { useState } from 'react'
import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../redux/user'

import ProfileModal from './ProfileModal'
import SearchUser from './SearchUser'
function Header() {
  const [show, setShow] = useState(false)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const logoutHandle = () => {
    //logout api call
    Cookies.remove('JWT')
    dispatch(removeUser())
    window.location.reload()
  }

  return (
    <>
      <Navbar className="z-3">
        <Container>
          <SearchUser />
          <Navbar.Toggle />
          Jadooo
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <i className="fas fa-user px-2"></i>
              {user.name}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{
                backgroundColor: 'rgb(30, 29, 29)',
                color: '#000',
              }}
            >
              <Dropdown.Item as="div">
                <div
                  style={{
                    textDecoration: 'none',
                  }}
                  onClick={handleShow}
                >
                  Profile
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="div" onClick={logoutHandle}>
                <div
                  style={{
                    textDecoration: 'none',
                  }}
                  to="/"
                >
                  {' '}
                  Logout
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      {show && (
        <ProfileModal
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          user={user}
        />
      )}
    </>
  )
}

export default Header
