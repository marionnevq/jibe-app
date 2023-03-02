import { Button, Grid, TextField,  } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import { deleteComment, updateComment } from "../services/comment";

const EditComment = ({ handleCloseEditComment, comment }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    loadComment();
  }, []);

  const loadComment = async () => {
    setValue(comment.value);
  };

  const handleChange = ({ currentTarget: input }) => {
    setValue(input.value);
  };

  const handleSaveChanges = () => {
    console.log(comment);
    updateComment(comment.commentID, value).then((response) => {
      console.log(response);
      handleCloseEditComment();
      window.location.reload();
    });
  };

  const handleDeleteComment = () => {
    deleteComment(comment.commentID).then((response) => {
      console.log(response);
      handleCloseEditComment();
      window.location.reload();
    });
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 id="child-modal-title">Edit Comment</h2>
      </div>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <TextField
            name="value"
            onChange={handleChange}
            value={value}
            label="Caption"
            variant="filled"
            size="small"
            className="field-one"
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
            onClick={handleSaveChanges}
            sx={{
              fontFamily: "montserrat",
              fontSize: "15px",
              borderRadius: "35px",
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteComment}
            sx={{
              fontFamily: "montserrat",
              fontSize: "15px",
              borderRadius: "35px",
            }}
          >
            Delete Comment
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditComment;
