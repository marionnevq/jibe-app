import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Like1 from '../images/likeone.png'
import Like2 from '../images/likewo.png'

const FeedPage = () => {
  const [like, setLike] = useState(false);

  const handleChangeIcon = () =>{
    if(like === false){
      setLike(true);
    } else {
      setLike(false);
    }
    
  }
  return (
    <>
    <NavBar />
      <div>
        <IconButton onClick={handleChangeIcon} >
          {
            like? <img src={Like1} /> : <img src={Like2} /> 
          }
        </IconButton>
      </div>
    
    </>
  )
}

export default FeedPage