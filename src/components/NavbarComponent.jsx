import React, { useState, useContext } from "react";
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
