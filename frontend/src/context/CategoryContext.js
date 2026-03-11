import axios from "axios";
import { createContext, useState } from "react";


export  let CategoryContext=createContext(0)


// function get Categories

 async function getCategories(){
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/all`).then(({data})=>data).catch(err => err)
}

 export default  function CategoryContextProvider({children}){
    return <CategoryContext.Provider
     value={{
        getCategories,
        }}>
        {children}

    </CategoryContext.Provider>
}