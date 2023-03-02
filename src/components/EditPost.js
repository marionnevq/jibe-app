import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { updatePost } from "../services/post.js";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../services/firebase";

const EditPost = ({
  handleClose,
  post,
  setLoading,
  setSnackbarMessage,
  setOpen,
  setSeverity,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [body, setBody] = useState({
    body: "",
  });

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    console.log(post);
    setBody({ body: post.body });
    setImageUrl(post.imageUrl);
    console.log(imageUrl);
  };

  const handleChange = ({ currentTarget: input }) => {
    setBody({
      ...body,
      [input.name]: input.value,
    });
    console.log(body);
  };

  const handleImage = (event) => {
    const img = event.target.files[0];
    setImageUrl(URL.createObjectURL(img));
    setImageUpload(img);
    console.log(imageUpload);
    console.log(img);
  };

  const handleSaveChanges = () => {
    setLoading(true);
    if (imageUpload == null) {
      updatePost(post.postID, {
        postID: post.postID,
        body: body.body,
      })
        .then(() => {
          setLoading(false);
          handleClose();
          setSnackbarMessage("saved changes");
          setSeverity("success");
          window.location.reload();
          setOpen(true);
        })
        .catch(() => {
          setLoading(false);
          setSnackbarMessage("An error occurred");
          setSeverity("error");
          setOpen(true);
        });
    } else {
      const imageRef = ref(storage, post.imageUrl);

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        const path = snapshot.metadata.fullPath;
        const uRef = ref(storage, path);
        getDownloadURL(uRef).then((url) => {
          updatePost(post.postID, {
            imageUrl: url,
            body: body.body,
          })
            .then(() => {
              setLoading(false);
              handleClose();
              setSnackbarMessage("saved changes");
              setSeverity("success");
              window.location.reload();
              setOpen(true);
            })
            .catch(() => {
              setLoading(false);
              setSnackbarMessage("An error occurred");
              setSeverity("error");
              setOpen(true);
            });
          // setLoading(false);
        });
      });
    }
  };

  const style = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    paddingBottom: "10px",
  };

  return (
    <Box
      className="edit-form"
      sx={{ ...style, width: "80%", height: "auto", borderRadius: "15px" }}
    >
      <Grid
        container
        sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
      >
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2 id="child-modal-title">Edit Post</h2>
      </div>
      <Grid
        container
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <TextField
            name="body"
            onChange={handleChange}
            value={body.body}
            label="Caption"
            variant="filled"
            size="small"
            fullWidth
            multiline
            rows={5}
            className="field-one"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img
            src={imageUrl === null ? post.imageUrl : imageUrl}
            style={{ width: "60%" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            component="label"
            className="img-btn"
            color="secondary"
            sx={{ borderRadius: "35px" }}
          >
            <Typography id="save">Change Picture</Typography>
            <input
              accept="image/*"
              type="file"
              hidden
              onChange={(event) => handleImage(event)}
            />
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            onClick={handleSaveChanges}
            sx={{
              fontFamily: "montserrat",
              fontSize: "15px",
              borderRadius: "35px",
            }}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditPost;
