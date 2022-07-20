import axios from 'axios'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Message from './Message'

function ProfileModal({ show, handleClose, user, addToChat }) {
  const [msg, setMsg] = useState({})
  const addChat = async () => {
    try {
      const { data } = await axios.post('/chat', {
        userId: user._id,
      })
      console.log(data)
      if (data.status === 'success') {
        setMsg({
          variant: 'success',
          msg: data.msg,
        })
        window.location.reload()
        // return
      }
      setMsg({
        variant: 'danger',
        msg: data.msg,
      })
    } catch (err) {
      setMsg({
        variant: 'danger',
        msg: err.message,
      })
    }
  }
  return (
    <>
      {/* {msg && <Message variant={msg.variant} msg={msg} />} */}
      <Modal show={show} onHide={handleClose}>
        <img
          style={{
            width: '25%',
            height: '50%',
            margin: 'auto',
            borderRadius: '50%',
            backgroundColor: 'black',
          }}
          src={user.pic}
          alt=""
        />
        <Modal.Header closeButton>
          <Modal.Title>{user.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{user.email}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {addToChat && (
            <Button variant="info" onClick={addChat}>
              ADD TO CHAT
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProfileModal
