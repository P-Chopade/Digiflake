import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  
  const imageUrl='https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png'
  return (
    <>
      <div className='p-3 d-flex justify-content-around mt-3'>
         <img src={imageUrl} alt="Description of the image"  style={{display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '30vh'}}/>
     </div>
     <h3 style={{marginLeft:'500px'}}>Welcome to DigitalFlake</h3>
</>
  )
}

export default Home