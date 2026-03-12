import bootstrap from './src/app.controller.js'

import express from 'express'
const app=express();
const port =8000;

bootstrap(app , express)



app.listen(process.env.PORT ||port , ()=>{console.log(`server running`);
})