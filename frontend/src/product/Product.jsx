import React, { useContext, useState, useEffect } from "react";
import { useQuery , useQueryClient , useMutation } from 'react-query';
import { Link, useParams } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import { WishListContext } from "../context/WishlistContext";
import axios from "axios";
import { useWishlistState } from "../hooks/useWishlistState";
import { useCartState } from "../hooks/useCartState";
export default function Product({ item }) {
  const queryClient = useQueryClient();
  const {data , isLoading , error ,isLoved , WCounter}=useWishlistState()
  const { inCart , count}=useCartState()
  // console.log(item.images[0]);

  let {
    addToCart,
    setTotalPrice,
  } = useContext(storeContext);
  let {
    addToWishList,
  } = useContext(WishListContext);

  let [btnLoading, setBtnLoading] = useState(true);


    const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-image.jpg';
  // Check if it's already a full URL (for seeded data maybe)
  if (imagePath.startsWith('http')) return imagePath;
  // Otherwise construct the proper URL
  return `${process.env.REACT_APP_BACKEND_URL}/uploads/${imagePath}`;
};


const addToCartMutation = useMutation({
  mutationFn: addToCart,

  onMutate: async (product) => {
    await queryClient.cancelQueries(['cart'])

    const previousCart = queryClient.getQueryData(['cart'])

    queryClient.setQueryData(['cart'], (old) => ({
      ...old,
      items: [...(old?.items || []), product]
    }))

    return { previousCart }
  },

  onError: (err, product, context) => {
    queryClient.setQueryData(['cart'], context.previousCart)
  },
  onSuccess: (data) => {
    if (data?.status === "success") {
      toast.success("Product added successfully!")
    }

    if (data?.status === "remove") {
      toast.error("Product deleted successfully!")
    }
  },

  onSettled: () => {
    queryClient.invalidateQueries(['cart'])
    setBtnLoading(true)
  }
})
const addProductToWishListMutation = useMutation({
  mutationFn: addToWishList,

  onMutate: async (product) => {
    await queryClient.cancelQueries(['wishlist'])

    const previousWishlist = queryClient.getQueryData(['wishlist'])

    queryClient.setQueryData(['wishlist'], (old) => ({
      ...old,
      items: [...(old?.items || []), product]
    }))

    return { previousWishlist }
  },

  onError: (err, product, context) => {
    queryClient.setQueryData(['wishlist'], context.previousWishlist)
  },
  onSuccess: (data) => {

    if (data?.status === "success") {
      toast.success("Product added successfully!")
    }

    if (data?.status === "deleted") {
      toast.error("Product deleted successfully!")
    }
  },

  onSettled: () => {
    queryClient.invalidateQueries(['wishlist'])
    setBtnLoading(true)
  }
})

    useEffect(() => {
    
    }, [inCart]);

  return (
    <>
      <div className="col-lg-2 col-6 col-md-4  h-10">
        <div className="product h-10 text-white p-2 cursor-pointer rounded-3 gray-border my-3">
          {/* start link to product details */}
          <Link className="un-underline" to={"/product-details/" + item._id}>
          {/* src={item.images[0]}  */}
            <img className="w-100" src={getImageUrl(item.images?.[0])} alt="" />
            {/* <span className='main-color'>{item.category.name}</span> */}
            <h5 className="my-2 fw-bold">
              {item.description.split(" ").slice(0, 2).join(" ")}
            </h5>

            {/* start details */}
            <div className=" d-flex justify-content-between">
              <div>
                {/*   Total Cart Price : {Number(data?.totalPrice || 0).toLocaleString('en-EG', { style: 'currency', currency: 'EGP' })} */}
                {Number(item.price).toLocaleString()} EGP
              </div>
              <div>
                <i className="fa-solid fa-star ratingColor"></i>
                {/* {item.rating} */}
                {typeof item.rating === "number"
                  ? item.rating.toFixed(1)
                  : "0.0"}
              </div>
            </div>
            {/* end details */}
          </Link>
          {/* end link to product details */}
          

          <i
            className={`icon-link fa-solid fa-heart ms-2 mb-3 ${
              isLoved.includes(item._id) ? "text-danger" : ""
            }`}
            onClick={() => {
              // addProductToWishList(item._id);
              addProductToWishListMutation.mutate(item._id)
            }}
          ></i>
          <p
            className={`fs-6 fw-semibold m-0 ${
              item.countInStock === 0 ? "text-danger" : "main-color"
            }`}
          >
            {item.countInStock === 0
              ? "Not available"
              : `In Stock: ${item.countInStock}`}
          </p>
          <button
            disabled={!btnLoading || item.countInStock === 0}
            onClick={() =>addToCartMutation.mutate(item._id)}
            className={`btn bg-main w-100  `}
          >
            {inCart.includes(item._id) ? " Remove item" : "Add To Cart"}
          </button>
        </div>
      </div>
    </>
  );
}
