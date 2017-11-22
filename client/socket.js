import io from 'socket.io-client'

const socket = io(window.location.origin)


// listen for incoming connections from client
socket.on('connect', () => {
  console.log('Connected!')

   //socket.emit('guestCoords', coords);

})


export default socket
