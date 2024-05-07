import React from 'react'
import "./Home.css";
import Header from "../../components/Header/Header";


export const Home = () => {
  return (
    <>
      <Header/>
      <div className='main'>
          <div className="overlay"></div>
          <img src="../src/images/tintaWALL.jpg"></img>
          <div className="content">
          <img src="../src/images/tattoo-logo-purple.svg"></img>
              <p>Barcelona Tattoo Studio</p> 
          </div>
      </div>
    </>
  )
}