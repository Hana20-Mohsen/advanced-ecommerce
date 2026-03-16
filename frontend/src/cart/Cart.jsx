import React, { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { storeContext } from "../context/storeContext";
import Loader from "../Loader/Loader";
import EmptyCart from "../EmptyCart/EmptyCart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import './cart.style.css'

export default function Cart() {
  const queryClient = useQueryClient();
  // get cart context
  let {
    getCart,
    reomveCartItem,
    setCounter,
    UpdateQuantity,
    deleteCart,
    setInCart,
    addToCart,
  } = useContext(storeContext);
  // let [Loading, setLoading] = useState(true);

  // const [data, setData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });


  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-image.jpg';
    // Check if it's already a full URL (for seeded data maybe)
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise construct the proper URL
    return `${process.env.REACT_APP_BACKEND_URL}/uploads/${imagePath}`;
  };

  // function to delete item from cart

  // async function deleteCartItem(id) {
  //   let data = await reomveCartItem(id);
  //   // console.log(data);
  //   if (data.status == "success") {
  //     // setData(data);
  //     queryClient.invalidateQueries(["cart"]);
  //     setCounter(data?.length);
  //     toast.error("Product deleted successfully");
  //   }
  // }
  async function deleteCartItem(id) {
    let data = await reomveCartItem(id);

    if (data.status === "success") {
      queryClient.invalidateQueries(["cart"]);

      setInCart((prev) => prev.filter((productId) => productId !== id));

      // setCounter(data?.length);
      toast.error("Product deleted successfully");
    }
  }

  // function to Update item from cart

  async function UpdateProductQuantity(id, operation) {
    let data = await UpdateQuantity(id, operation);
    console.log(data);
    if (data.status == "success") {
      queryClient.invalidateQueries(["cart"]);
      // setData(data);
      // setCounter(data?.length);
      toast.success("Product Updated successfully");
    }
  }

  // function to delete my cart

  async function deleteMyCart() {
    let data = await deleteCart();
    // console.log(data);
    if (data.status == "success") {
      // setData(null);
      queryClient.invalidateQueries(["cart"]);
      setCounter(0);
      setInCart([])
      toast.error("Cart Deleted successfully");
    }
  }

  // call get cart item function
  useEffect(() => {
  setCounter(data?.length)
  }, [data]);
  if (isLoading) return <Loader />;
  if (!data?.cartItems?.length) {
    return <EmptyCart />;
  }
  //   if (!data?.cartItems || data?.cartItems?.length === 0) {
  //   return <EmptyCart />;
  // }
  // if (data == []) return <EmptyCart />;
  // if(data.numOfCartItems==0)return <EmptyCart/>

  return (
    <div className="mainSlider_bg  text-white mt-5 position-relative">

      <div className="container mainSlider_bg py-5">
        <div className=" mt-4 pt-4 ms-3">
          <Link to="/products">
            {" "}
            <i className="fa-solid fa-circle-arrow-left main-color fs-1 pt-2"></i>
          </Link>
        </div>
        <h2 className="pt-4">Shop Cart :</h2>
        <p className="main-color">
          {" "}
          Total Cart Price : {Number(
            data?.totalPrice || 0
          ).toLocaleString()}{" "}
          EGP
        </p>
        {data?.cartItems?.map((item) => {
          return (
            <div key={item._id} className="row border-bottom py-2">
              <div className="col-10 col-md-2 d-flex justify-content-center align-items-center m-auto mb-3">
                <Link to={"/product-details/" + item.product._id}>
                  {" "}
                  <img className="w-100" src={getImageUrl(item.product.images?.[0])} alt="" />
                </Link>
              </div>
              <div className="col-10 col-md-10 d-flex justify-content-between align-items-center m-auto">
                <div className="">
                  <h5>{item.product.name}</h5>
                  <p className=" fs-6 main-color m-0">
                    {" "}
                    Price: {item.product.price} EGP
                  </p>
                  <button
                    onClick={() => {
                      deleteCartItem(item.product._id);
                    }}
                    className="btn m-0 p-0 mt-2 text-white"
                  >
                    {" "}
                    <i className="fa-solid fa-trash-can main-color "></i> Remove
                  </button>
                </div>
                <div className=" d-flex justify-content-end ">
                  <button
                    disabled={item.quantity >= item.product.countInStock}
                    onClick={() => [
                      UpdateProductQuantity(item.product._id, "+"),
                    ]}
                    className="btn main-color-border text-white"
                  >
                    +
                  </button>
                  <span className=" fs-5 mx-2"> {item.quantity}</span>
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => {
                      UpdateProductQuantity(item.product._id, "-");
                    }}
                    className="btn main-color-border text-white"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className=" d-md-flex justify-content-md-between justify-content-evenly" >
          <div className="d-flex justify-content-between ">
            <Link
              to="/placeorder"
              className={`btn text-white bg-main my-3 me-md-5  ${!data?.length ? "disabled" : ""
                }`}
            >
              Place Order
            </Link>
            {/* <button
              className="btn bg-danger text-white ms-5"
              onClick={() => {
                deleteMyCart();
              }}
            >
              Reset cart
            </button> */}
            <button
              className="btn bg-danger text-white my-3"
              onClick={() => {
                setShowConfirm(true); // Show the confirmation box
              }}
            >
              Reset cart
            </button>
          </div>

          <div>
            <Link
              to="/orders"
              className={`btn text-white bg-main mt-3 mb-3  `}
            >
              my orders
            </Link>
          </div>
        </div>
      </div>
      {showConfirm && (
       <div className="confirmation-holder  position-fixed d-flex justify-content-center align-items-center">
         <div className="container confirmation main-color-border  h-25 rounded-5 py-4 text-center d-flex justify-content-center align-items-center">
          <div>
            <h3 >Are You Sure ?</h3>
            <div className="py-4  m-auto d-flex justify-content-between">
              <button
                className="btn bg-danger  px-4"
                onClick={() => {
                  deleteMyCart();
                  setShowConfirm(false); // Hide confirmation after delete
                }}
              >
                Yes
              </button>
              <button
                className="btn bg-success px-4"
                onClick={() => setShowConfirm(false)} // Just hide confirmation
              >
                No
              </button>
            </div>
          </div>
        </div>
       </div>
      )}

    </div>
  );
}
