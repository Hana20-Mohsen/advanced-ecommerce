import React from 'react'
import { Link } from 'react-router-dom'


export default function Admin() {

    return (
        <>

            <div className='bg-grad text-white overflow-auto d-flex flex-column justify-content-center align-items-center bg-danger'>

                <div className=' container  '>
                    <div className=" ">
                        <div className=" ">
                            <div className=' Gray-Color main-color-border p-3 mb-4  rounded-5 text-center'>
                                <h2>Welcome to Admin Page </h2>


                            </div>

                            <div className=" d-flex justify-content-center align-items-center">
                                <div className='d-flex flex-column justify-content-center align-items-center '>
                                    <Link to="/liveOrders" className='un-underline' aria-current="page" >
                                    <i className="fa-solid fa-border-all main-color me-3"></i>
                                    Live Orders</Link>
                                    <br />                  
                                <Link to="/ManageProducts" className="  un-underline" >
                                    <i className="fa-solid fa-newspaper  main-color me-3"></i>
                                    Products</Link>
                                      <br />  
                                <Link to="/bestSeller" className="  un-underline" >
                                    <i className="fa-solid fa-money-bill-trend-up main-color me-3"></i>
                                    Best Seller</Link>
                                </div>
                                {/* <ul className="nav d-flex justify-content-around  ps-4 py-4 mt-5">
                   
                <li className="nav-item rounded-5  w-auto">
                    
                </li>
                <li className="nav-item rounded-5">
                </li>
                <li className="nav-item rounded-5">
                </li>

            </ul> */}

                            </div>


                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}
