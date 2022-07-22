import React, { useEffect } from 'react'
import { fetchMyChats } from '../redux/myChats'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Stack } from 'react-bootstrap'
import { fetchChat } from '../redux/chat'

function MyChats() {
  const dispatch = useDispatch()
  const { myChats } = useSelector((state) => state.myChats)
  const { user } = useSelector((state) => state.user)
  const { chat } = useSelector((state) => state.chat)
  const selectChat = async (chatId) => {
    dispatch(fetchChat({ chatId }))
  }

  useEffect(() => {
    dispatch(fetchMyChats())
  }, [dispatch])
  return (
    <div>
      <Col>
        <Stack gap={2}>
          {myChats.map((singleChat) => (
            <div
              key={singleChat._id}
              style={{
                cursor: 'pointer',

                borderRadius: '1rem',
              }}
              className={
                singleChat._id === chat._id
                  ? ' bg-light p-3 hover-shadow text-antiquewhite'
                  : ' bg-dark p-3 hover-shadow text-antiquewhite'
              }
              onClick={() => selectChat(singleChat._id)}
            >
              <div
                key={singleChat._id}
                className={
                  singleChat._id === chat._id
                    ? ' bg-light  hover-shadow text-black'
                    : ' bg-dark  hover-shadow text-antiquewhite'
                }
              >
                {!singleChat.isGroupChat
                  ? singleChat.users.filter(
                      (displayUser) => displayUser._id !== user._id,
                    )[0].name
                  : singleChat.chatName}
              </div>
            </div>
          ))}
        </Stack>
      </Col>
    </div>
  )
}

export default MyChats
