import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../services/Auth.service";
import Role from "../../common/Roles";

function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: Role.Buyer,
    },
    validationSchema,
    onSubmit: (values) => {
      const { username, password, role } = values;

      setMessage("");
      setLoading(true);
      register(username, password, role).then(
        (data) => {
          if (data.status === true) {
            setLoading(false);
            navigate("/login", { replace: true });
          } else {
            setMessage(data.message);
            setLoading(false);
          }
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

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
        Sign up
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
        <InputLabel id="role-label">Role *</InputLabel>
        <Select
          required
          fullWidth
          name="role"
          label=""
          type="role"
          id="role"
          labelId="role-label"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
        >
          <MenuItem value={Role.Buyer}>Buyer</MenuItem>
          <MenuItem value={Role.Seller}>Seller</MenuItem>
        </Select>
        {message && (
          <Typography component="h1" variant="h5">
            {message}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/login">
              <Typography variant="body2"> Already have an account? Sign in</Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default RegisterPage;
