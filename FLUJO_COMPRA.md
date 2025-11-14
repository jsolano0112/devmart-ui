# 🛒 Flujo Completo de Compra - DevMart UI

## 📋 Resumen del Flujo

El sistema maneja el flujo completo desde la selección de productos hasta la creación automática del envío:

```
Seleccionar Productos → Carrito → Checkout → Crear Orden → Crear Envío → Confirmación
```

---

## 🔄 Flujo Detallado

### 1️⃣ **Seleccionar Productos - HomePage**

**Acción del Usuario:**
- El usuario navega a la página de inicio
- Selecciona productos y cantidad
- Hace clic en "Agregar al Carrito"

**Datos Capturados:**
```javascript
{
  sku: "64b9e8f2c987654321",
  name: "Laptop ASUS VivoBook Pro",
  price: 4200000,
  quantity: 2,
  stock: 15
}
```

**Almacenamiento:**
- Los items se guardan en `CartContext`
- Se persisten en `localStorage` con expiración de 24h
- El precio se congela por 2 horas desde que se añade

---

### 2️⃣ **Carrito - CartPage**

**Información Mostrada:**
- Lista de items con cantidad, precio (congelado con 🔒)
- Cálculo automático de:
  - Subtotal (suma de items)
  - Envío (5% o $10k mín si < $50k; gratis si ≥ $50k)
  - Total

**Acciones Disponibles:**
- ➕➖ Modificar cantidad
- ❌ Eliminar item
- 🛒 Continuar comprando
- ✅ Ir a checkout

**Validaciones:**
- Mínimo de compra: $50,000 COP
- Stock disponible

---

### 3️⃣ **Checkout - CheckoutPage**

**Paso 1: Información de Envío**
```javascript
{
  address: "123 Main Street, Springfield"  // Mín 10 caracteres
}
```

**Paso 2: Método de Pago**
```javascript
paymentMethod: 1  // 1: Tarjeta Crédito, 2: Transferencia Bancaria
```

**Paso 3: Revisión**
- Resumen de items
- Totales
- Datos de envío y pago

**Paso 4: Confirmación**
- Número de orden
- Número de guía de envío

---

### 4️⃣ **Crear Orden - POST /orders**

**Datos Enviados:**
```javascript
{
  userId: 1,
  products: [
    { sku: "64b9e8f2c987654321", count: 2 },
    { sku: "64b9e8f2c987654322", count: 1 }
  ],
  paymentMethod: 1,
  address: "123 Main Street, Springfield",
  status: "PENDIENTE",
  total: 9180000
}
```

**Respuesta del Backend:**
```javascript
{
  id: 1,
  userId: 1,
  products: [
    { sku: "64b9e8f2c987654321", count: 2 },
    { sku: "64b9e8f2c987654322", count: 1 }
  ],
  paymentMethod: 1,
  address: "123 Main Street, Springfield",
  status: "PENDIENTE",
  total: 9180000,
  createdAt: "2025-11-11T23:50:41.587Z",
  updatedAt: "2025-11-11T23:50:41.587Z"
}
```

**Hook Implicado:** `useOrders.createNewOrder()`

---

### 5️⃣ **Crear Envío - POST /shipments (Automático)**

**Datos Generados Automáticamente:**
```javascript
{
  orderId: 1,  // ID de la orden creada
  status: "PENDIENTE",
  carrier: "Por definir",
  trackingId: "TRK-2025-11-14-12345"  // Generado automáticamente
}
```

**Respuesta del Backend:**
```javascript
{
  id: 1,
  orderId: 1,
  status: "PENDIENTE",
  carrier: "Por definir",
  trackingId: "TRK-2025-11-14-12345",
  createdAt: "2025-11-14T04:00:00.000Z",
  updatedAt: "2025-11-14T04:00:00.000Z"
}
```

**Nota:** Si la creación del envío falla, la orden aún se crea exitosamente (no bloquea el flujo)

---

## 📊 Modelo de Datos - Relaciones

### Products
```javascript
{
  sku: "64b9e8f2c987654321",
  name: "Laptop ASUS VivoBook Pro",
  price: 4200000,
  stock: 15,
  categoryId: 1,
  supplierId: 1
}
```

### Orders
```javascript
{
  id: 1,
  userId: 1,
  products: [{ sku: "64b9e8f2c987654321", count: 2 }],
  paymentMethod: 1,
  address: "123 Main Street, Springfield",
  status: "PENDIENTE",
  total: 9180000,
  createdAt: "2025-11-11T23:50:41.587Z",
  updatedAt: "2025-11-11T23:50:41.587Z"
}
```

### Shipments
```javascript
{
  id: 1,
  orderId: 1,  // FK a Orders
  status: "EN_ENTREGA",
  trackingId: "TRK-20251011-00046",
  carrier: "Servientrega",
  createdAt: "2025-11-10T22:49:36.790Z",
  updatedAt: "2025-11-14T04:18:29.254Z"
}
```

---

