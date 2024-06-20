import React from 'react'
import style from './Layoout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline, Online } from "react-detect-offline";
export default function Layoout() {
  return (
    <>
      <Navbar />
      <div className='container mx-auto my-2 '>
        <Outlet></Outlet>
      </div>
      <div>
        
        <Offline>
          <div className='Network'>
          <i className='fas fa-wifi'></i> You are currently Offline 
          </div>
          </Offline>
      </div>
      <Footer />
    </>
  )
}
