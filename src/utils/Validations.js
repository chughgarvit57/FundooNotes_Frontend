export const validateEmail = (email) => {
  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegEx.test(email);
};

export const validatePassword = (password) => {
  return (
    password.length >= 6 &&
    /[a-zA-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
};

export const validateField = (name, value, password) => {
  switch (name) {
    case "firstName":
    case "lastName":
      return value.trim()
        ? ""
        : `${name === "firstName" ? "First" : "Last"} name is required`;
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
    case "confirmPassword":
      return value.trim()
        ? value === password
          ? ""
          : "Passwords do not match"
        : "Confirm password is required";
    default:
      return "";
  }
};
