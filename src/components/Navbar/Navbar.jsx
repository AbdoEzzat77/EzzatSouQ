import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/logo.png'
import { UserContext } from '../../Context/userContext'



export default function Navbar() {
  let { userToken , setUserToken } = useContext(UserContext)
  let navigate = useNavigate()
function logout(){
  localStorage.removeItem('userToken');
  setUserToken(null);
  navigate('/login')
}
  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" width={80} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken !== null ? <><li className="nav-item">
                <Link className="nav-link" to="/">Home </Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brands">Brands </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">products </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">Categories </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">cart </Link>
                </li></> : ''}

            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li>
                <i className='fab fa-facebook m-2 fs-3'></i>
                <i className='fab fa-twitter m-2 fs-3'></i>
                <i className='fab fa-instagram m-2 fs-3 '></i>
                <i className='fab fa-whatsapp m-2 fs-3 '></i>
                <i className='fab fa-linkedin m-2 fs-3 '></i>
              </li>
              {userToken !== null ? <>
                <li className="nav-item">
                  <span onClick={logout} className="nav-link cursor-pointer">Logout </span>
                </li></> : <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register </Link>
                </li></>
              }

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
