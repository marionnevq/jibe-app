import { Button, IconButton, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import logo from "../images/likewo.png"
import Joi from 'joi';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';

const EmailForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        email: "",
    });

    const schema = Joi.object({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
    });

    const navigate = useNavigate();

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
          setErrors({ ...errors, [input.name]: "Use a valid email" });
        } else if (error) {
            setErrors({ ...errors, [input.name]: error.details[0].message });
        }else {
            delete errors[input.name];
            setErrors(errors);
        }
    };
    
      const isFormInvalid = () => {
        const result = schema.validate(form);
    
        return !!result.error;
      };

  return (
    <Paper sx={{minWidth: "40%", maxWidth: "50%", minHeight: "350px", height: "auto", lineHeight: "1px", borderRadius: "15px", textAlign: "center"}}>
        <div style={{marginLeft: "20px", marginTop: "20px", fontSize: "70px", textAlign: "left"}}>
            <IconButton onClick={() => navigate("/login")}>
                <ArrowBackOutlinedIcon />
            </IconButton>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <img src={logo} style={{width: "15%", marginBottom: "-20px"}}/>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "5px"}}>
            <h1 style={{fontFamily: "montserrat", fontSize: "21px", lineHeight: "30px"}}>Forgot Password</h1>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "40px"}}>
        <TextField
            name="email"
            error={!!errors.email}
            helperText={errors.email}
            FormHelperTextProps={{ className: "helperText" }}
            onChange={handleChange}
            value={form.email}
            label="Email"
            variant="filled"
            size="small"
            fullWidth
            sx={{width: "70%"}}
            type="text"
          />
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
      <Button variant='contained' disabled={isFormInvalid()} sx={{width: "50%", marginTop: "30px", marginBottom: "60px", borderRadius: "35px"}}>Submit</Button>
      </div>
    </Paper>
  )
}

export default EmailForm