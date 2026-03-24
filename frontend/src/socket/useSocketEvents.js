import { useEffect } from "react";
import socket from "./socket";
import { toast } from "react-toastify";

export default function useSocketEvents() {
  useEffect(() => {
    socket.on("product-added-to-cart", (data) => {
      toast.dark("A product was added to cart");
    });

    return () => {
      socket.off("product-added-to-cart");
    };
  }, []);
}