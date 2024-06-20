import React, { useState } from 'react'
import style from './Register.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'

export default function Register() {
  let navigate = useNavigate()
  const [erorr, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function registerSubmit(values) {
    setisLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch(
        (err) => {
          setisLoading(false);
          setError(err.response.data.message)
        }
      )
    if (data.message === 'success') {
      setisLoading(false);
      navigate('/login');
    }
  }
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Min length is 3').max(10, 'max length is 10').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6).required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: ''
    }, validationSchema,
    onSubmit: registerSubmit
  })
  return (
    <div className='w-75 mx-auto py-4 '>
      {erorr !== null ? <div className='alert alert-danger'>{erorr}</div> : ''}
      <h2 className='text-center'>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name : </label>
          <input type="text" id='name' className="form-control mb-2 " value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger p-2  mt-2'>{formik.errors.name}</div> : ''}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input type="email" id='email' className="form-control mb-2 " value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2  mt-2'>{formik.errors.email}</div> : ''}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input type="password" id='password' className="form-control mb-2 " value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2  mt-2'>{formik.errors.password}</div> : ''}
        </div>
        <div className="form-group">
          <label htmlFor="rePassword">Re-Password : </label>
          <input type="password" id='rePassword' className="form-control mb-2 " value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger p-2  mt-2'>{formik.errors.rePassword}</div> : ''}
        </div>
          {isLoading ? <button className='btn btn-primary mt-2' type='button' ><Audio height="20"
            width="80"
            radius="9"
            color="white"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass />
          </button> : <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-primary mt-2' type='submit'>Register</button>}
      </form>
    </div>
  );
}