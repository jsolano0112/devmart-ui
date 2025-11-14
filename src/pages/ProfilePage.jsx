import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { userState, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userState?.user?.fullName || "",
    email: userState?.user?.email || "",
    phone: userState?.user?.phone || "",
    address: userState?.user?.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Integrar con API para guardar cambios
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: userState?.user?.fullName || "",
      email: userState?.user?.email || "",
      phone: userState?.user?.phone || "",
      address: userState?.user?.address || "",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    },
    header: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "24px",
      color: "#1e293b",
      textAlign: "center",
    },
    card: {
      background: "white",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    section: {
      marginBottom: "32px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "16px",
      paddingBottom: "8px",
      borderBottom: "2px solid #e5e7eb",
    },
    profileHeader: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "20px",
    },
    avatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "#3b82f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
      color: "white",
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "4px",
    },
    userEmail: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "8px",
    },
    badge: {
      display: "inline-block",
      background: "#fef3c7",
      color: "#92400e",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
    },
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "6px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "14px",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#3b82f6",
    },
    inputDisabled: {
      background: "#f9fafb",
      color: "#6b7280",
      cursor: "not-allowed",
    },
    buttonGroup: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      marginTop: "24px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "600",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    buttonPrimary: {
      background: "#3b82f6",
      color: "white",
    },
    buttonSecondary: {
      background: "#f3f4f6",
      color: "#1e293b",
      border: "1px solid #e5e7eb",
    },
    buttonDanger: {
      background: "#ef4444",
      color: "white",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
    },
    infoBox: {
      background: "#f9fafb",
      padding: "16px",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
    },
    infoLabel: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#6b7280",
      textTransform: "uppercase",
      marginBottom: "4px",
    },
    infoValue: {
      fontSize: "14px",
      color: "#1e293b",
      fontWeight: "500",
    },
    editButton: {
      background: "#3b82f6",
      color: "white",
    },
    statusGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "12px",
      marginTop: "12px",
    },
    statusItem: {
      background: "#f0f9ff",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #bfdbfe",
      textAlign: "center",
    },
    statusLabel: {
      fontSize: "12px",
      color: "#0369a1",
      fontWeight: "600",
      marginBottom: "4px",
    },
    statusValue: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#0c4a6e",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>👤 Mi Perfil</div>

      <div style={styles.card}>
        <div style={styles.section}>
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              {userState?.user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div style={styles.userInfo}>
              <div style={styles.userName}>{userState?.user?.fullName || "Usuario"}</div>
              <div style={styles.userEmail}>{userState?.user?.email}</div>
              {userState?.user?.role === "ADMIN" && (
                <span style={styles.badge}>👨‍💼 Administrador</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={styles.sectionTitle}>Información Personal</div>
            {!isEditing && (
              <button
                style={{ ...styles.button, ...styles.editButton }}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Editar
              </button>
            )}
          </div>

          {isEditing ? (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre Completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Ingrese su número de teléfono"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Ingrese su dirección"
                />
              </div>

              <div style={styles.buttonGroup}>
                <button
                  style={{ ...styles.button, ...styles.buttonSecondary }}
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  style={{ ...styles.button, ...styles.buttonPrimary }}
                  onClick={handleSave}
                >
                  Guardar Cambios
                </button>
              </div>
            </>
          ) : (
            <div style={styles.infoGrid}>
              <div style={styles.infoBox}>
                <div style={styles.infoLabel}>Nombre Completo</div>
                <div style={styles.infoValue}>
                  {userState?.user?.fullName || "No especificado"}
                </div>
              </div>
              <div style={styles.infoBox}>
                <div style={styles.infoLabel}>Email</div>
                <div style={styles.infoValue}>{userState?.user?.email}</div>
              </div>
              <div style={styles.infoBox}>
                <div style={styles.infoLabel}>Teléfono</div>
                <div style={styles.infoValue}>
                  {userState?.user?.phone || "No especificado"}
                </div>
              </div>
              <div style={styles.infoBox}>
                <div style={styles.infoLabel}>Dirección</div>
                <div style={styles.infoValue}>
                  {userState?.user?.address || "No especificada"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Información de la Cuenta</div>
          <div style={styles.infoGrid}>
            <div style={styles.infoBox}>
              <div style={styles.infoLabel}>Estado</div>
              <div style={styles.infoValue}>
                {userState?.user?.active ? (
                  <span style={{ color: "#10b981" }}>✓ Activa</span>
                ) : (
                  <span style={{ color: "#ef4444" }}>✗ Inactiva</span>
                )}
              </div>
            </div>
            <div style={styles.infoBox}>
              <div style={styles.infoLabel}>Rol</div>
              <div style={styles.infoValue}>
                {userState?.user?.role === "ADMIN" ? "Administrador" : "Cliente"}
              </div>
            </div>
            <div style={styles.infoBox}>
              <div style={styles.infoLabel}>ID de Usuario</div>
              <div style={styles.infoValue}>{userState?.user?.id}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Acciones de Seguridad</div>
          <div style={styles.buttonGroup}>
            <button
              style={{ ...styles.button, ...styles.buttonDanger }}
              onClick={handleLogout}
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
