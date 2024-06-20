import React, { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layoout from './components/Layoout/Layoout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import Contact from './components/Contact/Contact';
import NotFound from './components/Notfound/Notfound';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Brands from './components/Brands/Brands';
import { UserContext } from './Context/userContext';
import Categories from './components/Categories/Categories';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/cartContext';
import { Toaster } from 'react-hot-toast';
import Address from './components/Address/Address';
import Orders from './components/Orders/Orders';

let routers = createBrowserRouter([
  {
    path: '/', element: <Layoout />, children: [
      { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute> },
      { path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: 'contact', element: <ProtectedRoute><Contact /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'address', element: <ProtectedRoute><Address /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

function App() {

  let { setUserToken } = useContext(UserContext)
  useEffect(() => {
    let token = localStorage.getItem('userToken')
    if (token) {
      setUserToken(token)
    }
  })
  return (
    <CartContextProvider>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </CartContextProvider>

  )
}

export default App;
