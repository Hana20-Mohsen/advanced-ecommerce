import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfileContext } from '../context/ProfileContext.js'
import styles from './Profile.module.css'
export default function Profile() {

  let { getProfileData } = useContext(ProfileContext)
  let [userData, SetUserData] = useState({})

  useEffect(() => {
    (async () => {
      let data = await getProfileData()
      console.log(data);
      if (data.status == 'success') {
        SetUserData(data.userData)
      }
      console.log(userData);

    })()
  }, [])




  return (
    
    <div className='bg-grad vh-100 d-flex justify-content-center align-items-center position-relative ' >
      <div className=' w-100'>
        <Link to="/home"><i className={`fa-solid fa-house main-color ms-5  position-absolute fs-1 ${styles.backToHome}`}></i></Link>
        <div className={`Gray-Color  container text-white py-4 main-color-border rounded-3 ${styles.profileData_holder}`}>
            <h2 className=' main-color '>Account Settings</h2>
            <div className="   mt-4 ">
              <div className=" d-flex flex-wrap">
                <h3>Username:<span className=' d-inline ms-1 fw-light fs-4'>{userData.name}</span>  </h3>
              </div>
              <div className="my-3 d-flex flex-wrap ">
                <h3>Email:<span className=' ms-1 fw-light fs-4 text-break'>{userData.email}</span>  </h3>
              </div>
              <div className=' d-flex justify-content-end '> <Link to="/editprofile"><button className='btn bg-main profile-btn px-5'>Edit</button></Link></div>
            </div>
          </div>
      </div>

    </div>
  )
}
