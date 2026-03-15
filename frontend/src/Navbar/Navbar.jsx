import React, { useContext, useEffect } from 'react'
import logo from "../assets/img/Rlogo.png"
import styles from "./Navbar.module.css"
import { NavLink } from 'react-router-dom'
import { storeContext } from '../context/storeContext'
import { WishListContext } from '../context/WishlistContext'
export default function Navbar() {



   let{Counter , getCart , setCounter} =   useContext(storeContext)
   let {WCounter ,getFromWishList , setWCounter}=useContext(WishListContext)

// call get cart item function
useEffect(()=>{
  (async ()=>{
    let data=await getCart()
    // console.log(data);
    // if(data.status=='success'){
      // setCounter(data.numOfCartItems)
    // }
  })()
},[])
// new comment in navbar

// call get wishlist item function
useEffect(()=>{
  console.log(`iam in navbar`);
  
  ( async()=>{
   let wishlist=await getFromWishList();
   console.log(wishlist);
   if(wishlist.status=='success'){
    setWCounter(wishlist.length)
   }
   
   let cart= await getCart()
   console.log(cart);
   if(cart.status=='success'){
    setCounter(cart.length)
   }
  })()
})

  return (
    <>
     <nav className={` ${styles.bg} navbar navbar-expand-lg py-3 fixed-top `}>
        <div className="container-fluid ">
          {/* <h3 className='me-5'>Clothes X Clothes</h3> */}
          <img className={`${styles.custom_width}`} src={logo} alt="ElectroniXpress" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarNav">
            <ul className="navbar-nav me-auto" >
              <li>
                <NavLink style={{ color: 'white' }} className="nav-link mt-1" to="/Home">Home</NavLink>
              </li>
              <li>
                <NavLink style={{ color: 'white' }} className="nav-link mt-1" to="/products">Porducts</NavLink>
              </li>
              <li>
                <NavLink style={{ color: 'white' }} className="nav-link mt-1" to="/category">Category</NavLink>
              </li>
              <li >
                <NavLink style={{ color: 'white' }} className="nav-link mt-1" to="/Profile">Profile</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li>
                <NavLink style={{ color: 'white' }} className="btn  position-relative mt-1" to="/wishlist">Wishlist
                <i className={` ${styles.iconColor} icon-link fa-solid fa-heart ms-2`}></i>
             {WCounter?     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
               {WCounter}
                    <span className="visually-hidden">unread messages</span>
                  </span> : ''}
                </NavLink>
              </li>
              <li>
                <NavLink style={{ color: 'white' }} to='/cart' className="btn  position-relative ms-3 mt-1">Cart
                <i className={` ${styles.iconColor} mx-2 icon-link fa-solid fa-cart-shopping ms-2`}  ></i> 
            {Counter?      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                { Counter}
                    <span className="visually-hidden">unread messages</span>
                  </span> :''}
                </NavLink>
              </li>
           
              <li>
                                                                            {/* new , old : signin */}
                <NavLink style={{color:'white'}} className="nav-link  ms-2" to="/logout">Log Out </NavLink>
               
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}
