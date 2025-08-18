import React from 'react'
import HeroSection from '../compo/HeroSection'
import CatagoryMenu from '../compo/CatagoryMenu'
import TopVendor from '../compo/TopVendor'
import Banner from '../compo/Banner'


const Home = () => {
  return (
    <div>
      <HeroSection/>
      <CatagoryMenu/>
      <TopVendor/>
      <Banner/>
      
    </div>
  )
}

export default Home