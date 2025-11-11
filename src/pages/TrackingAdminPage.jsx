import React, { useEffect, useState } from "react";
import { useShipments } from "../hooks/useShipments";

const validStates = [
  "PENDIENTE",
  "PREPARANDO",
  "EN_TRANSITO",
  "EN_ENTREGA",
  "ENTREGADO",
];

export default function TrackingAdminPage() {
  const { fetchShipments, changeShipmentStatus } = useShipments();
  const [shipments, setShipments] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState(null);

  const load = async (p = 1) => {
    setLoading(true);
    setError("");
    const res = await fetchShipments(p, limit);
    setLoading(false);
    if (!res.ok) {
      setError(res.errorMessage || "Error cargando envíos");
      return;
    }
    setShipments(res.shipments || []);
    setMeta(res.meta || null);
    setPage(p);
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (shipmentId, newStatus, idx) => {
    const prev = shipments[idx];
    const updated = { ...prev, status: newStatus };
    // optimistically update
    const copy = [...shipments];
    copy[idx] = updated;
    setShipments(copy);
    const res = await changeShipmentStatus(shipmentId, newStatus);
    if (!res.ok) {
      // rollback
      copy[idx] = prev;
      setShipments(copy);
      setError(res.errorMessage || "No se pudo actualizar estado");
    }
  };

  const totalPages = meta && meta.total && meta.limit ? Math.ceil(meta.total / meta.limit) : null;

  return (
    <div style={{ padding: 20 }}>
      <h2>All Orders (Shipments)</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => load(1)} disabled={loading} style={{ marginRight: 8 }}>
          {loading ? "Cargando..." : "All Orders"}
        </button>
      </div>

      {error && <div style={{ color: "#ef4444", marginBottom: 12 }}>{error}</div>}

      <div>
        {shipments.length === 0 && !loading && <div>No hay envíos</div>}
        {shipments.map((s, idx) => (
          <div key={s.id || s.trackingId || idx} style={{ border: "1px solid #e5e7eb", padding: 12, borderRadius: 6, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <div><strong>{s.trackingId || s.trackingId}</strong></div>
                <div style={{ color: "#6b7280" }}>Order: {s.orderId}</div>
              </div>
              <div style={{ minWidth: 220 }}>
                <select value={s.status} onChange={(e) => handleStatusChange(s.trackingId, e.target.value, idx)}>
                  {validStates.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ color: "#6b7280", fontSize: 13 }}>
              Creado: {s.createdAt ? new Date(s.createdAt).toLocaleString() : "-"} • Transportista: {s.carrier || "-"}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => load(Math.max(1, page - 1))} disabled={page <= 1 || loading}>
          Prev
        </button>
        <div>Page {page}{totalPages ? ` of ${totalPages}` : ""}</div>
        <button onClick={() => load(page + 1)} disabled={loading || (totalPages && page >= totalPages)}>
          Next
        </button>
      </div>
    </div>
  );
}