## 🔗 Flujo de Datos - Componentes y Hooks

### HomePage.jsx
```
ProductCard → addItem(product, quantity) → CartContext
```

### CartPage.jsx
```
CartContext → Mostrar items → removeItem/updateQuantity → CartContext
```

### CheckoutPage.jsx
```
CartContext + UserContext → Formulario → createNewOrder(orderData) → useOrders
useOrders → createOrder(orderData) → ordersService
ordersService → POST /orders → Backend
Backend → Retorna orden con ID
useOrders → createShipment(shipmentData) → shipmentService
shipmentService → POST /shipments → Backend
Backend → Retorna envío con trackingId
```

### OrdersPage.jsx
```
UserContext.user.id → fetchUserOrders(userId) → useOrders
useOrders → getUserOrders(userId) → ordersService
ordersService → GET /orders/user/{userId} → Backend
Backend → Retorna array de órdenes del usuario
Mostrar lista de órdenes con status, total, productos
```

### TrackingUserPage.jsx
```
Tab "Mis Envíos" → fetchShipments(page, limit) → useShipments
useShipments → getAllShipments(page, limit) → shipmentService
shipmentService → GET /shipments?page=1&limit=100 → Backend
Mostrar envíos del usuario

Tab "Buscar por Guía" → searchByTrackingNumber(trackingNumber)
searchByTrackingNumber → getByTrackingNumber(trackingNumber)
getByTrackingNumber → GET /shipments/{trackingNumber} → Backend
Mostrar detalles del envío
```

---

## 🛡️ Validaciones

### En Frontend (useOrders.js)
- ✅ userId y products requeridos
- ✅ Mínimo $50,000 COP
- ✅ Dirección ≥ 10 caracteres

### En Backend (esperado)
- ✅ Validar stock disponible
- ✅ Verificar usuario existe
- ✅ Validar estructura de products array

---

## 💳 Estados de Orden

```
PENDIENTE → PREPARANDO → EN_TRANSITO → EN_ENTREGA → ENTREGADO
   ↓
CANCELADO
```

---

## 🚚 Estados de Envío

```
PENDIENTE → PREPARANDO → EN_TRANSITO → EN_ENTREGA → ENTREGADO
   ↓
CANCELADO
```

---

## 📱 Rutas Involucradas

| Ruta | Componente | Acción |
|------|-----------|--------|
| `/` | HomePage | Seleccionar productos |
| `/cart` | CartPage | Gestionar carrito |
| `/checkout` | CheckoutPage | Completar compra |
| `/orders` | OrdersPage | Ver mis órdenes |
| `/tracking` | TrackingUserPage | Rastrear envíos |

---

## 🔌 Endpoints API Utilizados

| Método | Endpoint | Función |
|--------|----------|---------|
| POST | `/orders` | Crear orden |
| GET | `/orders/:id` | Obtener orden por ID |
| GET | `/orders/user/:userId` | Obtener órdenes del usuario |
| PUT | `/orders/:id` | Actualizar orden |
| POST | `/shipments` | Crear envío |
| GET | `/shipments` | Listar envíos (paginado) |
| GET | `/shipments/:trackingId` | Buscar por número de guía |
| PUT | `/shipments/:trackingId` | Actualizar estado de envío |

---

## 🔄 Almacenamiento Local

### localStorage - Carrito
```javascript
Key: "devmart_cart"
Value: {
  items: [...],
  expiresAt: timestamp,
  lastModified: timestamp
}
```

**Expiración:** 24 horas desde última modificación

---

## 📝 Logging y Debugging

### Console Logs Útiles

```javascript
// ordersService.js
console.log("Orders response:", data);

// shipmentService.js
console.log("Shipment created:", shipmentRes);

// useShipments.js
console.log("Searching for tracking number:", trackingNumber);
console.log("Updating shipmentId:", shipmentId, "to status:", status);
```

---

## ✅ Verificación del Flujo

Para verificar que todo funciona correctamente:

1. **Crear carrito con 2+ productos**
   - Verificar items en localStorage
   - Verificar precio congelado

2. **Ir a checkout**
   - Validar mínimo de $50k
   - Completar dirección (>10 chars)
   - Seleccionar método de pago

3. **Crear orden**
   - Backend devuelve orden con ID
   - localStorage se limpia
   - useOrders crea envío automáticamente

4. **Verificar orden creada**
   - Ir a "Mis Órdenes"
   - Debe aparecer la orden con status PENDIENTE
   - Mostrar productos, total, dirección

5. **Rastrear envío**
   - Ir a "Tracking" → "Mis Envíos"
   - Debe aparecer el envío con trackingId
   - Status debe ser PENDIENTE

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Las órdenes no aparecen | Verificar que `/orders/user/:userId` devuelve array |
| Los envíos no se crean | Revisar logs en console, shipment puede fallar sin bloquear orden |
| Carrito se limpia prematuramente | Verificar expiración en cartReducer |
| Precios no coinciden | Verificar si se usa precio congelado vs precio actual |

---
