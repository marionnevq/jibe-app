import React from 'react'
import EmailForm from '../components/EmailForm'
import bg from "../images/1.jpeg"

const EmailConfirmation = () => {
  return (
    <div style={{backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundSize: "100%", backgroundColor: "#f2f2f2", minHeight: "100vh", height: "auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <EmailForm />
    </div>
  )
}

export default EmailConfirmation