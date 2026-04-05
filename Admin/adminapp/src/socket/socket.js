import { io } from "socket.io-client"
import Cookies from "js-cookie";
console.log(`${process.env.REACT_APP_BACKEND_URL}`);
console.log(Cookies.get('token'));

//  transports:["websocket"],
const socket = io(`${process.env.REACT_APP_BACKEND_URL}`,{
 auth:{
  token: Cookies.get('token')
 }
})

export default socket