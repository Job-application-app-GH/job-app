import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import firstImg from '../styles/wfh_1.svg'
import secondImg from '../styles/wfh_9.svg'
import thirdImg from '../styles/wfh_8.svg'


export default function Onboarding() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
    
      <Slider className='slider' {...settings}>
        <div>
        <div className='onboarding-card'>
          <img src={firstImg} className="onboarding-swipe-img" alt="" />
        </div>
          <h4>Welcome to seekr family.  </h4>
          <h4>We can not wait to show you around!</h4>
        </div>
        <div>
        <div className='onboarding-card'>
          <img src={secondImg} className="onboarding-swipe-img" alt="" />
        </div>
          <h4>We connect companies and talents all over the country.</h4>
        </div>
        <div>
        <div className='onboarding-card'>
          <img src='https://www.flaticon.com/svg/static/icons/svg/617/617822.svg' className="onboarding-swipe-img" alt="" />
        </div>
          <h4>Sounds like an oportunity right for you? Swipe right! </h4>
        </div>
        <div>
        <div className='onboarding-card'>
          <img src='https://www.flaticon.com/svg/static/icons/svg/617/617821.svg' className="onboarding-swipe-img" alt="" />
        </div>
          <h4>Isn't what you are lookig for? Swipe left and keep looking!</h4>
        </div>
        <div>
        <div className="onboarding-card">
          <img src={thirdImg} className="onboarding-swipe-img" alt="" />
        </div>
          <h4>Best of luck..!</h4>
          <button className="login-button" type="submit">
              Get swiping
            </button>
        </div>
      </Slider>
    
  
      
           
    );
  }