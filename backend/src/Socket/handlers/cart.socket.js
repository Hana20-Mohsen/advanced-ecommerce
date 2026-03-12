const registerCartEvents = (io , socket)=>{

 socket.on("add-to-cart",(data)=>{
   console.log("Socket : product added",data)
 })

}

export default registerCartEvents