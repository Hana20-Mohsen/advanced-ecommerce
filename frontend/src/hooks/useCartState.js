import { useQuery } from 'react-query';
import { useContext } from 'react'
import { storeContext } from '../context/storeContext.js';

export function useCartState() {
    let {getCart } = useContext(storeContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: 30_000,
  })

  return {
    data: data,
    inCart: data?.cartItems?.map(i => i.product._id) || [],
    count: data?.cartItems?.length || 0,
    isLoading,
    error
  }
}