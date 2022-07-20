import axios from 'axios'
import React, { useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import SearchUser from './SearchUser'

function SearchBox() {
  const [search, setSearch] = useState(false)

  const searchHandle = async (e) => {
    // const { data } = await axios.get('/user')

    setSearch(true)
  }
  return (
    <>
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
          onChange={searchHandle}
        />
      </Form>

      {/* {!search && <Button onClick={searchHandle}>Search...</Button>} */}
      {/* {search && <SearchUser />} */}
    </>
  )
}

export default SearchBox
