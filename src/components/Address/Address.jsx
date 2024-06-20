import React from 'react'
import { useFormik } from 'formik'
import { cartContext } from '../../Context/cartContext'
import { useContext } from 'react'

export default function Address() {

  let { onlinePayment, cartId } = useContext(cartContext)

  async function handleAddressSubmit(values) {
    let response = await onlinePayment(cartId, values, 'http://localhost:3000');
    console.log(response)
    window.location.href = response?.data.session.url
  }
  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: handleAddressSubmit
  })
  return <>
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details"> Details : </label>
        <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control mb-2' name="details" id="details" />
        <label htmlFor="phone"> phone : </label>
        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control mb-2' name="phone" id="phone" />
        <label htmlFor="city"> city : </label>
        <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control mb-2' name="city" id="city" />
        <button type='submit' className='btn bg-main text-white '>Submit</button>
      </form>

    </div>
  </>
}
