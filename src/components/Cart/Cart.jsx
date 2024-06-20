import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import { Link } from 'react-router-dom'


export default function Cart() {

  let { getLoggedUserCart, removeCartItem, updateCartItem, deleteAllCartItems } = useContext(cartContext)
  const [cartDetails, setCartDetails] = useState(null);

  async function deleteCartItems() {
    let { data } = await deleteAllCartItems()
    setCartDetails(data)
  }

  async function updateCount(id, count) {
    let { data } = await updateCartItem(id, count)
    setCartDetails(data)
  }

  async function deleteCartItem(id) {

    let { data } = await removeCartItem(id)
    setCartDetails(data)
  }
  async function getCart() {
    let { data } = await getLoggedUserCart()
    setCartDetails(data)
  }

  useEffect(() => {
    getCart()
  })

  return <>
    {cartDetails ? (
      <div className=' w-75 my-3 mx-auto p-3 bg-main-light'>
        <h3> Shopping Cart  </h3>
        <h4 className='text-main h6 fw-bolder '> Cart Items : {cartDetails.numOfCartItems}  </h4>
        <h4 className='h6 text-main fw-bolder mb-4 '>  Total Cart Price : {cartDetails.data.totalCartPrice} EGP </h4>
        {cartDetails.data.products.map((product) =>
          <div key={product.product.id} className='row border-bottom py-3'>
            <div className="col-md-1">
              <img className='w-100' src={product.product.imageCover} alt="" />
            </div>
            <div className="col-md-11">
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h3 className='h6'>{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                  <h6 className='text-main'>Price: {product.price} EGP</h6>
                </div>

                <div>
                  <button onClick={() => updateCount(product.product.id, product.count + 1)} className='brdr-main p-1 '> +</button>
                  <span className='mx-2'>{product.count}</span>
                  <button onClick={() => updateCount(product.product.id, product.count - 1)} className='brdr-main p-1 '> -</button>
                </div>

              </div>
              <button onClick={() => deleteCartItem(product.product.id)} className='btn p-0 '> <i className=' text-danger fas fa-trash-can font-sm'> </i> Remove </button>

            </div>
          </div>)}
        <div className='d-flex justify-content-center align-items-center '>
          <button onClick={deleteCartItems} className='btn btn-danger mt-4'> Delete All Cart Items </button>
        </div>
        <div className=' d-flex justify-content-center  align-items-center '>
          <Link className='btn m-2 bg-main text-white w-25' to={'/address'}> Online Payment </Link>
          <button className='btn m-2 bg-main text-white w-25'> Cash on Delivery </button>
        </div>

      </div>
    ) :
      <div className='d-flex justify-content-center align-items-center'>
        <h3>No items in cart</h3>
      </div>
    }
  </>;
}