import React, { useState , useContext} from 'react'
import style from './Login.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate , Link} from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'
import { UserContext } from '../../Context/userContext'
export default function Login() {
  let { setUserToken } = useContext(UserContext)
  let navigate = useNavigate()
  const [erorr, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function loginSumbit(values) {
    setisLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch(
        (err) => {
          setisLoading(false);
          setError(err.response.data.message)
        }
      )
    if (data.message === 'success') {
      setisLoading(false);
      localStorage.setItem('userToken', data.token);
      setUserToken(data.token);
      navigate('/');
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6).required('Password is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    }, validationSchema,
    onSubmit: loginSumbit
  })
  return (
    <div className='w-75 mx-auto py-4 '>
      {erorr !== null ? <div className='alert alert-danger'>{erorr}</div> : ''}
      <h2 className='text-center'>Login Now</h2>
      <form onSubmit={formik.handleSubmit}>
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

        {isLoading ? (
          <button className='btn btn-primary mt-2' type='button'>
            <BallTriangle height="20"
              width="100"
              radius="5"
              color="white"
              ariaLabel="loading"
              wrapperStyle =""
              wrapperClass ={{}}
              visible = {true}
            />
          </button>
        ) : (
          <div className=' d-flex align-items-center '>
          <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-primary my-2' type='submit'>Login</button>
          <Link className='btn btn-light  mx-3 ' to={'/register'}>Register now</Link>
          </div>
        )}
      </form>
    </div>
  );
}