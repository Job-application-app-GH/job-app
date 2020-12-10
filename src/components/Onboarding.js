import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import firstImg from '../styles/wfh_1.svg'
import secondImg from '../styles/wfh_9.svg'
import thirdImg from '../styles/wfh_8.svg'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Onboarding = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  let link
  if (props.user.userType === 'CANDIDATE') {
    link = '/findJobs'
  } else {
    link = '/findCandidates'
  }
  return (
    <Slider
      className="slider"
      {...settings}
      style={{backgroundColor: 'seashell'}}
    >
      <div className="onboarding-screen">
        <div>
          <img src={firstImg} className="onboarding-img" alt="" />
        </div>
        <div className="onboarding-text">
          <h3>WELCOME TO SEEKR FAMILY </h3>
          <h4 style={{color: 'rgb(94, 89, 84)'}}>
            We can not wait to show you around!
          </h4>
        </div>
      </div>
      <div className="onboarding-screen">
        <div>
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/617/617822.svg"
            className="onboarding-img-swipe"
            alt=""
          />
        </div>
        <div className="onboarding-text">
          <h3>Sounds like an oportunity is right for you?</h3>
          <h4 style={{color: 'rgb(94, 89, 84)'}}> Swipe right! </h4>
        </div>
      </div>
      <div className="onboarding-screen">
        <div>
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/617/617821.svg"
            className="onboarding-img-swipe"
            alt=""
          />
        </div>
        <div className="onboarding-text">
          <h3>Isn't exactly what you are looking for? </h3>
          <h4 style={{color: 'rgb(94, 89, 84)'}}>Swipe left!</h4>
        </div>
      </div>
      <div className="onboarding-screen">
        <div>
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/617/617798.svg"
            className="onboarding-img-swipe"
            alt=""
          />
        </div>
        <div className="onboarding-text">
          <h3>Want to know more? </h3>
          <h4 style={{color: 'rgb(94, 89, 84)'}}>
            Tap to flip the card and read away!
          </h4>
        </div>
      </div>
      <div className="onboarding-screen-lastpage">
        <div>
          <img src={secondImg} className="onboarding-img" alt="" />
        </div>
        <div className="onboarding-text-lastpage">
          <h3>Here we connect companies and talents all over the country.</h3>
          <h4 style={{color: 'rgb(94, 89, 84)'}}>A perfect match waiting!</h4>
        </div>
        <Link to={link}>
          <button className="onboarding-button" type="submit">
            Get swiping
          </button>
        </Link>
      </div>
    </Slider>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState)(Onboarding)
