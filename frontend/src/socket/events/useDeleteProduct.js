import { useEffect } from "react";
import socket from "../socket.js";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    useEffect(() => {
        socket.on("delete-product", (deletedProduct) => {
            console.log("Socket received:", deletedProduct);
            toast.dark(`admin delete product`)
            // queryClient.invalidateQueries(['getProducts'])
            const data = queryClient.getQueryData(['getProducts']);
            console.log("CACHE DATA:", data);
            queryClient.setQueryData(['getProducts'], (old) => {
                //   console.log(' old data:', old);


                // old?.filter(p => p._id !== deletedProduct)
            }
            );
        });
        return () => {
            socket.off("delete-product");
        }
    }, [])
}

export default useDeleteProduct;