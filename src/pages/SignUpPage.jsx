import React, { useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function SignUpPage() {
  const { signUpUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    mobilePhone: "",
    city: "",
    zipCode: "",
    isAdmin: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length > 30) {
      newErrors.firstName = "First name must be at most 30 characters";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name must contain only letters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length > 30) {
      newErrors.lastName = "Last name must be at most 30 characters";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain only letters";
    }

    if (formData.city) {
      if (formData.city.length > 30) {
        newErrors.city = "City must be at most 30 characters";
      } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.city)) {
        newErrors.city = "City must contain only letters";
      }
    }

    if (formData.address && formData.address.length > 30) {
      newErrors.address = "Address must be at most 30 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      formData.mobilePhone &&
      !/^\d{10}$/.test(formData.mobilePhone.replace(/\s/g, ""))
    ) {
      newErrors.mobilePhone = "Invalid phone number";
    }

    if (
      formData.zipCode &&
      !/^\d{6}$/.test(formData.zipCode.replace(/\s/g, ""))
    ) {
      newErrors.zipCode = "Invalid zip code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        address: formData.address || undefined,
        mobilePhone: formData.mobilePhone || undefined,
        city: formData.city || undefined,
        zipCode: formData.zipCode ? Number(formData.zipCode) : undefined,
        isAdmin: formData.isAdmin,
      };

      let result = await signUpUser(userData);
      if (!result.ok) {
        const newErrors = {};
        newErrors.generalMessage = result.errorMessage;
        setErrors(newErrors);
      } else {
        setIsSubmitted(true);
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
      maxWidth: "520px",
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
      maxHeight: "80vh",
      overflowY: "auto",
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginBottom: "24px",
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
    optional: {
      fontSize: "12px",
      color: "#94a3b8",
      fontWeight: "normal",
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
    divider: {
      borderTop: "1px solid #e2e8f0",
      margin: "24px 0",
      position: "relative",
    },
    dividerText: {
      position: "absolute",
      top: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "white",
      padding: "0 12px",
      fontSize: "12px",
      color: "#94a3b8",
      fontWeight: "500",
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
    checkboxLabel: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      padding: "16px",
      background: "#f8fafc",
      borderRadius: "8px",
      border: "2px solid #e2e8f0",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    checkbox: {
      width: "20px",
      height: "20px",
      cursor: "pointer",
      marginTop: "2px",
      accentColor: "#3b82f6",
    },
    checkboxText: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      flex: 1,
    },
    checkboxTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1e293b",
    },
    checkboxDescription: {
      fontSize: "14px",
      color: "#64748b",
    },
  };

  if (isSubmitted) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successTitle}>Registration Successful!</h2>
          <p style={styles.successText}>
            Welcome to DevMart, {formData.firstName} {formData.lastName}
          </p>
          <Link to="/" style={styles.button}>
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <h1 style={styles.logoText}>
              Dev<span style={styles.logoAccent}>Mart</span>
            </h1>
          </div>
          <h2 style={styles.title}>Create account</h2>
          <p style={styles.subtitle}>Join the developer community</p>
        </div>

        <div style={styles.card}>
          <div>
            {/* Names */}
            <div style={styles.formRow}>
              <div>
                <label htmlFor="firstName" style={styles.label}>
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  style={{
                    ...styles.input,
                    ...(errors.firstName ? styles.inputError : {}),
                  }}
                />
                {errors.firstName && (
                  <div style={styles.error}>{errors.firstName}</div>
                )}
              </div>

              <div>
                <label htmlFor="lastName" style={styles.label}>
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  style={{
                    ...styles.input,
                    ...(errors.lastName ? styles.inputError : {}),
                  }}
                />
                {errors.lastName && (
                  <div style={styles.error}>{errors.lastName}</div>
                )}
              </div>
            </div>

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

            {/* Passwords */}
            <div style={styles.formRow}>
              <div>
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

              <div>
                <label htmlFor="confirmPassword" style={styles.label}>
                  Confirm
                </label>
                <div style={styles.inputWrapper}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    style={{
                      ...styles.input,
                      ...styles.inputPassword,
                      ...(errors.confirmPassword ? styles.inputError : {}),
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                  >
                    {showConfirmPassword ? "🔓" : "🔐"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div style={styles.error}>{errors.confirmPassword}</div>
                )}
              </div>
            </div>

            {/* Seller Checkbox */}
            <div style={styles.formGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={formData.isAdmin || false}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isAdmin: e.target.checked,
                    }))
                  }
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>
                  <span style={styles.checkboxTitle}>Register as a Seller</span>
                  <span style={styles.checkboxDescription}>
                    Create and manage your own products on DevMart
                  </span>
                </span>
              </label>
            </div>

            {/* Divider */}
            <div style={styles.divider}>
              <span style={styles.dividerText}>
                ADDITIONAL INFORMATION (OPTIONAL)
              </span>
            </div>

            {/* Phone */}
            <div style={styles.formGroup}>
              <label htmlFor="mobilePhone" style={styles.label}>
                Mobile phone <span style={styles.optional}>(optional)</span>
              </label>
              <input
                type="tel"
                id="mobilePhone"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handleChange}
                placeholder="3001234567"
                style={{
                  ...styles.input,
                  ...(errors.mobilePhone ? styles.inputError : {}),
                }}
              />
              {errors.mobilePhone && (
                <div style={styles.error}>{errors.mobilePhone}</div>
              )}
            </div>

            {/* Address */}
            <div style={styles.formGroup}>
              <label htmlFor="address" style={styles.label}>
                Address <span style={styles.optional}>(optional)</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St"
                style={styles.input}
              />
              {errors.address && (
                <div style={styles.error}>{errors.address}</div>
              )}
            </div>

            {/* City and Zip Code */}
            <div style={styles.formRow}>
              <div>
                <label htmlFor="city" style={styles.label}>
                  City <span style={styles.optional}>(optional)</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Medellin"
                  style={styles.input}
                />
                {errors.city && <div style={styles.error}>{errors.city}</div>}
              </div>

              <div>
                <label htmlFor="zipCode" style={styles.label}>
                  Zip code <span style={styles.optional}>(optional)</span>
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="050001"
                  style={{
                    ...styles.input,
                    ...(errors.zipCode ? styles.inputError : {}),
                  }}
                />
                {errors.zipCode && (
                  <div style={styles.error}>{errors.zipCode}</div>
                )}
              </div>
            </div>
            {errors.generalMessage && (
              <div style={styles.error}>{errors.generalMessage}</div>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.background = "#0f172a")}
              onMouseLeave={(e) => (e.target.style.background = "#1e293b")}
            >
              Create account
            </button>
          </div>

          <div style={styles.footer}>
            Already have an account?{" "}
            <a href="/" style={styles.link}>
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
