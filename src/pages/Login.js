import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from "../images/Logo-login.png"
import { Link } from 'react-router-dom';
const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Grid container style={{ minHeight: "100vh"}} >
        <Grid item xs={12} sm={6} sx={{backgroundColor: "#EEE8DB", display:"block", alignContent: "center"}}>
            <div style={{lineHeight: "40px", fontFamily: "montserrat", color: "#B70760", fontWeight: "bolder", fontSize: "45px", marginLeft: "40px", paddingTop: "50px"}}>
                Welcome Back!
            </div >
            <div style={{fontFamily: "montserrat", color: "#1A212E", fontWeight: "bolder", paddingTop: 0, fontSize: "17px", marginLeft: "40px"}}>
                Ready to connect, and live in the moment? JIBE in now!
            </div>
            <div style={{display: "flex", justifyContent: "center", paddingRight: 15}}>
                <img
                    src={Logo}
                    style={{
                        width: "70%", 
                        height: "70%", 
                        objectFit: "scale-down", 
                        opacity: 0.4
                        }}/>
            </div>
        </Grid>
        <Grid item xs={12} sm={6}
            sx={{backgroundColor: "#1A212E", display:"inline-block", textAlign: "center"}}>
                <div style={{fontFamily: "montserrat", color: "white", fontWeight: "bolder", fontSize: "35px", marginTop: 60, paddingBottom: "30px"}}>Login</div>
                <div>
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
                    sx={{backgroundColor:"white", width: "70%", borderRadius: 1, marginTop: 5}}
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
                    sx={{backgroundColor:"white", width: "70%", borderRadius: 1, marginTop: 5}}
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
                    <Link to={"/feed"} style={{textDecoration: "none"}}>
                        <Button variant="contained"/*disabled={isFormInvalid()}*/ type="submit" sx={{height:50, width: "35%", borderRadius:6, color:"#EEE8DB", fontFamily:"montserrat", fontWeight:"bold", marginTop: 5, fontSize: 20}}>
                            Sign in
                        </Button>
                    </Link>
                </div>
                <div style={{marginTop: 30, color: "white", fontSize: 12, fontFamily: "montserrat", fontWeight: "lighter"}}>Haven't Jibed yet? Register now!</div>
                <div>
                    <Link to={"/register"} style={{textDecoration: "none"}}>
                    <Button variant="contained"/*disabled={isFormInvalid()}*/ type="submit" color="secondary" sx={{height:30, width: "25%", borderRadius:6, color:"#EEE8DB", fontFamily:"montserrat", fontWeight:"bold", marginTop: 1, marginBottom: 5, fontSize: 12}}>
                        Sign up
                    </Button>
                    </Link> 
                </div>
        </Grid>
    </Grid>
  )
}

export default Login