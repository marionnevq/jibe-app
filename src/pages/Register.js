import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo2 from "../images/logo-noblack-label.png"
import { Link } from 'react-router-dom';
import "@fontsource/poppins"
import reg from "../images/reg.png"
import "../style/Register.css"

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Grid container style={{ minHeight: "100vh"}} >
        <Grid className='reg' item xs={12} sm={6}>
            <div className='reg' id='join'>Join the party!</div >
            <div className='reg' id='invite'>
                You’re invited to the biggest social gathering in world!
            </div>
            <div><img className='reg1' src={reg} /></div>
        </Grid>
        <Grid item xs={12} sm={6} className='reg-form'>
            <div>
                <img src={Logo2}/>
            </div>
            <div className='page-title'>Registration</div>
            <div>
                <div style={{display: "flex", justifyContent: "center"}}>
                <TextField
                name="firstname"
                /*error={!!errors.username}
                helperText={errors.username}
                onChange={handleChange}
                value={form.username}*/
                label="First Name"
                variant="filled"
                size="small"
                fullWidth
                className='field-one'
            />
                <TextField
                name="lastname"
                /*error={!!errors.username}
                helperText={errors.username}
                onChange={handleChange}
                value={form.username}*/
                label="Last Name"
                variant="filled"
                size="small"
                fullWidth
                className='field-one'
                sx={{marginLeft: 1}}
            />
                </div>
                <TextField
                name="email"
                /*error={!!errors.username}
                helperText={errors.username}
                onChange={handleChange}
                value={form.username}*/
                label="Email"
                variant="filled"
                size="small"
                fullWidth
                className='field-two'
                sx={{width: "70%"}}
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
                className='field-two'
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
                className='field-two'
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
                className='field-two'
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
            <div className='btn'>
                <Link to={"/login"} style={{textDecoration: "none"}}>
                    <Button variant="contained"/*disabled={isFormInvalid()}*/ type="submit">
                        Sign up
                    </Button>
                </Link>
            </div>
        </Grid>
    </Grid>
  )
}

export default Register