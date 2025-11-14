import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useOrders } from "../hooks/useOrders";

export default function OrdersPage() {
  const { userState } = useContext(UserContext);
  const { fetchUserOrders } = useOrders();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError("");
      const res = await fetchUserOrders(userState.user.id);
      setLoading(false);

      if (!res.ok) {
        setError(res.errorMessage || "Error cargando órdenes");
        return;
      }

      setOrders(res.orders || []);
    };

    loadOrders();
  }, [userState.user.id]);

  const getStatusColor = (status) => {
    const colors = {
      PENDIENTE: "#f59e0b",
      PREPARANDO: "#06b6d4",
      EN_TRANSITO: "#8b5cf6",
      EN_ENTREGA: "#ec4899",
      ENTREGADO: "#10b981",
      CANCELADA: "#ef4444",
    };
    return colors[status] || "#6b7280";
  };

  const getStatusLabel = (status) => {
    const labels = {
      PENDIENTE: "⏳ Pendiente",
      PREPARANDO: "📦 Preparando",
      EN_TRANSITO: "🚚 En Tránsito",
      EN_ENTREGA: "📍 En Entrega",
      ENTREGADO: "✓ Entregado",
      CANCELADA: "✗ Cancelada",
    };
    return labels[status] || status;
  };

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "20px",
    },
    header: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "24px",
      color: "#1e293b",
    },
    empty: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#6b7280",
    },
    ordersList: {
      display: "grid",
      gap: "16px",
    },
    orderCard: {
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "16px",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    orderCardHover: {
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transform: "translateY(-2px)",
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
    orderId: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#1e293b",
    },
    orderStatus: {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      color: "white",
    },
    orderMeta: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
      marginBottom: "12px",
      fontSize: "13px",
      color: "#6b7280",
    },
    orderItems: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: "8px",
    },
    orderItem: {
      background: "#f3f4f6",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
    },
    orderTotal: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#059669",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>📦 Mis Órdenes</div>
        <div style={{ textAlign: "center", padding: "40px" }}>Cargando órdenes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>📦 Mis Órdenes</div>
        <div style={{ background: "#fee2e2", color: "#dc2626", padding: "12px", borderRadius: "6px" }}>
          {error}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>My orders</div>
        <div style={styles.empty}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📋</div>
          <div>Aún no tienes órdenes</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>My orders ({orders.length})</div>

      <div style={styles.ordersList}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={styles.orderCard}
            onMouseEnter={(e) => (e.currentTarget.style = { ...e.currentTarget.style, ...styles.orderCardHover })}
            onMouseLeave={(e) => (e.currentTarget.style = styles.orderCard)}
          >
            <div style={styles.orderHeader}>
              <div style={styles.orderId}>Order #{order.id}</div>
              <div
                style={{
                  ...styles.orderStatus,
                  background: getStatusColor(order.status),
                }}
              >
                {getStatusLabel(order.status)}
              </div>
            </div>

            <div style={styles.orderMeta}>
              <div>
                <div style={{ color: "#1e293b", fontWeight: "600" }}>Date</div>
                {new Date(order.createdAt).toLocaleDateString("es-CO")}
              </div>
              <div>
                <div style={{ color: "#1e293b", fontWeight: "600" }}>Address</div>
                <div style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {order.address || "N/A"}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#1e293b", fontWeight: "600" }}>Total</div>
                <div style={styles.orderTotal}>${order.total?.toLocaleString("es-CO")} COP</div>
              </div>
            </div>

            {order.products && order.products.length > 0 && (
              <div style={styles.orderItems}>
                {order.products.map((product, idx) => (
                  <div key={idx} style={styles.orderItem}>
                    {product.sku || product.name} x{product.count}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
