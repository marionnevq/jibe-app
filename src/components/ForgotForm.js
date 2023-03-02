import { Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import logo from "../images/likewo.png"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Joi from 'joi';

const ForgotForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        password: "",
        confirmPwd: "",
    });

    const schema = Joi.object({
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
        )
        .min(8)
        .required(),
        confirmPwd: Joi.valid(form.password).messages({
          "any.only": "The two passwords do not match",
          "any.required": "Please re-enter the password",
        }),
    });

    const handleChange = ({ currentTarget: input }) => {
      console.log(input.value);
        setForm({
          ...form,
          [input.name]: input.value,
        });
    
        const { error } = schema
          .extract(input.name)
          .label(input.name)
          .validate(input.value);
    
        if (error && input.name === "confirmPwd") {
          setErrors({ ...errors, [input.name]: "Password did not match" });
        } else if (error && input.name === "password") {
          setErrors({
            ...errors,
            [input.name]:
              "Use at least one uppercase, lowercase, special character and number",
          });
        } else if (error) {
          setErrors({ ...errors, [input.name]: error.details[0].message });
        }  else {
          delete errors[input.name];
          setErrors(errors);
        }
      };
    
      const isFormInvalid = () => {
        const result = schema.validate(form);
    
        return !!result.error;
      };

  return (
    <Paper sx={{width: "40%", height: "400px", lineHeight: "1px", borderRadius: "15px"}}>
        <div style={{display: "flex", justifyContent: "center", marginTop: "25px"}}>
            <img src={logo} style={{width: "15%"}}/>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
            <h1 style={{fontFamily: "montserrat", fontSize: "21px"}}>Change Password</h1>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "40px"}}>
        <TextField
            name="password"
            error={!!errors.password}
            helperText={errors.password}
            FormHelperTextProps={{ className: "helperText" }}
            onChange={handleChange}
            value={form.password}
            label="Password"
            variant="filled"
            size="small"
            fullWidth
            sx={{width: "80%"}}
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
              ),
            }}
          />
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
        <TextField
            name="confirmPwd"
            error={!!errors.confirmPwd}
            helperText={errors.confirmPwd}
            FormHelperTextProps={{ className: "helperText" }}
            onChange={handleChange}
            value={form.confirmPwd}
            label="Confirm Password"
            variant="filled"
            size="small"
            fullWidth
            sx={{width: "80%"}}
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
              ),
            }}
          />
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
      <Button variant='contained' disabled={isFormInvalid()} sx={{width: "60%", marginTop: "30px"}}>Submit</Button>
      </div>
    </Paper>
  )
}

export default ForgotForm