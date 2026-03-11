import { useEffect , useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './SigUp.module.css'

const EmailConfirm=()=>{
    const [message , setMessage] = useState('Verifying...')
    const navigate=useNavigate()
    const {emailToken} = useParams()
    
    
    useEffect(()=>{
        const confirmEmail= async()=>{
              await axios.post(`http://localhost:8000/api/v1/user/confirm-email` , {} , {
                headers:{
                    Authorization:emailToken
                }
             }).then(res=>{
                console.log(res.data);
                if(res.data.status==='success'){
                    localStorage.setItem('responseData' ,res.data.message )
                    setMessage('Email verified successfully✅')
                    setTimeout(()=>{
                        navigate('/signin')
                    },3000)
                }
                else if(res.data.status==='fail'){
                    setMessage('Email confirmation failed !!')
                }
                
             }).catch(err=>{
                console.error(err)
                setMessage('Something went wrong');
             })
        }

        confirmEmail();
    })

    return <div className=" h-100vh pt-3 d-flex justify-content-center align-items-center">
        <p className={styles.black}>{message}</p>
    </div>
    
}

export default EmailConfirm