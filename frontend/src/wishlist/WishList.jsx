import React, { useContext, useEffect, useState } from 'react'
import { useQuery, useQueryClient , useMutation } from "react-query";
import { WishListContext } from '../context/WishlistContext';
import { productContext } from '../context/ProductContext.js';
import { storeContext } from '../context/storeContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "../Loader/Loader";
import "../wishlist/wishlist.style.css"
import { useWishlistState } from '../hooks/useWishlistState.js';
export default function WishList() {
  const queryClient = useQueryClient();
  const {data , isLoading , error ,isLoved , WCounter}=useWishlistState()
  // get wish list context
  let { getFromWishList, removeWishItem, setWCounter, } = useContext(WishListContext)
  let { getByIds } = useContext(productContext)

   const deleteWishlistItemMutation = useMutation({
      mutationFn: removeWishItem,
      onMutate: async (productId) => {
        await queryClient.cancelQueries(['wishlist'])
        const previousWishlist = queryClient.getQueryData(['wishlist'])
    
        queryClient.setQueryData(['wishlist'], (old) => ({
          ...old,
          items: old?.items?.filter(
          (item) => item.product._id !== productId
        )
        }))
    
        return { previousWishlist }
      },
    
      onError: (err, product, context) => {
        queryClient.setQueryData(['wishlist'], context.previousWishlist)
      },
      onSuccess: (data) => {
      if (data.status == 'success') {
      toast.warning("Product deleted successfully !")
    }
      },
    
      onSettled: () => {
        queryClient.invalidateQueries(['wishlist'])
      }
    })

  const maxLength = 70;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-image.jpg';
    // Check if it's already a full URL (for seeded data maybe)
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise construct the proper URL
    return `${process.env.REACT_APP_BACKEND_URL}/uploads/${imagePath}`;
  };

  // function to delete item from wish list

  async function deleteWishItem(id) {
   
    
    let data = await removeWishItem(id)
    console.log(data);

    if (data.status == 'success') {
      const ids = data.wishlist.map(element => element);
      console.log(ids);
      let response = await getByIds(ids);

      setWCounter(data.length)
      toast.warning("Product deleted successfully !")
    }
  }

  // call get wishlist item function
  useEffect(() => {
     console.log(data);
  }, []);
  // if (isLoading) return <Loader />;
  return (
    <div className='mainSlider_bg min-vh-100 text-white py-5'>
      <div className=' mt-5 pt-4  ms-3 ms-md-5'>
        <Link to="/products"> <i className="fa-solid fa-circle-arrow-left main-color fs-1  "></i></Link>
      </div>
      <div className="container">

        <h2 className='mt-3'>Wish List :</h2>
        {data?.wishlistItems?.map((item, index) => {
          return <div key={index} className=" d-md-flex justify-content-between mb-3 p-2 main-color-border rounded-3">
            <Link className='row un-underline gap-0  ' to={'/product-details/' + item._id}>
              <div className="col-4 col-md-2">
                {/* `http://localhost:3000/uploads/${}` */}
                <img className='w-50' src={getImageUrl(item.images[0])} alt="" />
              </div>
              <div className="col-8 col-md-10 d-flex justify-content-between align-items-center">
                <div className='px-4'>
                  <h6 className='fw-normal'>{item.description.slice(0, maxLength) + "..."
                  }</h6>
                  <p className=' fs-6 main-color m-0'> Price: {Number(item.price).toLocaleString()} EGP</p>

                </div>
                <div>

                </div>
              </div>

            </Link>
            <button onClick={() => {
              // deleteWishItem(item._id)
              deleteWishlistItemMutation.mutate(item._id)
            }} className='btn removeButton m-0 p-0 mt-2 text-white d-flex justify-content-between'> <i className="fa-solid fa-trash-can main-color me-2"></i> Remove
            </button>
            {/*  */}
          </div>
        })}
      </div>
    </div>
  )
}
