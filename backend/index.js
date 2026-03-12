import bootstrap from './src/app.controller.js'
import express from 'express'
import http from 'http'
import initSocket from './src/Socket/index.js'
const app=express();
const port =8000;

const server = http.createServer(app)
bootstrap(app , express)
initSocket(server)


server.listen(process.env.PORT || port, () => {
 console.log("server running")
})

// app.listen(port , ()=>{console.log(`listening on ${port}`);
// })