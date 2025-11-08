import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductProvider";
import { CategoryContext } from "../contexts/CategoriesProvider";
import { UserContext } from "../contexts/UserProvider";

export default function HomePage() {
  const {
    productState: { products },
    getProducts,
    loadingProducts,
    error,
  } = useContext(ProductContext);
  const {
    categoryState: { categories },
    getCategories,
  } = useContext(CategoryContext);
  const {
    userState: { isAdmin },
  } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const allCategories = [{ id: "all", name: "All" }, ...(categories || [])];
  useEffect(() => {
    const timer = setTimeout(() => {
      getProducts();
      getCategories();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`✅ ${product.name} added to cart!`);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      paddingTop: "64px",
    },
    content: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "40px 20px",
    },
    header: {
      marginBottom: "32px",
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#1e293b",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#64748b",
    },
    filterSection: {
      background: "white",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "32px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    searchBar: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "16px",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      outline: "none",
      marginBottom: "16px",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    },
    categories: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    categoryBtn: {
      padding: "8px 16px",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      background: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      color: "#64748b",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    categoryBtnActive: {
      background: "#3b82f6",
      color: "white",
      borderColor: "#3b82f6",
    },
    resultsCount: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "16px",
      fontWeight: "500",
    },
    productsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gridAutoRows: "1fr",
      gap: "24px",
      alignItems: "stretch",
    },
    productCard: {
      background: "white",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "all 0.2s",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
    productIcon: {
      textAlign: "center",
      marginBottom: "16px",
    },
    productImage: {
      width: "100%",
      height: "220px", 
      objectFit: "cover", 
      borderRadius: "8px",
      marginBottom: "12px",
    },
    productName: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#1e293b",
      marginBottom: "8px",
    },
    productDescription: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "12px",
      minHeight: "60px",
      flexGrow: 1,
    },
    productMeta: {
      marginBottom: "12px",
    },
    rating: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "8px",
    },
    stock: {
      fontSize: "12px",
      color: "#64748b",
      marginBottom: "12px",
    },
    stockLow: {
      color: "#ef4444",
      fontWeight: "600",
    },
    productFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px",
      paddingTop: "16px",
      borderTop: "1px solid #e2e8f0",
    },
    price: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#3b82f6",
    },
    addButton: {
      padding: "10px 20px",
      background: "#1e293b",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    noResults: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#64748b",
      fontSize: "18px",
    },
  };

  if (loadingProducts) {
    return (
      <div style={{ textAlign: "center", padding: "80px", color: "#64748b" }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "80px", color: "#ef4444" }}>
        <h2>❌ Failed to load products</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Products</h1>
          <p style={styles.subtitle}>
            Discover amazing tools and resources for developers
          </p>
        </div>

        <div style={styles.filterSection}>
          <input
            type="text"
            placeholder="🔍 Search products by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchBar}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
          <div style={styles.categories}>
            {allCategories?.slice(0, 5).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  ...styles.categoryBtn,
                  ...(selectedCategory === category.id
                    ? styles.categoryBtnActive
                    : {}),
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.resultsCount}>
          Showing {filteredProducts.length} of {products?.length || 0} products
        </div>

        {filteredProducts.length > 0 ? (
          <div style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={styles.productCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }}
              >
                <div style={styles.productIcon}>
                  {product.images ? (
                    <img
                      src={product.images}
                      alt={product.name}
                       style={styles.productImage}
                    />
                  ) : (
                    "🛍️"
                  )}
                </div>
                <h3 style={styles.productName}>{product.name}</h3>
                <div style={styles.productMeta}>
                  <div style={styles.rating}>
                    ⭐ {product.rating || 4.5} rating
                  </div>
                  <div
                    style={{
                      ...styles.stock,
                      ...(product.stock < 10 ? styles.stockLow : {}),
                    }}
                  >
                    {product.stock < 10
                      ? `⚠️ Only ${product.stock} left!`
                      : `✅ ${product.stock} in stock`}
                  </div>
                </div>
                <p style={styles.productDescription}>{product.description}</p>
                <div style={styles.productFooter}>
                  <span style={styles.price}>${product.price}</span>
                  <button
                    style={styles.addButton}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noResults}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <p>No products found matching your search</p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
