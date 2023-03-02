
import React from "react";
import { useParams } from "react-router-dom";
import ForgotForm from "../components/ForgotForm";


import ForgotForm from '../components/ForgotForm'
import bg from "../images/1.png"


const ForgotPass = ({
  setLoading,
  setSnackbarMessage,
  setSeverity,
  setOpen,
}) => {
  const params = useParams();
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
      <ForgotForm
        token={params.token}
        setLoading={setLoading}
        setSnackbarMessage={setSnackbarMessage}
        setSeverity={setSeverity}
        setOpen={setOpen}
      />
    </div>
  );
};

export default ForgotPass;
