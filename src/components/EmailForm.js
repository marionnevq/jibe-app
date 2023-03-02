import { Button, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import logo from "../images/likewo.png"
import Joi from 'joi';

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
    <Paper sx={{width: "35%", height: "350px", lineHeight: "1px", borderRadius: "15px"}}>
        <div style={{display: "flex", justifyContent: "center", marginTop: "25px"}}>
            <img src={logo} style={{width: "15%"}}/>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
            <h1 style={{fontFamily: "montserrat", fontSize: "21px"}}>Forgot Password</h1>
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
            sx={{width: "80%"}}
            type="text"
          />
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
      <Button variant='contained' disabled={isFormInvalid()} sx={{width: "60%", marginTop: "30px", marginBottom: "30px"}}>Submit</Button>
      </div>
    </Paper>
  )
}

export default EmailForm