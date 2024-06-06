import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  username: Yup.string().required("Username is required"),
  contactInfo: Yup.string().required("Contact Info is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/v1/register", values);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error("Error during registration");
      console.error("Error during registration", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              username: "",
              contactInfo: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form style={{ width: "100%", marginTop: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Name"
                      name="name"
                      margin="normal"
                      fullWidth
                      required
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
                      required
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Password"
                      name="password"
                      type="password"
                      margin="normal"
                      fullWidth
                      required
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Username"
                      name="username"
                      margin="normal"
                      fullWidth
                      required
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
                      required
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
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
