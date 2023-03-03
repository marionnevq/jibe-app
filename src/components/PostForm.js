import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import PhotoIcon from "@mui/icons-material/Photo";
import { Box, Button, Divider, Grid, Paper, TextField } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { v4 } from "uuid";
import { storage } from "../services/firebase";
import { createPost } from "../services/post";
const PostForm = ({ currentUser, theme, setLoading, postFormSX }) => {
  const [postBody, setPostBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const imageRef = useRef();
  const [postDisabled, setPostDisabled] = useState(true);
  const handleImage = (event) => {
    const img = event.target.files[0];
    setImage({
      image: URL.createObjectURL(img),
    });
    setImageUpload(img);
    console.log(imageUpload);
    console.log(img);
  };

  const handleSavePost = () => {
    let isInvalid = isFormInvalid();
    if (isInvalid) return;
    if (imageUpload == null) {
      setLoading(true);
      createPost({
        body: postBody,
        userID: currentUser.id,
      }).then((response) => {
        console.log(response);
        setLoading(false);
        setPostBody("");
        setImage(null);
        setImageUpload(null);
        window.location.reload();
      });
    } else {
      setLoading(true);
      const fbRef = ref(storage, `images/${currentUser.username}_${v4()}`);

      uploadBytes(fbRef, imageUpload).then((snapshot) => {
        const path = snapshot.metadata.fullPath;
        const uRef = ref(storage, path);
        getDownloadURL(uRef).then((url) => {
          console.log(url);
          createPost({
            body: postBody,
            userID: currentUser.id,
            imageUrl: url,
          }).then((response) => {
            console.log(response);
            setLoading(false);
            setPostBody("");
            setImage(null);
            setImageUpload(null);
          });
        });
      });
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setPostBody(input.value);
  };

  const isFormInvalid = () => {
    if (postBody.replaceAll(/\s/g, "").length == 0) {
      if (imageUpload == null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <Paper className="post" sx={postFormSX}>
        <Box className="postInfo">
          <Box className="postDp" sx={{ p: 1 }}>
            <div className="postDp2">
              <img
                src={currentUser === null ? " " : `${currentUser.imageUrl}`}
                alt=""
              />
            </div>
          </Box>
          <Box className="postText" sx={{ p: 1 }}>
            <TextField
              className="shareText"
              placeholder="What's jibin'?"
              sx={{ width: "100%" }}
              InputProps={{
                className: "inputTextfield",
                sx: {
                  height: "auto",
                  fontFamily: "montserrat",
                  color: () => (theme === "dark" ? "white" : "black"),
                },
              }}
              onChange={handleChange}
              value={postBody}
              multiline
            />
          </Box>
          <Box className="postPhoto" sx={{ p: 0.5 }}>
            <PhotoIcon
              onClick={() => imageRef.current.click()}
              sx={{ cursor: "pointer", fontSize: "30px" }}
            />
          </Box>
        </Box>
        <div style={{ display: "none" }}>
          <input
            accept="image/*"
            type="file"
            name="myImage"
            ref={imageRef}
            onChange={(event) => handleImage(event)}
          />
        </div>
        {image && (
          <Box
            className="previewBox"
            sx={{
              p: 0.5,
              border: "1px solid #d3d3d3",
              borderRadius: "7px",
            }}
          >
            <div className="previewImage">
              <Box className="previewClose" sx={{ marginBottom: "-10px" }}>
                <CancelRoundedIcon
                  onClick={() => setImage(null)}
                  sx={{ cursor: "pointer", justifyContent: "right" }}
                />
              </Box>
              <img
                src={image.image}
                style={{
                  width: "90%",
                  height: "90%",
                  maxHeight: "680px",
                  objectFit: "contain",
                }}
              />
            </div>
          </Box>
        )}
        <Divider className="divider" />
        <Box className="sharebtn" justifyItems={"center"} sx={{ p: 0.5 }}>
          <Button
            className="shareButton"
            variant="text"
            style={{
              backgroundColor: "transparent",
              color: "#EB4660",
              fontFamily: "Montserrat",
              height: "30px",
              fontSize: "16px",
            }}
            onClick={handleSavePost}
          >
            Post
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default PostForm;
