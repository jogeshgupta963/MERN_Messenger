import io from 'socket.io-client'

const endpoint = 'http://localhost:3001'

const socket = io.connect(endpoint)
export default socket
