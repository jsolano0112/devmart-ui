import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartProvider";
import { UserContext } from "../contexts/UserProvider";
import { useOrders } from "../hooks/useOrders";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartState, removeItem, updateQuantity, clearCart, calculateSubtotal, calculateShipping, calculateTotal, canCheckout } = useContext(CartContext);
  const { userState } = useContext(UserContext);
  const { createNewOrder } = useOrders();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkoutStep, setCheckoutStep] = useState("review"); // review, shipping, payment, confirm

  const handleRemoveItem = (sku) => {
    removeItem(sku);
  };

  const handleQuantityChange = (sku, newQty) => {
    if (newQty > 0) {
      updateQuantity(sku, newQty);
    }
  };

  const handleCheckout = async () => {
    setError("");

    if (!canCheckout()) {
      setError("No se puede proceder al checkout. Verifica carrito y monto mínimo.");
      return;
    }

    setLoading(true);
    const orderData = {
      userId: userState.user.id,
      products: cartState.items.map((item) => ({
        sku: item.sku,
        count: item.quantity,
      })),
      paymentMethod: 1, // Default to credit card
      total: calculateTotal(),
      address: "", // Will be filled in shipping step
      status: "PENDIENTE",
    };

    const res = await createNewOrder(orderData);
    setLoading(false);

    if (!res.ok) {
      setError(res.errorMessage || "Error al crear la orden");
      return;
    }

    // Clear cart and redirect
    clearCart();
    navigate(`/orders/${res.order.id}`);
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
    header: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "24px",
      color: "#1e293b",
    },
    cartEmpty: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#6b7280",
    },
    itemsContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 350px",
      gap: "24px",
    },
    itemsList: {
      background: "white",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
    },
    item: {
      padding: "16px",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemInfo: {
      flex: 1,
    },
    itemName: {
      fontWeight: "600",
      marginBottom: "4px",
    },
    itemSku: {
      fontSize: "12px",
      color: "#6b7280",
      marginBottom: "8px",
    },
    itemPrice: {
      fontSize: "14px",
      color: "#059669",
      fontWeight: "600",
    },
    itemFrozen: {
      fontSize: "12px",
      color: "#0891b2",
      marginTop: "4px",
    },
    quantityControl: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginRight: "16px",
    },
    quantityBtn: {
      width: "32px",
      height: "32px",
      border: "1px solid #d1d5db",
      background: "white",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "16px",
    },
    quantityInput: {
      width: "50px",
      padding: "4px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      textAlign: "center",
    },
    removeBtn: {
      padding: "8px 12px",
      background: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
    },
    summary: {
      background: "white",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
      padding: "16px",
      height: "fit-content",
      position: "sticky",
      top: "20px",
    },
    summaryTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "12px",
      color: "#1e293b",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
      color: "#6b7280",
    },
    summaryTotal: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "12px",
      paddingTop: "12px",
      borderTop: "1px solid #e5e7eb",
      fontSize: "18px",
      fontWeight: "bold",
      color: "#1e293b",
    },
    checkoutBtn: {
      width: "100%",
      padding: "12px",
      marginTop: "16px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    checkoutBtnDisabled: {
      background: "#d1d5db",
      cursor: "not-allowed",
    },
    error: {
      background: "#fee2e2",
      color: "#dc2626",
      padding: "12px",
      borderRadius: "6px",
      marginBottom: "16px",
    },
    minOrderWarning: {
      background: "#fef3c7",
      color: "#92400e",
      padding: "12px",
      borderRadius: "6px",
      marginBottom: "16px",
      fontSize: "14px",
    },
  };

  if (cartState.items.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.cartEmpty}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📦</div>
          <div style={{ marginBottom: "12px" }}>Your cart is empty</div>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
           Continue shopping
          </button>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping();
  const total = calculateTotal();
  const canProceed = subtotal >= 50000;

  return (
    <div style={styles.container}>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.itemsContainer}>
        <div style={styles.itemsList}>
          {cartState.items.map((item) => (
            <div key={item.sku} style={styles.item}>
              <div style={styles.itemInfo}>
                <div style={styles.itemName}>{item.name}</div>
                <div style={styles.itemSku}>SKU: {item.sku}</div>
                <div style={styles.itemPrice}>
                  ${(item.frozenPrice || item.price).toLocaleString("es-CO")} COP
                </div>
                {item.frozenPrice && (
                  <div style={styles.itemFrozen}>🔒 Precio congelado por 2 horas</div>
                )}
              </div>
              <div style={styles.quantityControl}>
                <button
                  style={styles.quantityBtn}
                  onClick={() => handleQuantityChange(item.sku, item.quantity - 1)}
                >
                  −
                </button>
                <input
                  type="number"
                  style={styles.quantityInput}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.sku, parseInt(e.target.value) || 1)}
                  min="1"
                  max={item.stock}
                />
                <button
                  style={styles.quantityBtn}
                  onClick={() => handleQuantityChange(item.sku, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>
              <button style={styles.removeBtn} onClick={() => handleRemoveItem(item.sku)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <div style={styles.summaryTitle}>Resumen de Orden</div>
          <div style={styles.summaryRow}>
            <span>Subtotal ({cartState.items.length} items):</span>
            <span>${subtotal.toLocaleString("es-CO")} COP</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Envío:</span>
            <span>${shipping.toLocaleString("es-CO")} COP</span>
          </div>
          {subtotal >= 50000 && (
            <div style={{ fontSize: "12px", color: "#059669", marginBottom: "8px" }}>
              ✓ ¡Envío gratis! (Orden ≥ $50,000)
            </div>
          )}
          <div style={styles.summaryTotal}>
            <span>Total:</span>
            <span>${total.toLocaleString("es-CO")} COP</span>
          </div>

          {!canProceed && (
            <div style={styles.minOrderWarning}>
              ⚠️ Orden mínima: $50,000 COP
              <br />
              Te faltan: ${(50000 - subtotal).toLocaleString("es-CO")} COP
            </div>
          )}

          <button
            style={{
              ...styles.checkoutBtn,
              ...((!canProceed || loading) && styles.checkoutBtnDisabled),
            }}
            onClick={handleCheckout}
            disabled={!canProceed || loading}
          >
            {loading ? "Procesando..." : "Proceder al Checkout"}
          </button>

          <button
            style={{
              ...styles.checkoutBtn,
              background: "#6b7280",
              marginTop: "8px",
            }}
            onClick={() => navigate("/")}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
}
