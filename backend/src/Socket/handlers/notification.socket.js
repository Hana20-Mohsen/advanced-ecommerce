const registerNotificationEvents = (io , socket)=>{

 socket.on("join-notification-room",(userId)=>{
  socket.join(`user-${userId}`)
 })

}

export default registerNotificationEvents