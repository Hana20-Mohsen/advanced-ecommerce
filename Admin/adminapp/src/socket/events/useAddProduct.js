import { useEffect } from "react";
import socket from "../socket.js";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
const useAddProduct =()=>{
    const queryClient = useQueryClient();
    useEffect(()=>{
        socket.on("add-product" , (newProduct)=>{
            console.log("Socket received:", newProduct);
            toast.dark(`admin add product`)
             queryClient.invalidateQueries(['getProducts'])
            // queryClient.setQueryData(['getProducts'] , (oldData)=>{
            //     if(!oldData) return newProduct;
            //     return [newProduct, ...oldData];
            // });
        });
        return ()=>{
            socket.off("add-product");
        }
    } , [])
}

export default useAddProduct;