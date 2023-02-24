import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo2 from "../images/logo-noblack-label.png"
import { Link, useNavigate } from 'react-router-dom';
import "@fontsource/poppins"
import reg from "../images/reg.png"
import "../style/Register.css"
import Joi from 'joi';
import LoginSwiper from '../components/LoginSwiper';
import { UserContext } from '../context/UserContext';
import { register } from '../services/auth';

const Register = () => {
  const { onRegister } = useContext( UserContext );
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPwd: "",
    imageUrl: "",
    bio: "",
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

// const handleImage = (event) => {
//     const img = event.target.files[0];
//       setImageUrl(URL.createObjectURL(img));
//       setForm({
//         ...form,
//         image: img
//       });
//       console.log(form);
//       console.log(img);
//     }
    
const schema = Joi.object({
    firstname: Joi.string().min(3).max(20).required(),
    lastname: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    username: Joi.string().min(8).max(20).required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/).min(8).required(),
    confirmPwd: Joi.valid(form.password).messages({
        "any.only": "The two passwords do not match",
        "any.required": "Please re-enter the password",
    }),
    imageUrl: Joi.optional(),
    bio: Joi.optional(),
});

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await register( 
            form.firstname,
            form.lastname,
            form.email,
            form.username,
            form.password,
            form.imageUrl,
            form.bio);
        alert("Registration successful");
        navigate("/login");
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

    if(error && input.name === "confirmPwd"){
        setErrors({ ...errors, [input.name]: "Password did not match" });
    } else if (error && input.name === "password") {
        setErrors({ ...errors, [input.name]: "Use at least one uppercase, lowercase, special character and number" });
    }else if (error) {
        setErrors({ ...errors, [input.name]: error.details[0].message });
    } else {
        delete errors[input.name];
        setErrors(errors);
    }
};

const isFormInvalid = () => {
    const result = schema.validate(form);

    return !!result.error;
};

return (
    <Grid container style={{ minHeight: "100vh"}}>
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
                error={!!errors.firstname}
                helperText={errors.firstname}
                onChange={handleChange}
                value={form.firstname}
                label="First Name"
                variant="filled"
                size="small"
                fullWidth
                className='field-one'
            />
                <TextField
                name="lastname"
                error={!!errors.lastname}
                helperText={errors.lastname}
                onChange={handleChange}
                value={form.lastname}
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
                error={!!errors.email}
                helperText={errors.email}
                onChange={handleChange}
                value={form.email}
                label="Email"
                variant="filled"
                size="small"
                fullWidth
                className='field-two'
                sx={{width: "70%"}}
            />
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
                className='field-two'
            />
            </div>
            <div>
            <TextField
                name="password"
                error={!!errors.password}
                helperText={errors.password}
                onChange={handleChange}
                value={form.password}
                variant="filled"
                label="Password"
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
                name="confirmPwd"
                error={!!errors.confirmPwd}
                helperText= {errors.confirmPwd}
                FormHelperTextProps={{className: "helperText"}}
                onChange={handleChange}
                value={form.confirmPwd}
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
                <Button variant="contained" disabled={isFormInvalid()} onClick={handleSubmit}>
                    Sign up
                </Button>
            </div>
        </Grid>
    </Grid>
  )
}

export default Register