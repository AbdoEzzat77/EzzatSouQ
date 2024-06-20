import React, { useContext } from 'react'
import style from './FeaturedProducts.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'


export default function FeaturedProducts() {
  let { addToCart } = useContext(cartContext)
  async function addProduct(productID) {
    let response = await addToCart(productID)
    if (response.data.status === 'success') {
      toast.success(`Product Added To Cart`)
    } else {
      toast.error('Product Failed To Add To Cart')
    }
  }


  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let { data, isLoading } = useQuery('productsKey', getFeaturedProducts) // {refrechonmount : false, staleTime: 1000 , refrechInterval: 1000 , enabled: false} كل دول مكانهم بعد الفانكشن ف القوس  
  // ما قبل ال UseQuery
  // const [products, setProducts] = useState([])
  // const [isLoading, setIsLoading] = useState(false)

  // async function getFeaturedProducts() {
  //   setIsLoading(true)
  //   let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   setProducts(data.data)
  //   setIsLoading(false)
  // }

  // useEffect(() => {
  //   getFeaturedProducts()
  // }, [])

  return <>

    {isLoading ? <div className=' d-flex  justify-content-center w-100 py-5 '>
      <BallTriangle
        height="100"
        width="100"
        radius="5"
        color="#4fa94d"
        ariaLabel="loading"
        wrapperStyle=""
        wrapperClass={{}}
        visible={true}
      />
    </div> : <div className=' container py-2 '>
      <h2> Featured Products </h2>
      <div className=' row '>
        {data?.data.data.map((product) => <div key={product.id} className=' col-md-2 '>
          <div className='product cursor-pointer py-3 px-2'>
            <Link to={`/productdetails/${product.id}`}>
              <img className=' w-100 ' src={product.imageCover} alt={product.title} />
              <span className='text-main font-sm fw-bolder '>{product.category.name} </span>
              <h3 className=' h6 '>{product.title.split("").slice(0, 2).join('')}</h3>
              <div className=' d-flex justify-content-between mt-3'>
                <span> {product.price} EGP </span>
                <span> <i className='fas fa-star rating-color'></i> {product.ratingsAverage} </span>
              </div>
            </Link>
            <button onClick={() => addProduct(product.id)} className=' btn bg-main text-white btn-sm w-100 mt-2 '> Add To Cart </button>
          </div>
        </div>)}
      </div>
    </div>}


  </>

}
