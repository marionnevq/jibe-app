import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginSwiper from "../components/LoginSwiper";
import * as userService from "../services/user";

const Onboarding = () => {
  const [firstTimeLogin, setfirstTimeLogin] = useState(false);
  const navigate = useNavigate();

  //marionne
  async function getUser() {
    const user = await userService.getCurrentUser();
    if (!user.data.firstTimeLogin) {
      navigate("/feed");
    }
    setfirstTimeLogin(user.data.firstTimeLogin);
  }
  useEffect(() => {
    getUser();
  }, []);

  if (firstTimeLogin == false) {
    return <></>;
  } else {
    return <LoginSwiper />;
  }
};

export default Onboarding;
