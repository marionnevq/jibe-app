import React, { useState } from 'react'

    
const ProfilePage = () => {
    const [form, setForm] = useState({})
    const see = (formClone) =>{
        setForm({
            form,
            formClone,
        })
    }
  return (
    <img src={form.image}></img>
  )
}

export default ProfilePage