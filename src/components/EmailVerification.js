import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageNotFound from '../pages/PageNotFound';
import axios from 'axios';

const EmailVerification = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [validUrl, setValidUrl] = useState(false);

    useEffect(() => {
        const verifyEmailUrl = async() => {
            try {
                const url = `http://localhost:5000/user/${params.id}/verify/${params.token}`;
                const {data} = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        }
        verifyEmailUrl();
    }, [])

  return (
    <div>
        {validUrl ? (
            <div>
                <h1>Email Verified Successfully!</h1>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        ) : (
            <PageNotFound/>
        )}
    </div>
  )
}

export default EmailVerification