import React from 'react'
import { createContext, useState } from "react";
import axios from "axios";

export  let productContext=createContext(0)
async function getByIds(ids){
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/getByIds`,{ids},{
    }).then(({data})=>data).catch(err => err)
}
export default  function ProductContextProvider({children}){
  return <productContext.Provider
  value={{
    getByIds
     }}>
     {children}

 </productContext.Provider>
}