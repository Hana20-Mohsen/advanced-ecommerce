const registerOrderEvents = (io, socket) => {

    socket.on("join-user-room", (userId) => {
        socket.join(userId)
        console.log(`usr joined a room`);

    })
    socket.on('order-created', (order) => {
        console.log(`Socket : order created => `, order);

    })

    socket.on("track-order", (orderId) => {
        console.log("tracking order", orderId)
    })

}

export default registerOrderEvents