import "@fontsource/poppins";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo2 from "../images/logo-noblack-label.png";
import "../style/Login.css";

const Login = ({ onLogin, setLoading }) => {
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [showPassword, setShowPassword] = useState(false);
  // const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // const schema = Joi.object({
  //   email: Joi.alternatives()
  //     .try(
  //       Joi.string()
  //         .lowercase()
  //         .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  //       Joi.string().alphanum().min(3).max(20)
  //     )
  //     .required(),
  //   password: Joi.string()
  //     .pattern(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  //     )
  //     .min(5)
  //     .required(),
  // });

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(form);
  };

  const handleChange = ({ currentTarget: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    // const { error } = schema
    //   .extract(input.name)
    //   .label(input.name)
    //   .validate(input.value);

    // if (error && input.name === "email") {
    //   setErrors({ ...errors, [input.name]: "Invalid username or email" });
    // } else if (error) {
    //   setErrors({ ...errors, [input.name]: "Invalid Password" });
    // } else {
    //   delete errors[input.name];
    //   setErrors(errors);
    // }
  };

  // const isFormInvalid = () => {
  //   const result = schema.validate(form);
  //   return !!result.error;
  // };

  return (
    <Paper>
      <Grid container style={{ minHeight: "100vh" }} onSubmit={handleSubmit}>
        <Grid item xs={12} sm={6} className="left-grid">
          <div className="welcome">Welcome Back!</div>
          <div className="ready">
            Ready to connect, and live in the moment? JIBE in now!
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className="right-grid">
          <div>
            <img src={Logo2} />
          </div>
          <div id="page-title">Login</div>
          <div>
            <TextField
              required={true}
              name="email"
              onChange={handleChange}
              value={form.email}
              label="Username / Email"
              variant="filled"
              size="small"
              fullWidth
              className="text-field"
            />
          </div>
          <div>
            <TextField
              required={true}
              name="password"
              onChange={handleChange}
              value={form.password}
              label="Password"
              variant="filled"
              size="small"
              fullWidth
              className="text-field"
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
          <div style={{width: "100%",display: "flex", justifyContent: "center"}}>
            <div style={{width: "65%",display: "flex", justifyContent: "start", color: "#2c3568", marginLeft: "10px", marginTop: "10px"}}>
              <a href="/forgot/password" style={{textDecoration: "none", fontFamily: "montserrat", fontSize: "15px", fontWeight: "600"}}>Forgot Password</a>
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              type="submit"
              className="btn1"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </div>
          <div className="lower-text">Haven't Jibed yet? Register now!</div>
          <div className="reg-btn">
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                className="btn2"
                onSubmit={handleSubmit}
              >
                Sign up
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
