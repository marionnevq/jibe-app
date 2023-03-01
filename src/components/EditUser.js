import { Avatar, Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Joi from 'joi';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "../style/UserEdit.css"
import alt from "../images/alternate.jpg"
import CloseIcon from '@mui/icons-material/Close';
import { getCurrentUser, updateCurrentUser } from '../services/user';
import { getUser } from '../services/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../services/firebase';

const EditUser = ({handleClose}) => {

    const params = useParams();
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const swiperRef = useRef(null);
    const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    bio: "",
    });
    
    useEffect(() => {
        loadUser();
    },[])

    const loadUser = async() => {
        const current = await getCurrentUser();
        setForm({...form,    
            firstname: current.data.firstname, 
            lastname: current.data.lastname,
            email: current.data.email,
            username: current.data.username,
            bio: current.data.bio,});
        setImageUrl(current.data.imageUrl);
    }

    const handleUpdate = () => {
        updateCurrentUser();
    }
    
    const style = {
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        paddingBottom: '10px'
    };
    
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
        bio: Joi.optional(),
      });

      const handleImage = (event) => {
        const img = event.target.files[0];
        setImageUrl(URL.createObjectURL(img));
        setImageUpload(img);
        console.log(imageUpload);
        console.log(img);
      };

      const handleSaveChanges = () => {
        // if (imageUpload == null) return;
        // setLoading(true);
        const imageRef = ref(
          storage,
          `images/profileImage_${getCurrentUser().id}`
        );
    
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          const path = snapshot.metadata.fullPath;
          const uRef = ref(storage, path);
          getDownloadURL(uRef).then((url) => {
            updateCurrentUser({ 
                imageUrl: url, 
                firstname: form.firstname, 
                lastname: form.lastname,
                email: form.email,
                username: form.username,
                bio: form.bio });
            // setLoading(false);
            handleClose();
          });
        });

        
      };
    
    
      const handleChange = ({ currentTarget: input }) => {
        setForm({
          ...form,
          [input.name]: input.value,
        });
    console.log(form);
    
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
    <Box className='edit-form' sx={{ ...style, width: "80%",height: "auto", borderRadius: "15px"}}>
          <Grid container sx={{display: "flex", justifyContent: "end", alignItems: "center"}}>
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
          </Grid>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
          <h2 id="child-modal-title">Profile</h2>
          </div>
          <Grid container sx={{width: "auto"}}>
            <Grid item xs={12} md={5} className='edit-img' style={{width: "100%", padding: "5px"}}>
            <div className="icon" style={{width: "100%", height: "100%"}}>
                <Grid xs={12} md={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {imageUrl ? 
                        <Avatar className="preview" src={imageUrl} sx={{boxShadow: 3 }}/>
                        : 
                        <Avatar className="preview" src={alt} />
                    }
                </Grid>
                <Grid xs={12} md={12} sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px"}}>
                <Button
                variant="contained"
                component="label"
                className="img-btn"
                sx={{ backgroundColor: "#2C3568", textAlign: "center", marginBottom: "5px" }}
            >
                <Typography id="save">
                Change Profile Picture
                </Typography>
                <input
                accept="image/*"
                type="file"
                hidden
                onChange={(event) => handleImage(event)}
                />
            </Button>
                </Grid>
             
            </div>
            </Grid>
            <Grid item xs={12} md={7} sx={{justifyContent: "center", alignItems: "center", display: "flex"}}>
            <Box sx={{ textAlign: "center"}}>
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
            />
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
              className="field-one"
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
              className="field-one"
            />
            <TextField
              name="bio"
              error={!!errors.bio}
              helperText={errors.bio}
              onChange={handleChange}
              value={form.bio}
              label="Bio"
              variant="filled"
              size="small"
              fullWidth
              className="field-one"
              multiline
            />
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
            <Button variant='contained' onClick={handleSaveChanges} sx={{borderRadius: "35px", marginBottom: "10px"}}>Save Changes</Button>
          
          </div></Box>
            </Grid>
          </Grid>
          
          
    </Box>
  )
}

export default EditUser