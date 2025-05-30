import { useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { validateEmail, validatePassword } from "../../utils/Validations";
import SnackBar from "../../components/Snackbar/Snackbar";
import { useAuth } from "../../context/AuthContext";
import useAPI from "../../hooks/useAPI";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { loading, request } = useAPI();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [snackBarData, setSnackBarData] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleCloseSnackbar = () => {
    setSnackBarData((prev) => ({ ...prev, open: false }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return value.trim()
          ? validateEmail(value)
            ? ""
            : "Enter a valid email address"
          : "Email is required";
      case "password":
        return value.trim()
          ? validatePassword(value)
            ? ""
            : "Password must be at least 6 characters with letters, numbers, and symbols"
          : "Password is required";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) {
      setSnackBarData({
        open: true,
        message: "Please fix the errors in the form",
        severity: "error",
      });
      return;
    }

    try {
      const user = await request({
        method: "POST",
        url: "/api/User/login",
        data: formData,
      });
      setUser(user.data);
      localStorage.setItem("user", user.data);
      setSnackBarData({
        open: true,
        message: "Login Successfull",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      setSnackBarData({
        open: true,
        message: error.message || "Login failed. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h4 className={styles.title}>
            {"Fundoo".split("").map((char, i) => {
              <span
                key={i}
                className={i % 2 == 0 ? styles.altEven : styles.altOdd}
              >
                {char}
              </span>;
            })}
          </h4>
          <h5 className={styles.subtitle}>Log In</h5>
          <p className={styles.subtitle_desc}>Use your Fundoo Account</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              label="Email *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={
                errors.email || "You can use letters, numbers & periods"
              }
              fullWidth
            />
            <TextField
              label="Password *"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((p) => !p)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box textAlign="left" mt={1}>
              <MuiLink
                component={Link}
                to="/forgot-password"
                color="primary"
                underline="hover"
              >
                Forgot Password?
              </MuiLink>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={3}
            >
              <MuiLink
                component={Link}
                to="/register"
                color="primary"
                underline="hover"
              >
                Create New Account
              </MuiLink>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                {loading ? "Logging In..." : "Login"}
              </Button>
            </Box>
          </form>
        </div>
      </div>
      <SnackBar
        open={snackBarData.open}
        message={snackBarData.message}
        handleClose={handleCloseSnackbar}
        severity={snackBarData.severity}
      />
    </>
  );
};

export default Login;
