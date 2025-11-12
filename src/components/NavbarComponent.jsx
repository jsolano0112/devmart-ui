import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userState, logout } = useContext(UserContext);
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path) => location.pathname === path;

  const clientRoutes = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/cart", label: "Cart", icon: "🛒" },
    { path: "/orders", label: "My Orders", icon: "📦" },
    { path: "/profile", label: "Profile", icon: "👤" },
  ];

  const adminRoutes = [
    { path: "/admin/products", label: "Manage Products", icon: "📝" },
    { path: "/admin/orders", label: "All Orders", icon: "📋" },
  ];

  const routes = userState.user.isAdmin
    ? [...clientRoutes, ...adminRoutes]
    : clientRoutes;

  const styles = {
    navbar: {
      background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 20px",
    },
    navContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "64px",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: "24px",
      fontWeight: "bold",
      color: "white",
    },
    logoAccent: {
      color: "#3b82f6",
    },
    desktopMenu: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    navLink: {
      padding: "8px 16px",
      borderRadius: "6px",
      textDecoration: "none",
      color: "#e2e8f0",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    navLinkActive: {
      background: "rgba(59, 130, 246, 0.2)",
      color: "#3b82f6",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      position: "relative",
    },
    userInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    userName: {
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
    },
    userRole: {
      color: "#94a3b8",
      fontSize: "12px",
    },
    adminBadge: {
      background: "#3b82f6",
      color: "white",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      fontWeight: "600",
    },
    logoutBtn: {
      padding: "8px 16px",
      background: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    mobileMenuBtn: {
      display: "none",
      background: "none",
      border: "none",
      color: "white",
      fontSize: "24px",
      cursor: "pointer",
      padding: "8px",
    },
    mobileMenu: {
      display: "none",
      flexDirection: "column",
      gap: "4px",
      padding: "16px 0",
      borderTop: "1px solid rgba(255,255,255,0.1)",
    },
    mobileMenuOpen: {
      display: "flex",
    },
    notifBtn: {
      padding: "8px 12px",
      background: "transparent",
      border: "none",
      color: "white",
      cursor: "pointer",
      position: "relative",
      fontSize: 18,
    },
    notifBadge: {
      position: "absolute",
      top: -6,
      right: -6,
      background: "#ef4444",
      color: "white",
      borderRadius: "50%",
      padding: "2px 6px",
      fontSize: 12,
      fontWeight: 700,
    },
    notifDropdown: {
      position: "absolute",
      right: 0,
      marginTop: 8,
      width: 320,
      background: "white",
      color: "#0f172a",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      boxShadow: "0 8px 24px rgba(2,6,23,0.08)",
      zIndex: 2000,
      maxHeight: 360,
      overflow: "auto",
    },
    notifItem: {
      padding: "10px 12px",
      borderBottom: "1px solid #f3f4f6",
    },
  };

  // Notification state and socket
  const [notifications, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const socketRef = useRef(null);

  const userId = userState?.user?.id ?? userState?.id ?? null;

  useEffect(() => {
    let mounted = true;
    const SOCKET_URL = process.env.REACT_APP_SOCKET_SERVER_URL || "http://localhost:5000";
    const connect = async () => {
      try {
        // dynamic import so build won't break if package missing
        const { io } = await import("socket.io-client");
        socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
        socketRef.current.on("connect", () => {
          // join personal room if userId available
          if (userId) {
            socketRef.current.emit("identify", userId);
          }
        });
        socketRef.current.on("notification", (payload) => {
          if (!mounted) return;
          setNotifications((prev) => [payload, ...prev]);
        });
        socketRef.current.on("disconnect", () => {
        });
        socketRef.current.on("connect_error", (err) => {
        });
      } catch (e) {
      }
    };
    connect();
    return () => {
      mounted = false;
      try {
        socketRef.current?.disconnect();
      } catch (e) {}
    };
  }, [userId]);

  const toggleNotifications = () => {
    setIsNotifOpen((s) => !s);
    if (!isNotifOpen) {
    }
  };

  // Media query for mobile
  const mobileStyles = `
    @media (max-width: 768px) {
      .desktop-menu { display: none !important; }
      .mobile-menu-btn { display: block !important; }
      .user-info { display: none !important; }
    }
  `;

  return (
    <>
      <style>{mobileStyles}</style>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          <div style={styles.navContent}>
            <Link to="/" style={styles.logo}>
              Dev<span style={styles.logoAccent}>Mart</span>
            </Link>

            <div style={styles.desktopMenu} className="desktop-menu">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  style={{
                    ...styles.navLink,
                    ...(isActive(route.path) ? styles.navLinkActive : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(route.path)) {
                      e.target.style.background = "rgba(255,255,255,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(route.path)) {
                      e.target.style.background = "transparent";
                    }
                  }}
                >
                  <span>{route.icon}</span>
                  {route.label}
                </Link>
              ))}
            </div>

            <div style={styles.userSection}>
              <div style={styles.userInfo} className="user-info">
                <span style={styles.userName}>
                  {userState.firstName} {userState.lastName}
                </span>
                {userState.isAdmin && (
                  <span style={styles.adminBadge}>ADMIN</span>
                )}
              </div>

              {/* Notifications button */}
              <div style={{ position: "relative" }}>
                <button style={styles.notifBtn} onClick={toggleNotifications} aria-label="Notifications">
                  🔔
                  {notifications.length > 0 && (
                    <span style={styles.notifBadge}>{notifications.length}</span>
                  )}
                </button>
                {isNotifOpen && (
                  <div style={styles.notifDropdown}>
                    {notifications.length === 0 && (
                      <div style={styles.notifItem}>No hay notificaciones</div>
                    )}
                    {notifications.map((n, i) => (
                      <div key={i} style={styles.notifItem}>
                        <div style={{ fontWeight: 700 }}>{n.type || n.title || "Notificación"}</div>
                        <div style={{ color: "#374151", marginTop: 6 }}>{n.message}</div>
                        {n.createdAt && (
                          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>{new Date(n.createdAt).toLocaleString()}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                style={styles.logoutBtn}
                onClick={handleLogout}
                onMouseEnter={(e) => (e.target.style.background = "#dc2626")}
                onMouseLeave={(e) => (e.target.style.background = "#ef4444")}
              >
                Logout
              </button>
              <button
                style={styles.mobileMenuBtn}
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div style={{ ...styles.mobileMenu, ...styles.mobileMenuOpen }}>
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  style={{
                    ...styles.navLink,
                    ...(isActive(route.path) ? styles.navLinkActive : {}),
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{route.icon}</span>
                  {route.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
