import React ,{useContext , useEffect , useRef} from 'react'
import logo from "../../assets/img/Rlogo.png"
import styles from "./CategoryNavbar.module.css"
import { NavLink } from 'react-router-dom'
import { storeContext } from '../../context/storeContext.js'
import { WishListContext } from '../../context/WishlistContext'
export default function CategoryNavbar() {
  const collapseRef = useRef(null);
const togglerRef = useRef(null);
   let{Counter} =   useContext(storeContext)
   let {WCounter }=useContext(WishListContext)

   useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      collapseRef.current &&
      !collapseRef.current.contains(event.target) &&
      !togglerRef.current.contains(event.target)
    ) {
      collapseRef.current.classList.remove("show");
    }
  };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);

  return (
    <div>
  <nav className={` ${styles.bg} navbar navbar-expand-lg navbar-dark py-3 fixed-top `}>
        <div className="container-fluid ">
          {/* <h3 className='me-5'>Clothes X Clothes</h3> */}
          <img src={logo} alt="ElectroniXpress" />
          <button ref={togglerRef} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div ref={collapseRef} className=" px-3 collapse navbar-collapse text-center  d-lg-flex justify-content-between " id="navbarNav">
            <div >
            <ul className="navbar-nav " >
              <li>
                <NavLink style={{ color: 'white' }} className="nav-link mt-1" to="/shoes">Shoes</NavLink>
              </li>
              <li >
                <NavLink style={{ color: 'white' }} className="nav-link mt-1" to="/clothes">Clothes</NavLink>
              </li>
              <li>
                <NavLink style={{ color: 'white' }} className="nav-link mt-1" to="/accessories">Accessories</NavLink>
              </li>
       
            </ul>
              </div>
              <div>
            
            <ul className='navbar-nav '>
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
            </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
