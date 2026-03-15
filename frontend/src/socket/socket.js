import { io } from "socket.io-client"

const socket = io("https://advanced-ecommerce-production.up.railway.app",{
 transports:["websocket"],
 auth:{
  token: localStorage.getItem("token")
 }
})

export default socket