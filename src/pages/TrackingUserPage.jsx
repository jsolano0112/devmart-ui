
import React, { useState } from "react";
import { useShipments } from "../hooks/useShipments";

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingStatus, setTrackingStatus] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchByTrackingNumber } = useShipments();

  const validStates = [
    "PENDIENTE",
    "PREPARANDO",
    "EN_TRANSITO",
    "EN_ENTREGA",
    "ENTREGADO",
  ];

  const handleSearch = async () => {
    setError("");
    setTrackingStatus(null);
    setTrackingData(null);
    if (!trackingNumber.trim()) {
      setError("Por favor, ingrese un número de guía válido");
      return;
    }
    setLoading(true);
    const result = await searchByTrackingNumber(trackingNumber.trim());
    console.log("result", result);
    setLoading(false);
    if (!result.ok) {
      setError(result.errorMessage || "No se encontró el envío");
      return;
    }
    // Extraer el estado del objeto tracking
    if (result.tracking && result.tracking.status) {
      setTrackingStatus(result.tracking.status);
      setTrackingData(result.tracking);
    } else {
      setError("No se pudo obtener el estado del envío");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      width: "100%",
      maxWidth: "600px",
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      padding: "40px",
      textAlign: "center",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#1e293b",
      marginBottom: "24px",
    },
    inputGroup: {
      display: "flex",
      gap: "12px",
      marginBottom: "24px",
    },
    input: {
      flex: 1,
      padding: "12px 16px",
      fontSize: "16px",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      outline: "none",
      transition: "border-color 0.2s",
    },
    button: {
      padding: "12px 20px",
      background: "#1e293b",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    stepper: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "30px",
      position: "relative",
    },
    step: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 1,
      width: "20%",
    },
    circle: (active) => ({
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      background: active ? "#3b82f6" : "#e2e8f0",
      color: active ? "white" : "#94a3b8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "8px",
      transition: "all 0.3s ease",
    }),
    label: (active) => ({
      fontSize: "12px",
      color: active ? "#1e293b" : "#94a3b8",
      fontWeight: active ? "600" : "400",
      transition: "color 0.3s ease",
    }),
    connector: {
      position: "absolute",
      top: "16px",
      left: "10%",
      right: "10%",
      height: "4px",
      background: "#e2e8f0",
      zIndex: 0,
    },
    connectorActive: (progress) => ({
      position: "absolute",
      top: "16px",
      left: "10%",
      height: "4px",
      width: `${progress}%`,
      background: "#3b82f6",
      transition: "width 0.4s ease",
      zIndex: 0,
    }),
    error: {
      color: "#ef4444",
      fontSize: "14px",
      marginTop: "8px",
    },
    statusBox: {
      marginTop: "20px",
      padding: "14px",
      background: "#f8fafc",
      borderRadius: "8px",
      color: "#1e293b",
      fontSize: "16px",
      fontWeight: "600",
    },
    detailsBox: {
      marginTop: "20px",
      padding: "14px",
      background: "#f0f9ff",
      borderRadius: "8px",
      color: "#1e293b",
      fontSize: "14px",
      border: "1px solid #bfdbfe",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
    },
    detailLabel: {
      fontWeight: "600",
      color: "#64748b",
    },
    detailValue: {
      color: "#1e293b",
    },
  };

  const currentStep = trackingStatus
    ? validStates.indexOf(trackingStatus)
    : -1;
  const progress = currentStep >= 0 ? (currentStep / 4) * 80 + 10 : 0;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Seguimiento de Envíos</h1>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Ingrese el número de guía"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            style={styles.input}
            disabled={loading}
          />
          <button
            style={styles.button}
            onClick={handleSearch}
            disabled={loading}
            onMouseEnter={(e) => (e.target.style.background = "#0f172a")}
            onMouseLeave={(e) => (e.target.style.background = "#1e293b")}
          >
            {loading ? "Buscando..." : "Consultar"}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {trackingStatus && (
          <>
            <div style={styles.stepper}>
              <div style={styles.connector}></div>
              <div style={styles.connectorActive(progress)}></div>
              {validStates.map((state, index) => {
                const active = index <= currentStep;
                return (
                  <div key={state} style={styles.step}>
                    <div style={styles.circle(active)}>{index + 1}</div>
                    <span style={styles.label(active)}>{state}</span>
                  </div>
                );
              })}
            </div>

            <div style={styles.statusBox}>
              Estado actual: <strong>{trackingStatus}</strong>
            </div>

            {trackingData && (
              <div style={styles.detailsBox}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Número de Guía:</span>
                  <span style={styles.detailValue}>{trackingData.trackingId}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Transportista:</span>
                  <span style={styles.detailValue}>{trackingData.carrier}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>ID de Orden:</span>
                  <span style={styles.detailValue}>{trackingData.orderId}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Fecha de Creación:</span>
                  <span style={styles.detailValue}>
                    {new Date(trackingData.createdAt).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
