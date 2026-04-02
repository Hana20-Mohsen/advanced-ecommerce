import { io } from "socket.io-client"
import Cookies from "js-cookie";
console.log(`${process.env.REACT_APP_BACKEND_URL}`);
// console.log(Cookies.get('token'));

const socket = io(`${process.env.REACT_APP_BACKEND_URL}`,{
 transports:["websocket"],
 auth:{
  token: `adminToken`
 }
})

export default socket