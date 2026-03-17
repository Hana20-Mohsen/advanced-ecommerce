import { useQuery } from "react-query";
import { useContext } from 'react'
import { WishListContext } from "../context/WishlistContext.js";

export function useWishlistState() {
    let {getFromWishList}= useContext(WishListContext)
  const { data, isLoading, error } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getFromWishList,
    staleTime: 1000 * 60 * 5, // 5 minutes
  cacheTime: 1000 * 60 * 10
  })

  return {
    data,
    isLoved: data?.wishlistItems?.map(i => i._id) || [],
    WCounter:data?.wishlistItems?.length || 0,
    isLoading,
    error
  }
}