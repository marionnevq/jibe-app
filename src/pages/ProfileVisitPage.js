import { Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ProfileVisitPage = () => {
  
  const params = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchUserByUsername(params.username).then((response) => {
  //     setUser(response.data);
  //     setLoading(false);
  //   });
  // }, [params.id]);

  const handleSubmit = (form) => {
    // employeeService
    //   .updateEmployee(employee.id, form)
    //   .then(() => {
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status === 400) {
    //       alert(error.response.data.message[0]);
    //     }
    //   });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{minHeight: "100vh"}}>
    <Grid container sx={{height: "auto"}}>
        <Grid container item xs={12} md={12} sx={{height: "100px"}}>
          Hello
        </Grid>
        <Grid container item xs={12} md={12} sx={{backgroundColor: "black", height: "auto"}}></Grid>
        <Grid container item xs={12} md={4} sx={{backgroundColor: "pink", height: "auto"}}></Grid>
        <Grid container item xs={12} md={8} sx={{backgroundColor: "yellow", height: "auto"}}></Grid>
    </Grid>
    </div>
  )
}

export default ProfileVisitPage