import React from 'react'
import style from './MainSlider.module.css'
import Slider from 'react-slick'
import img1 from '../../Assets/images/download (10).jpg'
import img2 from '../../Assets/images/download 11.jpg'
import img3 from '../../Assets/images/download 12.jpg'
import img4 from '../../Assets/images/download 13.jpg'
import img5 from '../../Assets/images/download 14.jpg'


export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2
  };

  return (
    <>

      <div className=' row gx-1 my-2'>
        <div className=' col-md-9 mx-auto'>
          <Slider {...settings}>
            <img className='w-100' height={400} src={img1} alt="slider1" />
            <img className='w-100' height={400} src={img2} alt="slider2" />
            <img className='w-100' height={400} src={img3} alt="slider3" />
          </Slider > 
          </div>
        <div className=' col-md-3 '>
          <img className='w-100' height={200} src={img4} alt="slider4" />
          <img className='w-100' height={200} src={img5} alt="slider5" />
        </div>
      </div >

    </>
  )
}
