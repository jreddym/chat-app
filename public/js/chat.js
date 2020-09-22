const socket = io()

socket.on('message', message => console.log(message))

document.querySelector('#message').addEventListener('submit', event => {
  event.preventDefault()
  const message = event.target.elements.message.value
  message !== '' ? socket.emit('sendMessage', message) : null
  event.target.elements.message.value = ''
})

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser')
  }
  navigator.geolocation.getCurrentPosition(location => {
    socket.emit('sendLocation', {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })
  })
})
