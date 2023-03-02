import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EmailForm from "../components/EmailForm";
import bg from "../images/1.jpeg";

const EmailConfirmation = ({
  setLoading,
  setSnackbarMessage,
  setSeverity,
  setOpen,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "100%",
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <EmailForm
        setLoading={setLoading}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
        setOpen={setOpen}
      />
    </div>
  );
};

export default EmailConfirmation;
