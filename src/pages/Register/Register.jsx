import { useState } from "react";
import styles from "./Register.module.scss";
import {
  Button,
  TextField,
  Link as MuiLink,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SnackBar from "../../components/Snackbar/Snackbar.jsx";
import useAPI from "../../hooks/useAPI.js";
import { validateField } from "../../utils/Validations.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { request, loading } = useAPI();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackBarData, setSnackBarData] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, formData.password),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key], formData.password);
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
      await request({
        method: "POST",
        url: "/api/User/register",
        data: formData,
      });
      setSnackBarData({
        open: true,
        message: "Registration successful!",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setSnackBarData({
        open: true,
        message: error.message || "Registration failed. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.leftSection}>
              <h1 className={styles.title}>
                {"Fundoo".split("").map((char, i) => (
                  <span
                    key={i}
                    className={i % 2 === 0 ? styles.altEven : styles.altOdd}
                  >
                    {char}
                  </span>
                ))}
              </h1>
              <h2 className={styles.subtitle}>Create your Fundoo Account</h2>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.nameFields}>
                  <TextField
                    label="First Name *"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    fullWidth
                  />
                  <TextField
                    label="Last Name *"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    fullWidth
                  />
                </div>
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
                <div className={styles.passwordFields}>
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
                  <TextField
                    label="Confirm *"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword((p) => !p)}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <p className={styles.passwordHint}>
                  Use 6 or more characters with a mix of letters, numbers &
                  symbols
                </p>
                <div className={styles.formFooter}>
                  <MuiLink
                    component={Link}
                    to="/login"
                    className={styles.signInLink}
                    underline="hover"
                    sx={{ pointerEvents: loading ? "none" : "auto" }}
                  >
                    Sign in instead
                  </MuiLink>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ textTransform: "none", display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Next"}
                  </Button>
                </div>
              </form>
            </div>
          <div className={styles.rightSection}>
            <div className={styles.imagePlaceholder}></div>
            <p className={styles.googleText}>
              One account. All of Google working for you.
            </p>
          </div>
        </div>
      </div>
      <SnackBar
        open={snackBarData.open}
        handleClose={() => setSnackBarData((p) => ({ ...p, open: false }))}
        message={snackBarData.message}
        severity={snackBarData.severity}
      />
    </>
  );
};

export default Register;
