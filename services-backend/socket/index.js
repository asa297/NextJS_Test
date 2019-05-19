module.exports = io => {
  io.on('connection', client => {
    let userSocket = client.handshake.query.userSocket

    client.on('joinroom', () => {
      client.join(userSocket)
    })

    client.on('openpo', () => {
      io.to(userSocket).emit('openpo', {})
    })

    client.on('disconnect', () => {
      console.log('Got disconnect!', userSocket)
      io.to(userSocket).emit('closepo', {})
    })

    client.on('sendItem', item => {
      io.to(userSocket).emit('sendItem', item)
    })

    client.on('dc', data => {
      console.log('send dc')

      io.to(userSocket).emit('dc', data)
    })

    client.on('credit', data => {
      console.log('send credit')

      io.to(userSocket).emit('credit', data)
    })

    client.on('creditcharge', data => {
      console.log('send creditcharge')

      io.to(userSocket).emit('creditcharge', data)
    })

    client.on('submitpo', data => {
      console.log('submitpo')

      io.to(userSocket).emit('submitpo', data)
    })
  })
}
