import { Avatar, Button, Divider, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import NavBar from '../components/NavBar'
import dp from '../images/nik.jpg'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import "../style/LatchList.css"
import FriendList from '../components/FriendList'

const LatchList = ({ onLogout, onSwitch, theme }) => {
  return (
    <div data-theme={theme} className="parent">
      <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme} />
      <FriendList/>
    </div>
  )
}

export default LatchList