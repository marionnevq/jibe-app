import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo2 from "../images/logo-noblack-label.png"
import { Link, useNavigate } from 'react-router-dom';
import "@fontsource/poppins"
import "../style/Login.css";
import Joi from 'joi';
import { getAccessToken, login } from '../services/auth';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const { onLogin } = useContext(UserContext)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const [errors, setErrors] = useState({});
    const [accessToken, setAccessToken] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    
    const navigate = useNavigate();

    const schema = Joi.object({
        email: Joi.alternatives()
           .try(
              Joi.string()
                 .lowercase()
                 .email({
                     minDomainSegments: 2,
                     tlds: {
                        allow: ["com", "net"],
                     },
                 }),
              Joi.string().min(3).max(20)
            )
           .required(),
        password: Joi.string().alphanum().required(),
    });

    const getAccessToken = () => {
        localStorage.getItem("accessToken")
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            console.log("hello log")
            const response = await login(form.email, form.password).then((response) => {
                const token = response.data.token;
                console.log(token);
                localStorage.setItem("accessToken", token);
            });
            if(getAccessToken !== null){
                console.log("logged in")
                navigate("/onboarding")
            } else {
                localStorage.removeItem("accessToken");
                alert("Invalid Credentials")
                navigate("/login")
            }
            console.log("logged innn")  
          } catch (error) {
            if (error.response && error.response.status === 400) {
              alert(error.response.data.message);
            }
          }
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

        if(error && input.name === "username"){
            setErrors({ ...errors, [input.name]: "Invalid username or email" });
        } else if (error){
            setErrors({ ...errors, [input.name]: "Only use letters and numbers" });
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
            <div id='page-title'>Login</div>
                <div>
                    <TextField
                        name="email"
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
                <div className='reg-btn'>
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