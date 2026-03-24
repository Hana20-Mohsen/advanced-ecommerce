import { useEffect } from "react";
import socket from "./socket";
import { toast } from "react-toastify";

export default function useSocketEvents() {
    useEffect(() => {
        socket.on("product-added-to-cart", (data) => {
            toast.dark("A product was added to cart");
        });
        socket.on("product-stock-updated", (data) => {
            console.log("Updated stock:", data);

            data.products.forEach((product) => {
                // update UI (React Query / Redux / state)
                console.log(
                    `Product ${product._id} new quantity: ${product.quantity}`
                );
            });
        });

        return () => {
            socket.off("product-added-to-cart");
        };
    }, []);
}