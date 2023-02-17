import { Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo2 from "../images/logo-noblack-label.png"
import { Link } from 'react-router-dom';
import "@fontsource/poppins"
import bg from "../images/bg.png"
import NavBar from '../components/NavBar';
const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
    <Grid container style={{ minHeight: "100vh"}} >
        <Grid item xs={12} sm={6} sx={{backgroundColor: "#EEE8DB", backgroundImage: `url(${bg})`, backgroundAttachment: "fixed",backgroundRepeat: "no-repeat", backgroundSize:"100%", display:"block", alignContent: "center"}}>
            <div style={{lineHeight: "50px", fontFamily: "montserrat", color: "#B70760", fontWeight: "bolder", fontSize: "50px", marginLeft: "40px", paddingTop: "120px"}}>
                Welcome Back!
            </div >
            <div style={{fontFamily: "poppins", color: "#1A212E", fontWeight: "30", paddingTop: 0, fontSize: "17px", marginLeft: "40px", marginBottom: 10}}>
                Ready to connect, and live in the moment? JIBE in now!
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
                <div style={{fontFamily: "montserrat", color: "#1A212E", fontWeight: "bolder", fontSize: "35px", paddingBottom: "30px", marginTop: 5}}>Login</div>
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
                <div style={{marginTop: 30, color: "#1A212E", fontSize: 12, fontFamily: "montserrat", fontWeight: "lighter"}}>Haven't Jibed yet? Register now!</div>
                <div>
                    <Link to={"/register"} style={{textDecoration: "none"}}>
                    <Button variant="contained"/*disabled={isFormInvalid()}*/ type="submit" color="secondary" sx={{height:30, width: "25%", borderRadius:6, color:"#EEE8DB", fontFamily:"montserrat", fontWeight:"bold", marginTop: 1, marginBottom: 5, fontSize: 12}}>
                        Sign up
                    </Button>
                    </Link> 
                </div>
        </Grid>
    </Grid></>
  )
}

export default Login