import { useEffect } from "react";
import socket from "../socket";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("product-updated", (updatedProduct) => {
      console.log("Socket received:", updatedProduct);
      toast.dark(`admin update product`)
      queryClient.setQueryData(["getProducts"], (oldData) => {
        if (!oldData) return oldData;

        const updatedProducts = oldData.data.products.map((product) =>
          product._id === updatedProduct._id
            ? { ...product, ...updatedProduct } // ✅ merge all updated fields
            : product
        );

        return {
          ...oldData,
          data: {
            ...oldData.data,
            products: updatedProducts,
          },
        };
      });
    });

    return () => {
      socket.off("product-updated");
    };
  }, [queryClient]);
};

export default useUpdateProduct;