import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is required"),
  contactInfo: Yup.string().required("Contact Info is required"),
});

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState();

  const initialValue = {
    name: userDetail?.name || "",
    email: userDetail?.email || "",
    username: userDetail?.username || "",
    contactInfo: userDetail?.contactInfo || "",
  };

  const fetchUsersDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/admin/users/${id}`
      );
      setUserDetail(response.data.user);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsersDetails(id);
  }, [id]);
  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/admin/user/${id}`,
        values
      );
      console.log("response", response.data);
      if (response.data) {
        navigate("/userloginlist");
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography component="h1" variant="h5">
            Update User
          </Typography>
          <Formik
            initialValues={initialValue}
            enableReinitialize={true}
            validationSchema={UpdateSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => (
              <Form style={{ width: "100%", marginTop: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Name"
                      name="name"
                      margin="normal"
                      fullWidth
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Email"
                      name="email"
                      type="email"
                      margin="normal"
                      fullWidth
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Username"
                      name="username"
                      margin="normal"
                      fullWidth
                      error={touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Contact Info"
                      name="contactInfo"
                      margin="normal"
                      fullWidth
                      error={touched.contactInfo && !!errors.contactInfo}
                      helperText={touched.contactInfo && errors.contactInfo}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDetails;
