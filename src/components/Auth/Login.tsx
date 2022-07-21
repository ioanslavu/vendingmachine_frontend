import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Box, Avatar, Typography, TextField, Button, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { UserType } from "../../context/AuthProvider";
import { login } from "../../services/Auth.service";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // @ts-ignore
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const auth = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { username, password } = values;

      setMessage("");
      setLoading(true);

      login(username, password).then(
        (data) => {
          const userData: UserType = { ...data };
          auth.setUser(userData);
          setLoading(false);
          if (data.message === "There is already an active session using your account") {
            navigate("/logoutall", { replace: true });
          } else {
            navigate(from, { replace: true });
          }
        },
        (error) => {
          let resMessage: string = "";
          if (error.response.status === 401) {
            resMessage = "Invalid username or password!";
          } else {
            resMessage =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          }
          setLoading(false);
          setMessage(resMessage);
        }
      );
    },
  });

  if (loading) {
    return (
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Loading..
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {message && (
          <Typography component="h1" variant="h5">
            {message}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/register">
              <Typography variant="body2"> Don&apos;t have an account? Sign Up</Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default LoginPage;
