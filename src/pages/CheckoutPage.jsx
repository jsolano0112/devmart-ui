import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartProvider";
import { UserContext } from "../contexts/UserProvider";
import { useOrders } from "../hooks/useOrders";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartState, calculateSubtotal, calculateShipping, calculateTotal, clearCart } = useContext(CartContext);
  const { userState } = useContext(UserContext);
  const { createNewOrder } = useOrders();

  const [formData, setFormData] = useState({
    address: "",
    paymentMethod: "credit_card",
  });
  const [step, setStep] = useState("shipping"); // shipping, payment, review, confirm
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  useEffect(() => {
    // Redirect to cart if empty
    if (cartState.items.length === 0) {
      navigate("/cart");
    }
  }, []);

  const handleAddressChange = (e) => {
    setFormData({ ...formData, address: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const validateShippingStep = () => {
    const { address } = formData;
    if (!address || address.trim().length < 10) {
      setError("Dirección debe tener al menos 10 caracteres");
      return false;
    }
    setError("");
    return true;
  };

  const handleConfirmOrder = async () => {
    if (!validateShippingStep()) return;

    setLoading(true);
    setError("");

    const orderData = {
      userId: userState.user.id,
      products: cartState.items.map((item) => ({
        sku: item.sku,
        count: item.quantity,
      })),
      paymentMethod: formData.paymentMethod === "credit_card" ? 1 : 2,
      total: calculateTotal(),
      address: formData.address,
      status: "PENDIENTE",
    };

    const res = await createNewOrder(orderData);
    setLoading(false);

    if (!res.ok) {
      setError(res.errorMessage || "Error al crear la orden");
      return;
    }

    setOrderConfirmation(res.order);
    setStep("confirm");
    clearCart();
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping();
  const total = calculateTotal();

  const paymentMethods = [
    { value: "credit_card", label: "💳 Tarjeta de Crédito" },
    { value: "bank_transfer", label: "🏦 Transferencia Bancaria" },
  ];

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
    },
    header: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "24px",
      color: "#1e293b",
    },
    stepIndicator: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "32px",
      gap: "8px",
    },
    step: {
      flex: 1,
      height: "8px",
      borderRadius: "4px",
      background: "#e5e7eb",
    },
    stepActive: {
      background: "#3b82f6",
    },
    content: {
      display: "grid",
      gridTemplateColumns: "1fr 350px",
      gap: "24px",
      marginBottom: "24px",
    },
    formCard: {
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "24px",
    },
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#1e293b",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      fontFamily: "inherit",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      fontFamily: "inherit",
      minHeight: "80px",
      resize: "vertical",
    },
    radioGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    radioItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      cursor: "pointer",
    },
    summary: {
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "16px",
      height: "fit-content",
      position: "sticky",
      top: "20px",
    },
    summaryTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "12px",
      color: "#1e293b",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
      fontSize: "14px",
      color: "#6b7280",
    },
    summaryTotal: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "12px",
      paddingTop: "12px",
      borderTop: "1px solid #e5e7eb",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#1e293b",
    },
    buttons: {
      display: "flex",
      gap: "12px",
      marginTop: "24px",
    },
    btn: {
      flex: 1,
      padding: "12px",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    btnPrimary: {
      background: "#3b82f6",
      color: "white",
    },
    btnSecondary: {
      background: "#e5e7eb",
      color: "#1e293b",
    },
    error: {
      background: "#fee2e2",
      color: "#dc2626",
      padding: "12px",
      borderRadius: "6px",
      marginBottom: "16px",
    },
    confirmationBox: {
      background: "#ecfdf5",
      border: "1px solid #86efac",
      borderRadius: "8px",
      padding: "24px",
      textAlign: "center",
    },
    confirmationTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#15803d",
      marginBottom: "12px",
    },
    confirmationNumber: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#1e293b",
      marginBottom: "12px",
      fontFamily: "monospace",
    },
  };

  if (orderConfirmation) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>Orden Confirmada ✓</div>
        <div style={styles.confirmationBox}>
          <div style={styles.confirmationTitle}>¡Gracias por tu compra!</div>
          <p>Tu orden ha sido creada exitosamente.</p>
          <div style={styles.confirmationNumber}>
            Número de Orden: {orderConfirmation.id || "ORD-PENDING"}
          </div>
          <p style={{ color: "#6b7280", marginBottom: "12px" }}>
            Total: ${total.toLocaleString("es-CO")} COP
          </p>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Te enviaremos un email de confirmación y actualizaciones sobre tu envío.
          </p>
          <button
            style={{ ...styles.btn, ...styles.btnPrimary, width: "200px", margin: "0 auto" }}
            onClick={() => navigate("/orders")}
          >
            Ver mis órdenes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>Checkout</div>

      <div style={styles.stepIndicator}>
        <div style={{ ...styles.step, ...(step === "shipping" || true && styles.stepActive) }}></div>
        <div style={{ ...styles.step, ...(["payment", "review", "confirm"].includes(step) && styles.stepActive) }}></div>
        <div style={{ ...styles.step, ...(step === "confirm" && styles.stepActive) }}></div>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.content}>
        <div>
          {step === "shipping" && (
            <div style={styles.formCard}>
              <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
                📦 Dirección de Envío
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Dirección Completa *</label>
                <textarea
                  style={styles.textarea}
                  value={formData.address}
                  onChange={handleAddressChange}
                  placeholder="Ingresa tu dirección completa (calle, número, apartamento, ciudad, código postal)"
                />
              </div>
            </div>
          )}

          {step === "payment" && (
            <div style={styles.formCard}>
              <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
                💳 Método de Pago
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Selecciona un método de pago *</label>
                <div style={styles.radioGroup}>
                  {paymentMethods.map((pm) => (
                    <label
                      key={pm.value}
                      style={{
                        ...styles.radioItem,
                        ...(formData.paymentMethod === pm.value && { background: "#dbeafe", borderColor: "#3b82f6" }),
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={pm.value}
                        checked={formData.paymentMethod === pm.value}
                        onChange={handlePaymentChange}
                      />
                      {pm.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === "review" && (
            <div style={styles.formCard}>
              <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
                ✓ Revisa tu Orden
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Dirección:</div>
                <div style={{ color: "#6b7280", fontSize: "14px" }}>{formData.address}</div>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Método de Pago:</div>
                <div style={{ color: "#6b7280", fontSize: "14px" }}>
                  {paymentMethods.find((p) => p.value === formData.paymentMethod)?.label}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={styles.summary}>
          <div style={styles.summaryTitle}>Resumen</div>
          {cartState.items.map((item) => (
            <div key={item.sku} style={styles.summaryRow}>
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>${((item.frozenPrice || item.price) * item.quantity).toLocaleString("es-CO")}</span>
            </div>
          ))}
          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString("es-CO")}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Envío:</span>
            <span>${shipping.toLocaleString("es-CO")}</span>
          </div>
          <div style={styles.summaryTotal}>
            <span>Total:</span>
            <span>${total.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>

      <div style={styles.buttons}>
        <button
          style={{ ...styles.btn, ...styles.btnSecondary }}
          onClick={() => navigate("/cart")}
          disabled={loading}
        >
          ← Volver al Carrito
        </button>

        {step === "shipping" && (
          <button
            style={{ ...styles.btn, ...styles.btnPrimary }}
            onClick={() => {
              if (validateShippingStep()) setStep("payment");
            }}
            disabled={loading}
          >
            Continuar → 
          </button>
        )}

        {step === "payment" && (
          <button
            style={{ ...styles.btn, ...styles.btnPrimary }}
            onClick={() => setStep("review")}
            disabled={loading}
          >
            Revisar Orden →
          </button>
        )}

        {step === "review" && (
          <button
            style={{ ...styles.btn, ...styles.btnPrimary }}
            onClick={handleConfirmOrder}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Confirmar Compra"}
          </button>
        )}
      </div>
    </div>
  );
}
