import React from 'react'
import ForgotForm from '../components/ForgotForm'
import bg from "../images/1.png"

const ForgotPass = ({onLoading}) => {
  return (
    <div style={{backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "100%", backgroundColor: "#f2f2f2", minHeight: "100vh", height: "auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <ForgotForm />
    </div>

  )
}

export default ForgotPass