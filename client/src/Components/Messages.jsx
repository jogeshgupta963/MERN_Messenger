import React from 'react'
import { useSelector } from 'react-redux'
import ChatMessage from './ChatMessage'
function Messages() {
  const { chat } = useSelector((state) => state.chat)

  return (
    <>
      {Object.keys(chat).length === 0 ? (
        <div
          style={{
            height: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="h3 mt-4"
        >
          Click on the chat to open it
        </div>
      ) : (
        <ChatMessage />
      )}
    </>
  )
}

export default Messages
