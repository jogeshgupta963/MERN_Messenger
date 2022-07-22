import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { BsEyeFill } from 'react-icons/bs'
import ChatModal from './ChatModal'
import MessageBox from './MessageBox'

const bgCol = {
  backgroundColor: '#292524',
}
function ChatMessage() {
  const { chat } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.user)
  const getChatName = () => {
    if (chat.isGroupChat) {
      return chat.chatName
    }

    return chat.users.filter((e) => e._id !== user._id)[0].name
  }

  return (
    <div style={{ overflow: 'none' }}>
      <header>
        <Navbar style={{ borderRadius: '10px', ...bgCol }} className=" mt-2">
          <Container style={bgCol}>
            <Navbar.Brand style={bgCol} className="text-white">
              {getChatName()}
            </Navbar.Brand>
            <Navbar.Toggle style={bgCol} />
            <Navbar.Collapse style={bgCol} className="justify-content-end">
              <ChatModal chatName={getChatName}>
                <Button variant="flush">
                  <BsEyeFill />
                </Button>
              </ChatModal>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <MessageBox />
    </div>
  )
}

export default ChatMessage
