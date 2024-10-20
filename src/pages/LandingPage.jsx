import React, { useEffect } from 'react'
import Header from '../components/Header'
import ImageGallery from '../components/ImageGallery';
import Jumbotron from '../components/Jumbotron';
import Partners from '../components/Partners';
import Footer from '../components/Footer'
import Reviews from '../components/Reviews';
import { useLocation } from 'react-router-dom';


const LandingPage = () => {
  // Accept user credential
  const location = useLocation();
  const { userData } = location.state || {}; // Safely access userId
  
  useEffect(() => {
    document.title = "Lend-a-Hand";
  }, []);

  return (
    <>
      <Header login={userData['id']}/>

      <div className='raleway font-bold text-4xl flex justify-between px-12'>
        <div className='flex items-center'>
          <div>
            Together we can do more.
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div style={{color: "#EE6C4D"}}>Make an impact</div>
          <div>
            <img src="./assets/Icons/Point_Orange.png" alt="" />
          </div>
        </div>
      </div>

      <ImageGallery />

      <Jumbotron />

      <Partners />

      <Reviews />

      <Footer />
    </>
  )
}

export default LandingPage