import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from "../images/chain.png"
import Logo2 from "../images/logo-noblack-label.png"
import { Link } from 'react-router-dom';
import "@fontsource/poppins"
import bg from "../images/bg.png"
import reg from "../images/reg.png"
import "./Register.css"
const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Grid container style={{ minHeight: "100vh"}} >
        <Grid className='reg' item xs={12} sm={6} sx={{backgroundColor: "#EEE8DB", backgroundImage: `url(${bg})`, backgroundAttachment: "fixed",backgroundRepeat: "no-repeat", backgroundSize:"100%", display:"block", alignContent: "center"}}>
            <div className='reg'style={{lineHeight: "50px", fontFamily: "montserrat", color: "#B70760", fontWeight: "bolder", fontSize: "50px", marginLeft: "40px", paddingTop: "120px"}}>
            Join the party!
            </div >
            <div className='reg' style={{fontFamily: "poppins", color: "#1A212E", fontWeight: "30", paddingTop: 0, fontSize: "17px", marginLeft: "40px", marginBottom: 10}}>
            You’re invited to the biggest social gathering in world!
            </div>
            <div>
              <img className='reg1' src={reg} style={{width: "70%", marginLeft: 30, marginBottom: 0, marginTop: 90}}/>
            </div>
        </Grid>
        <Grid item xs={12} sm={6}
            sx={{backgroundColor: "white", display:"inline-block", textAlign: "center"}}>
                <div>
                <img
                    src={Logo2}
                    style={{
                        width: "15%", 
                        height: "15%", 
                        objectFit: "scale-down", 
                        marginTop: 20,
                        }}/>
                </div>
                <div style={{fontFamily: "montserrat", color: "#1A212E", fontWeight: "bolder", fontSize: "35px", paddingBottom: "30px", marginTop: 5}}>Registration</div>
                <div>
                  <div style={{display: "flex", justifyContent: "center"}}>
                  <TextField
                    name="username"
                    /*error={!!errors.username}
                    helperText={errors.username}
                    onChange={handleChange}
                    value={form.username}*/
                    label="First Name"
                    variant="filled"
                    size="small"
                    fullWidth
                    sx={{backgroundColor:"white", width: "33%", borderRadius: 1, marginTop: 1}}
                />
                 <TextField
                    name="username"
                    /*error={!!errors.username}
                    helperText={errors.username}
                    onChange={handleChange}
                    value={form.username}*/
                    label="Last Name"
                    variant="filled"
                    size="small"
                    fullWidth
                    sx={{backgroundColor:"white", width: "33%", borderRadius: 1, marginTop: 1, marginLeft: 3}}
                />
                  </div>
                  <TextField
                    name="username"
                    /*error={!!errors.username}
                    helperText={errors.username}
                    onChange={handleChange}
                    value={form.username}*/
                    label="Email"
                    variant="filled"
                    size="small"
                    fullWidth
                    sx={{backgroundColor:"white", width: "70%", borderRadius: 1, marginTop: 1}}
                />
                <TextField
                    name="username"
                    /*error={!!errors.username}
                    helperText={errors.username}
                    onChange={handleChange}
                    value={form.username}*/
                    label="Username"
                    variant="filled"
                    size="small"
                    fullWidth
                    sx={{backgroundColor:"white", width: "70%", borderRadius: 1, marginTop: 1}}
                />
                </div>
                <div>
                <TextField
                    name="password"
                    /*error={!!errors.password}
                    helperText={errors.password}
                    onChange={handleChange}
                    value={form.password}*/
                    label="Password"
                    variant="filled"
                    size="small"
                    fullWidth
                    inpu
                    sx={{backgroundColor:"white", width: "70%", borderRadius: 1, marginTop: 1}}
                    type={showPassword ? "text" : "password"}
                    InputProps={{ 
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                />
                </div>
                <div>
                <TextField
                    name="password"
                    /*error={!!errors.password}
                    helperText={errors.password}
                    onChange={handleChange}
                    value={form.password}*/
                    label="Confirm Password"
                    variant="filled"
                    size="small"
                    fullWidth
                    inpu
                    sx={{backgroundColor:"white", width: "70%", borderRadius: 1, marginTop: 1}}
                    type={showPassword ? "text" : "password"}
                    InputProps={{ 
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                />
                </div>
                <div>
                    <Link to={"/login"} style={{textDecoration: "none"}}>
                        <Button variant="contained"/*disabled={isFormInvalid()}*/ type="submit" sx={{height:50, width: "35%", borderRadius:6, color:"#EEE8DB", fontFamily:"montserrat", fontWeight:"bold", marginTop: 5, fontSize: 20, marginBottom: 10}}>
                            Sign up
                        </Button>
                    </Link>
                </div>
        </Grid>
    </Grid>
  )
}

export default Register