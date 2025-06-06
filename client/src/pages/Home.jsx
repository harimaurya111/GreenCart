import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Category'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLatter from '../components/NewsLatter'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner/>
        <Categories/>
        <BestSeller/>
        <BottomBanner/>
        <NewsLatter/>
    </div>
  )
}

export default Home