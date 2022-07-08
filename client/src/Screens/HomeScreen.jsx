import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
function HomeScreen() {
  return (
    <>
      {!Cookies.get('JWT') && <Navigate to="/" />}
      <div>HomeScreen</div>
    </>
  )
}

export default HomeScreen
