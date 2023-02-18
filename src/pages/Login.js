import { Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo2 from "../images/logo-noblack-label.png"
import { Link, useNavigate } from 'react-router-dom';
import "@fontsource/poppins"
import "../style/Login.css";
import Joi from 'joi';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const schema = Joi.object({
        username: Joi.string().min(3).max(10).required(),
        password: Joi.string().required(),
    });

    const handleSubmit = async (event) => {
    event.preventDefault();
        // onLogin(form.username, form.password);
        console.log("Hello")
        navigate("/feed")
    };
    
    const handleChange = ({ currentTarget: input }) => {
    setForm({
        ...form,
        [input.name]: input.value,
    });
    
    const { error } = schema
        .extract(input.name)
        .label(input.name)
        .validate(input.value);

        if (error) {
            setErrors({ ...errors, [input.name]: error.details[0].message });
        } else {
            delete errors[input.name];
            setErrors(errors);
        }
    };
    
    const isFormInvalid = () => {
        const result = schema.validate(form);
        console.log(!!result.error);
        return !!result.error;
    };

  return (
    <>
    <Grid container style={{ minHeight: "100vh"}} onSubmit={handleSubmit}>
        <Grid item xs={12} sm={6} className='left-grid'>
            <div className='welcome'>Welcome Back!</div >
            <div className='ready'>
                Ready to connect, and live in the moment? JIBE in now!
            </div>
        </Grid>
        <Grid item xs={12} sm={6} className='right-grid'>
            <div>
                <img src={Logo2}/>
            </div>
            <div className='page-title'>Login</div>
                <div>
                    <TextField
                        name="username"
                        error={!!errors.username}
                        helperText={errors.username}
                        onChange={handleChange}
                        value={form.username}
                        label="Username"
                        variant="filled"
                        size="small"
                        fullWidth
                        className='text-field'
                    />
                </div>
                <div>
                    <TextField
                        name="password"
                        error={!!errors.password}
                        helperText={errors.password}
                        onChange={handleChange}
                        value={form.password}
                        label="Password"
                        variant="filled"
                        size="small"
                        fullWidth
                        className='text-field'
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
                        <Button 
                            variant="contained"
                            disabled={isFormInvalid()}
                            type="submit" 
                            className='btn1'
                            onClick={handleSubmit}
                        >
                            Sign in
                        </Button>
                </div>
                <div className='lower-text'>Haven't Jibed yet? Register now!</div>
                <div>
                    <Link to={"/register"} style={{textDecoration: "none"}}>
                    <Button 
                        variant="contained"
                        color="secondary" 
                        className='btn2'
                        onSubmit={handleSubmit}
                    >
                        Sign up
                    </Button>
                    </Link> 
                </div>
        </Grid>
    </Grid></>
  )
}

export default Login