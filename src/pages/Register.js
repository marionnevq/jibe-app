import "@fontsource/poppins";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Logo2 from "../images/logo-noblack-label.png";
import reg from "../images/reg.png";
import "../style/Register.css";

const Register = ({ handleSubmit }) => {
  const { onRegister } = useContext(UserContext);
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
    birthday: "",
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
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    username: Joi.string().min(8).max(20).required(),
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
    imageUrl: Joi.optional(),
    bio: Joi.optional(),
    birthday: Joi.required(),
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
    } else if (calculate_age(form.birthday) < 18 && input.name === "birthday") {
      setErrors({ ...errors, [input.name]: "you must be 18 to register" });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
    console.log(form);
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);

    if (calculate_age(form.birthday) < 18) {
      return true;
    }
    return !!result.error;
  };

  const calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log(age_now);
    return age_now;
  };

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid className="reg" item xs={12} sm={6}>
        <div className="reg" id="join">
          Join the party!
        </div>
        <div className="reg" id="invite">
          You’re invited to the biggest social gathering in world!
        </div>
        <div>
          <img className="reg1" src={reg} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} className="reg-form">
        <div>
          <img src={Logo2} />
        </div>
        <div className="page-title">Registration</div>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
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
              className="field-one"
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
              className="field-one"
              sx={{ marginLeft: 1 }}
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
            className="field-two"
            sx={{ width: "70%" }}
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
            className="field-two"
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
            className="field-two"
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
        <div>
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
            className="field-two"
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
        <div>
          <TextField
            name="birthday"
            error={!!errors.birthday}
            helperText={errors.birthday}
            onChange={handleChange}
            value={form.birthday}
            label="Birthday"
            type="date"
            variant="filled"
            className="field-two"
            defaultValue="2017-05-24"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="btn">
          <Button
            variant="contained"
            disabled={isFormInvalid()}
            onClick={(event) => {
              handleSubmit(event, form);
            }}
          >
            Sign up
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
