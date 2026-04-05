
import React, { useEffect, useState , useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { productContext } from '../../context/ProductContext.js';

export default function BestSeller() {
  let {getBastsellers}= useContext(productContext)
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await getBastsellers()
        
        setBestSellers(response?.bestSellers || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch best sellers.');
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
  <div className='pt-5 bg-grad text-white p-4'>
    <Link to="/admin">
      <i className="fa-solid fa-circle-arrow-left main-color fs-2"></i>
    </Link>

    <h2 className="my-5 ms-3">Best Sellers :</h2>

    {loading && <p>Loading...</p>}
    {error && <p className="text-danger">{error}</p>}

    {!loading && !error && (
      <>
        {/* 💻 Desktop Table */}
        <div className='rounded-5 d-none d-md-flex justify-content-center'>
          <table className="table w-75 text-white Gray-Color main-color-border">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Sold Quantity</th>
              </tr>
            </thead>
            <tbody>
              {bestSellers.map((item, index) => (
                <tr key={index}>
                  <td>{item.productId}</td>
                  <td>{item.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📱 Mobile Cards */}
        <div className="d-md-none">
          {bestSellers.map((item, index) => (
            <div key={index} className="card mb-3 shadow-sm border-0 rounded-4 bg-black text-white"> 
              <div className="card-body text-white">
                <h6 className="fw-bold mb-2">
                  Product ID:
                </h6>
                <p className="mb-2 small text-light">
                  {item.productId}
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Sold:</span>
                  <span className="badge bg-success fs-6 px-3 py-2">
                    {item.sold}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);
  // return (
  //   <div className=' pt-5 bg-grad text-white p-4'>
  //     <Link to="/admin">
  //       <i className="fa-solid fa-circle-arrow-left main-color fs-2"></i>
  //     </Link>
  //     <div className=''>
  //       <h2 className="my-5 ms-3">Best Sellers :</h2>
  //     </div>

  //     {loading && <p>Loading...</p>}
  //     {error && <p className="text-danger">{error}</p>}

  //     {!loading && !error && (
  //      <div className='rounded-5  d-flex justify-content-center'>
  //        <table className="table w-75 text-white Gray-Color main-color-border ">
  //         <thead>
  //           <tr>
  //             <th>Product ID</th>
  //             <th>Sold Quantity</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {bestSellers.map((item, index) => (
  //             <tr key={index}>
  //               <td>{item.productId}</td>
  //               <td>{item.sold}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //      </div>
  //     )}
  //   </div>
  // );
}
