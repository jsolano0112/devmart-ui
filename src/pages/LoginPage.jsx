import React, { useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    let result;
    e.preventDefault();
    const newErrors = {};
    if (validateForm()) {
      const { email, password } = formData;
      result = await login({ email, password });

      if (!result.ok) {
        newErrors.password = result.errorMessage;
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    wrapper: {
      width: "100%",
      maxWidth: "440px",
    },
    header: {
      textAlign: "center",
      marginBottom: "32px",
    },
    logo: {
      display: "inline-block",
      background: "white",
      borderRadius: "16px",
      padding: "16px 24px",
      marginBottom: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    },
    logoText: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#1e293b",
      margin: 0,
    },
    logoAccent: {
      color: "#3b82f6",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "white",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#94a3b8",
      margin: 0,
    },
    card: {
      background: "white",
      borderRadius: "16px",
      padding: "40px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    },
    formGroup: {
      marginBottom: "24px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#334155",
      marginBottom: "8px",
    },
    inputWrapper: {
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "16px",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      outline: "none",
      transition: "all 0.2s",
      boxSizing: "border-box",
    },
    inputError: {
      borderColor: "#ef4444",
    },
    inputPassword: {
      paddingRight: "48px",
    },
    eyeButton: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "8px",
      color: "#94a3b8",
      fontSize: "18px",
    },
    error: {
      color: "#ef4444",
      fontSize: "13px",
      marginTop: "6px",
    },
    button: {
      width: "100%",
      padding: "14px",
      background: "#1e293b",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
      marginTop: "8px",
    },
    footer: {
      textAlign: "center",
      marginTop: "24px",
      fontSize: "14px",
      color: "#64748b",
    },
    link: {
      color: "#3b82f6",
      textDecoration: "none",
      fontWeight: "600",
    },
    successCard: {
      background: "white",
      borderRadius: "16px",
      padding: "48px",
      textAlign: "center",
      maxWidth: "400px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    },
    successIcon: {
      width: "64px",
      height: "64px",
      background: "#d1fae5",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 24px",
      fontSize: "32px",
    },
    successTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1e293b",
      marginBottom: "8px",
    },
    successText: {
      color: "#64748b",
      marginBottom: "24px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <h1 style={styles.logoText}>
              Dev<span style={styles.logoAccent}>Mart</span>
            </h1>
          </div>
          <h2 style={styles.title}>Sign in</h2>
          <p style={styles.subtitle}>Access your DevMart account</p>
        </div>

        <div style={styles.card}>
          <div>
            {/* Email */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
                style={{
                  ...styles.input,
                  ...(errors.email ? styles.inputError : {}),
                }}
              />
              {errors.email && <div style={styles.error}>{errors.email}</div>}
            </div>

            {/* Password */}
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    ...styles.input,
                    ...styles.inputPassword,
                    ...(errors.password ? styles.inputError : {}),
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? "🔓" : "🔐"}
                </button>
              </div>
              {errors.password && (
                <div style={styles.error}>{errors.password}</div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.background = "#0f172a")}
              onMouseLeave={(e) => (e.target.style.background = "#1e293b")}
            >
              Sign in
            </button>
          </div>

          <div style={styles.footer}>
            Don't have an account?{" "}
            <Link to="/SignUp" style={styles.link}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
