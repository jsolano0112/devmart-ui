import React, { useState } from "react";
import { CategoryContext } from "../contexts/CategoriesProvider";
import { useContext } from "react";
export default function CategoriesModal({ isOpen, onClose }) {
  const {
    categoryState: { categories },
    getCategories,
    createOneCategory,
    deleteOneCategory,
  } = useContext(CategoryContext);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!newCategoryName.trim()) {
      setError("Category name is required");
      return;
    }

    const ok = await createOneCategory(newCategoryName);
    if (ok) {
      setNewCategoryName("");
      setError("");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteOneCategory(categoryId);

    setDeleteConfirm(null);
  };

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px",
    },
    modal: {
      background: "white",
      borderRadius: "16px",
      width: "100%",
      maxWidth: "700px",
      maxHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },
    header: {
      padding: "24px",
      borderBottom: "1px solid #e2e8f0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1e293b",
      margin: 0,
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#64748b",
      padding: "4px 8px",
      borderRadius: "4px",
      transition: "all 0.2s",
    },
    content: {
      padding: "24px",
      overflowY: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
    },
    section: {
      display: "flex",
      flexDirection: "column",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "16px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    input: {
      padding: "12px 16px",
      fontSize: "16px",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      outline: "none",
      transition: "border-color 0.2s",
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
    error: {
      color: "#ef4444",
      fontSize: "14px",
      marginTop: "4px",
    },
    categoriesList: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      maxHeight: "400px",
      overflowY: "auto",
    },
    categoryItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      background: "#f8fafc",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
    },
    categoryName: {
      fontSize: "16px",
      color: "#1e293b",
      fontWeight: "500",
    },
    deleteButton: {
      padding: "6px 12px",
      background: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px 20px",
      color: "#64748b",
    },
    confirmDialog: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      zIndex: 1001,
      minWidth: "300px",
    },
    confirmTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#1e293b",
      marginBottom: "12px",
    },
    confirmButtons: {
      display: "flex",
      gap: "12px",
      marginTop: "20px",
    },
    confirmButton: {
      flex: 1,
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={styles.header}>
            <h2 style={styles.title}>Manage Categories</h2>
            <button
              style={styles.closeButton}
              onClick={onClose}
              onMouseEnter={(e) => (e.target.style.background = "#f1f5f9")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              ✕
            </button>
          </div>

          <div style={styles.content}>
            {/* Add Category Section */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Add New Category</h3>
              <div style={styles.form}>
                <input
                  type="text"
                  placeholder="Category name..."
                  value={newCategoryName}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                    setError("");
                  }}
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
                {error && <div style={styles.error}>{error}</div>}
                <button
                  style={styles.button}
                  onClick={handleAddCategory}
                  onMouseEnter={(e) => (e.target.style.background = "#2563eb")}
                  onMouseLeave={(e) => (e.target.style.background = "#3b82f6")}
                >
                  Add Category
                </button>
              </div>
            </div>

            {/* Categories List Section */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                Existing Categories ({categories.length})
              </h3>
              {categories.length > 0 ? (
                <div style={styles.categoriesList}>
                  {categories.map((category) => (
                    <div key={category.id} style={styles.categoryItem}>
                      <span style={styles.categoryName}>{category.name}</span>
                      <button
                        style={styles.deleteButton}
                        onClick={() => setDeleteConfirm(category.id)}
                        onMouseEnter={(e) =>
                          (e.target.style.background = "#dc2626")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.background = "#ef4444")
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyState}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                    📂
                  </div>
                  <p>No categories yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div style={styles.overlay} onClick={() => setDeleteConfirm(null)}>
          <div
            style={styles.confirmDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={styles.confirmTitle}>Delete Category?</h3>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              This action cannot be undone. Products in this category will need
              to be reassigned.
            </p>
            <div style={styles.confirmButtons}>
              <button
                style={{
                  ...styles.confirmButton,
                  background: "#e2e8f0",
                  color: "#64748b",
                }}
                onClick={() => setDeleteConfirm(null)}
                onMouseEnter={(e) => (e.target.style.background = "#cbd5e1")}
                onMouseLeave={(e) => (e.target.style.background = "#e2e8f0")}
              >
                Cancel
              </button>
              <button
                style={{
                  ...styles.confirmButton,
                  background: "#ef4444",
                  color: "white",
                }}
                onClick={() => handleDeleteCategory(deleteConfirm)}
                onMouseEnter={(e) => (e.target.style.background = "#dc2626")}
                onMouseLeave={(e) => (e.target.style.background = "#ef4444")}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
