import { useQuery } from 'react-query';
import { useContext } from 'react'
import { storeContext } from '../context/storeContext.js';

export function useCartState() {
    let {getCart } = useContext(storeContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5, // 5 minutes
  cacheTime: 1000 * 60 * 10
  })

  return {
    data: data,
    inCart: data?.cartItems?.map(i => i.product._id) || [],
    count: data?.cartItems?.length || 0,
    isLoading,
    error
  }
}