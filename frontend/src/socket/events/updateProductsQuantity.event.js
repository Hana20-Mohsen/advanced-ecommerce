import { useEffect } from "react";
import socket from "../socket";
import { useQueryClient } from "react-query";

const useUpdateProductStock = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("product-stock-updated", (data) => {
      console.log("Socket received:", data);

      queryClient.setQueryData(["getProducts"], (oldData) => {
        if (!oldData) return oldData;

        const updatedProducts = oldData.data.products.map((product) => {
          const updated = data.products.find(
            (p) => p._id === product._id
          );

          if (updated) {
            return {
              ...product,
              countInStock: updated.countInStock, // ✅ FIXED NAME
            };
          }

          return product;
        });

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
      socket.off("product-stock-updated");
    };
  }, [queryClient]);
};

export default useUpdateProductStock;