import { useEffect } from "react";
import socket from "../socket.js";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useDeleteProduct = ()=>{
    const queryClient = useQueryClient();
    useEffect(()=>{
        socket.on("delete-product" , (deletedProduct)=>{
            console.log("Socket received:", deletedProduct);
            toast.dark(`admin delete product`)
                queryClient.invalidateQueries(['getProducts'])
        });
        return ()=>{
            socket.off("delete-product");
        }
    }, []) 
}

export default useDeleteProduct;