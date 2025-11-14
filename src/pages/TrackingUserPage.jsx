import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useShipments } from "../hooks/useShipments";

export default function TrackingPage() {
  const { userState } = useContext(UserContext);
  const { searchByTrackingNumber, fetchShipments } = useShipments();

  const [activeTab, setActiveTab] = useState("myShipments"); // myShipments, searchTracking
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [userShipments, setUserShipments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validStates = [
    "PENDIENTE",
    "PREPARANDO",
    "EN_TRANSITO",
    "EN_ENTREGA",
    "ENTREGADO",
  ];

  // Load user shipments on mount
  useEffect(() => {
    if (activeTab === "myShipments") {
      loadUserShipments();
    }
  }, [activeTab]);

  const loadUserShipments = async () => {
    setLoading(true);
    setError("");
    // Fetch all shipments and filter by user's orders
    const res = await fetchShipments(1, 100);
    setLoading(false);

    if (!res.ok) {
      setError(res.errorMessage || "Error cargando envíos");
      return;
    }

    setUserShipments(res.shipments || []);
  };

  const handleSearchTracking = async () => {
    setError("");
    setTrackingData(null);

    if (!trackingNumber.trim()) {
      setError("Por favor, ingrese un número de guía válido");
      return;
    }

    setLoading(true);
    const result = await searchByTrackingNumber(trackingNumber.trim());
    setLoading(false);

    if (!result.ok) {
      setError(result.errorMessage || "No se encontró el envío");
      return;
    }

    if (result.tracking && result.tracking.status) {
      setTrackingData(result.tracking);
    } else {
      setError("No se pudo obtener el estado del envío");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDIENTE: "#f59e0b",
      PREPARANDO: "#06b6d4",
      EN_TRANSITO: "#8b5cf6",
      EN_ENTREGA: "#ec4899",
      ENTREGADO: "#10b981",
    };
    return colors[status] || "#6b7280";
  };

  const getProgressPercentage = (status) => {
    const steps = {
      PENDIENTE: 20,
      PREPARANDO: 40,
      EN_TRANSITO: 60,
      EN_ENTREGA: 80,
      ENTREGADO: 100,
    };
    return steps[status] || 0;
  };

  const styles = {
    container: {
      maxWidth: "1000px",
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
    tabs: {
      display: "flex",
      gap: "12px",
      marginBottom: "24px",
      borderBottom: "2px solid #e5e7eb",
    },
    tab: {
      padding: "12px 24px",
      background: "transparent",
      border: "none",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      color: "#6b7280",
      borderBottom: "3px solid transparent",
      transition: "all 0.2s",
    },
    tabActive: {
      color: "#3b82f6",
      borderBottomColor: "#3b82f6",
    },
    content: {
      background: "white",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    searchBox: {
      display: "flex",
      gap: "12px",
      marginBottom: "24px",
    },
    input: {
      flex: 1,
      padding: "12px 16px",
      fontSize: "16px",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      outline: "none",
      transition: "border-color 0.2s",
    },
    inputFocus: {
      borderColor: "#3b82f6",
    },
    button: {
      padding: "12px 24px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    buttonDisabled: {
      background: "#d1d5db",
      cursor: "not-allowed",
    },
    error: {
      background: "#fee2e2",
      color: "#dc2626",
      padding: "12px 16px",
      borderRadius: "8px",
      marginBottom: "16px",
      fontSize: "14px",
    },
    shipmentCard: {
      background: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "16px",
    },
    shipmentHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
    trackingId: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#1e293b",
      fontFamily: "monospace",
    },
    statusBadge: {
      padding: "6px 12px",
      borderRadius: "20px",
      color: "white",
      fontSize: "12px",
      fontWeight: "600",
    },
    shipmentMeta: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "12px",
      marginBottom: "12px",
      fontSize: "13px",
      color: "#6b7280",
    },
    metaItem: {
      display: "flex",
      flexDirection: "column",
    },
    metaLabel: {
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "4px",
    },
    progressBar: {
      width: "100%",
      height: "6px",
      background: "#e5e7eb",
      borderRadius: "3px",
      overflow: "hidden",
      marginTop: "8px",
    },
    progressFill: {
      height: "100%",
      background: "#3b82f6",
      transition: "width 0.3s ease",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px 20px",
      color: "#6b7280",
    },
    emptyIcon: {
      fontSize: "48px",
      marginBottom: "12px",
    },
    detailsBox: {
      marginTop: "16px",
      padding: "12px",
      background: "#f0f9ff",
      borderRadius: "8px",
      border: "1px solid #bfdbfe",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
      fontSize: "14px",
    },
    detailLabel: {
      fontWeight: "600",
      color: "#64748b",
    },
    detailValue: {
      color: "#1e293b",
    },
  };

  return (
    <div style={styles.container}>

      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === "myShipments" && styles.tabActive),
          }}
          onClick={() => setActiveTab("myShipments")}
        >
          📦 Mis Envíos
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === "searchTracking" && styles.tabActive),
          }}
          onClick={() => setActiveTab("searchTracking")}
        >
          🔍 Buscar por Guía
        </button>
      </div>

      <div style={styles.content}>
        {error && <div style={styles.error}>{error}</div>}

        {activeTab === "myShipments" && (
          <div>
            <div style={{ marginBottom: "16px", color: "#6b7280", fontSize: "14px" }}>
              {userShipments.length === 0 ? (
                "Aún no tienes envíos"
              ) : (
                `Mostrando ${userShipments.length} envío${userShipments.length !== 1 ? "s" : ""}`
              )}
            </div>

            {loading ? (
              <div style={styles.emptyState}>Cargando envíos...</div>
            ) : userShipments.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📭</div>
                <div>No tienes envíos registrados</div>
              </div>
            ) : (
              userShipments.map((shipment) => (
                <div key={shipment.id} style={styles.shipmentCard}>
                  <div style={styles.shipmentHeader}>
                    <div style={styles.trackingId}>{shipment.trackingId}</div>
                    <div
                      style={{
                        ...styles.statusBadge,
                        background: getStatusColor(shipment.status),
                      }}
                    >
                      {shipment.status}
                    </div>
                  </div>

                  <div style={styles.shipmentMeta}>
                    <div style={styles.metaItem}>
                      <span style={styles.metaLabel}>Orden</span>
                      <span>#{shipment.orderId}</span>
                    </div>
                    <div style={styles.metaItem}>
                      <span style={styles.metaLabel}>Transportista</span>
                      <span>{shipment.carrier || "N/A"}</span>
                    </div>
                    <div style={styles.metaItem}>
                      <span style={styles.metaLabel}>Fecha</span>
                      <span>
                        {new Date(shipment.createdAt).toLocaleDateString("es-CO")}
                      </span>
                    </div>
                  </div>

                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${getProgressPercentage(shipment.status)}%`,
                      }}
                    ></div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "12px", marginTop: "12px", fontSize: "12px", color: "#6b7280" }}>
                    {validStates.map((state, idx) => (
                      <div
                        key={state}
                        style={{
                          opacity: validStates.indexOf(shipment.status) >= idx ? 1 : 0.5,
                          textAlign: "center",
                        }}
                      >
                        <div style={{ marginBottom: "4px" }}>
                          {validStates.indexOf(shipment.status) > idx && "✓"}
                          {validStates.indexOf(shipment.status) === idx && "→"}
                        </div>
                        <div>{state}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "searchTracking" && (
          <div>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Ingresa tu número de guía (ej: TRK-20251110-94194)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearchTracking()}
                style={styles.input}
              />
              <button
                style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
                onClick={handleSearchTracking}
                disabled={loading}
              >
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>

            {trackingData && (
              <div style={styles.shipmentCard}>
                <div style={styles.shipmentHeader}>
                  <div style={styles.trackingId}>{trackingData.trackingId}</div>
                  <div
                    style={{
                      ...styles.statusBadge,
                      background: getStatusColor(trackingData.status),
                    }}
                  >
                    {trackingData.status}
                  </div>
                </div>

                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${getProgressPercentage(trackingData.status)}%`,
                    }}
                  ></div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "12px", marginTop: "12px", fontSize: "12px", color: "#6b7280" }}>
                  {validStates.map((state, idx) => (
                    <div
                      key={state}
                      style={{
                        opacity: validStates.indexOf(trackingData.status) >= idx ? 1 : 0.5,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ marginBottom: "4px" }}>
                        {validStates.indexOf(trackingData.status) > idx && "✓"}
                        {validStates.indexOf(trackingData.status) === idx && "→"}
                      </div>
                      <div>{state}</div>
                    </div>
                  ))}
                </div>

                <div style={styles.detailsBox}>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Número de Guía:</span>
                    <span style={styles.detailValue}>{trackingData.trackingId}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Transportista:</span>
                    <span style={styles.detailValue}>{trackingData.carrier || "N/A"}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>ID de Orden:</span>
                    <span style={styles.detailValue}>{trackingData.orderId}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Fecha de Creación:</span>
                    <span style={styles.detailValue}>
                      {new Date(trackingData.createdAt).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!trackingData && !loading && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>🔍</div>
                <div>Ingresa un número de guía para buscar</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
