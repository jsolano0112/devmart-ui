import React, { useState } from 'react';

export default function ManageProductsPage() {
  const [products, setProducts] = useState([
    {
      name: 'React Dashboard',
      description: 'Modern admin dashboard',
      price: 49.99,
      stock: 15,
      images: 'https://via.placeholder.com/150',
      sku: 'RD001',
      categoryId: 1,
      supplierId: 1
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    images: '',
    sku: '',
    categoryId: '',
    supplierId: 1
  });
  const [errors, setErrors] = useState({});

  // Mock categories
  const categories = [
    { id: 1, name: 'Templates' },
    { id: 2, name: 'Code' },
    { id: 3, name: 'Components' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) {
      newErrors.price = 'Price must have at most 2 decimal places';
    }

    if (!formData.stock) {
      newErrors.stock = 'Stock is required';
    } else if (!Number.isInteger(Number(formData.stock)) || Number(formData.stock) < 0 || Number(formData.stock) > 9999) {
      newErrors.stock = 'Stock must be between 0 and 9999';
    }

    if (!formData.images.trim()) {
      newErrors.images = 'Image URL is required';
    } else if (!/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))(?:\?.*)?(?:#.*)?$/i.test(formData.images)) {
      newErrors.images = 'Must be a valid image URL (.png, .jpg, .jpeg, .gif, .svg, .webp)';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        images: '',
        sku: '',
        categoryId: '',
        supplierId: 1
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      images: '',
      sku: '',
      categoryId: '',
      supplierId: 1
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Aquí iría tu llamada al API
    if (editingProduct) {
      // Update
      setProducts(products.map(p => p.sku === editingProduct.sku ? formData : p));
      alert('✅ Product updated successfully!');
    } else {
      // Create
      setProducts([...products, formData]);
      alert('✅ Product created successfully!');
    }

    handleCloseModal();
  };

  const handleDelete = (sku) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.sku !== sku));
      alert('✅ Product deleted successfully!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '40px 20px'
    },
    content: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1e293b'
    },
    addButton: {
      padding: '12px 24px',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px'
    },
    productCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.2s'
    },
    productImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '16px',
      background: '#f1f5f9'
    },
    productName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '8px'
    },
    productDescription: {
      fontSize: '14px',
      color: '#64748b',
      marginBottom: '12px'
    },
    productDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '16px',
      padding: '12px',
      background: '#f8fafc',
      borderRadius: '6px'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px'
    },
    detailLabel: {
      color: '#64748b',
      fontWeight: '500'
    },
    detailValue: {
      color: '#1e293b',
      fontWeight: '600'
    },
    actions: {
      display: 'flex',
      gap: '8px'
    },
    editButton: {
      flex: 1,
      padding: '10px',
      background: '#1e293b',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    deleteButton: {
      flex: 1,
      padding: '10px',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modal: {
      background: 'white',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '600px',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    },
    modalHeader: {
      padding: '24px',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#64748b',
      padding: '4px 8px'
    },
    modalBody: {
      padding: '24px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#334155',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.2s',
      minHeight: '100px',
      resize: 'vertical',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box',
      background: 'white'
    },
    error: {
      color: '#ef4444',
      fontSize: '13px',
      marginTop: '6px'
    },
    submitButton: {
      width: '100%',
      padding: '14px',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
      color: '#64748b'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Products</h1>
          <button
            style={styles.addButton}
            onClick={() => handleOpenModal()}
            onMouseEnter={(e) => e.target.style.background = '#2563eb'}
            onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
          >
            + Add Product
          </button>
        </div>

        {products.length > 0 ? (
          <div style={styles.productsGrid}>
            {products.map((product, index) => (
              <div key={index} style={styles.productCard}>
                <img src={product.images} alt={product.name} style={styles.productImage} />
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productDescription}>{product.description}</p>
                <div style={styles.productDetails}>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Price:</span>
                    <span style={styles.detailValue}>${product.price}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Stock:</span>
                    <span style={styles.detailValue}>{product.stock} units</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>SKU:</span>
                    <span style={styles.detailValue}>{product.sku}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Category:</span>
                    <span style={styles.detailValue}>
                      {categories.find(c => c.id === product.categoryId)?.name || 'N/A'}
                    </span>
                  </div>
                </div>
                <div style={styles.actions}>
                  <button
                    style={styles.editButton}
                    onClick={() => handleOpenModal(product)}
                    onMouseEnter={(e) => e.target.style.background = '#0f172a'}
                    onMouseLeave={(e) => e.target.style.background = '#1e293b'}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(product.sku)}
                    onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                    onMouseLeave={(e) => e.target.style.background = '#ef4444'}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📦</div>
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>No products yet</h3>
            <p>Start by adding your first product</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.overlay} onClick={handleCloseModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button style={styles.closeButton} onClick={handleCloseModal}>✕</button>
            </div>
            <div style={styles.modalBody}>
              <div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="React Dashboard Template"
                    style={styles.input}
                  />
                  {errors.name && <div style={styles.error}>{errors.name}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detailed product description..."
                    style={styles.textarea}
                  />
                  {errors.description && <div style={styles.error}>{errors.description}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="49.99"
                    step="0.01"
                    style={styles.input}
                  />
                  {errors.price && <div style={styles.error}>{errors.price}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="100"
                    min="0"
                    max="9999"
                    style={styles.input}
                  />
                  {errors.stock && <div style={styles.error}>{errors.stock}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Image URL</label>
                  <input
                    type="url"
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    placeholder="https://example.com/image.png"
                    style={styles.input}
                  />
                  {errors.images && <div style={styles.error}>{errors.images}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>SKU (Unique)</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="RD001"
                    style={styles.input}
                  />
                  {errors.sku && <div style={styles.error}>{errors.sku}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.categoryId && <div style={styles.error}>{errors.categoryId}</div>}
                </div>

                <button
                  style={styles.submitButton}
                  onClick={handleSubmit}
                  onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                  onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}