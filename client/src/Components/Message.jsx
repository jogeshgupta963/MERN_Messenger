import React from 'react'
import { Alert, Row } from 'react-bootstrap'
function Message({ variant, msg }) {
  return (
    <Alert style={{ width: '100%' }} variant={variant || 'flush'}>
      {msg}
    </Alert>
  )
}

export default Message
