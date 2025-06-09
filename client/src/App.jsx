import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Toaster } from "react-hot-toast"
import Footer from './components/Footer.jsx'
import { useAppContext } from './context/AppContext.jsx'
import Login from './components/Login.jsx'
import AllProduct from './pages/AllProduct.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SellerLogin from './components/seller/SellerLogin.jsx'
import SellerLayout from './pages/seller/SellerLayout.jsx'
import AddProduct from './pages/seller/AddProduct.jsx'
import ProductList from './pages/seller/ProductList.jsx'
import Orders from './pages/seller/Orders.jsx'
import Loader from './components/Loader.jsx'
import AboutUs from './pages/AboutUs.jsx'
import PageNotFound from './components/PageNotFound.jsx'

const App = () => {
  const issellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin,isseller,loading}=useAppContext();

  if(loading){
    return <Loader/>
  }



  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {issellerPath ? null : <Navbar />}
      {showUserLogin ? <Login/> : null}
      <Toaster />
      <div className={`${issellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`} >
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<AllProduct />}></Route>
          <Route path='/products/:category' element={<ProductCategory />}></Route>
          <Route path='/products/:category/:id' element={<ProductDetails />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/about-us' element={<AboutUs />}></Route>
          <Route path='/add-address' element={<AddAddress />}></Route>
          <Route path='/my-orders' element={<MyOrders />}></Route>
          <Route path='/loader' element={<Loader />}></Route>
          <Route path='/seller' element={isseller ? <SellerLayout/> : <SellerLogin/>}>
           <Route index element={isseller ? <AddProduct/>  : null }></Route>
           <Route path='product-list' element={<ProductList/>}></Route>
           <Route path='orders' element={<Orders/>}></Route>
          </Route>
                    <Route path='*' element={ <PageNotFound/>}></Route>

        </Routes>
      </div>
      {!issellerPath && <Footer />}
    </div>
  )
}

export default App