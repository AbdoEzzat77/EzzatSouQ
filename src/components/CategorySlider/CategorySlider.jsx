import React from 'react'
import style from './CategorySlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from 'react-slick'

export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let { data, isLoading, isError } = useQuery('categoriesKey', getCategories)
  return <>

    {data?.data.data ? <Slider {...settings}>
      {data?.data.data.map((category) => <img height={200} key={category._id} className='w-100 my-3 ' src={category.image} alt={category.name}  />
      )}
    </Slider> : ""}
  </>
}
