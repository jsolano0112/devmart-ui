import React, { useState } from 'react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);

  // Mock data
  const products = [
    {
      id: 1,
      name: 'React Dashboard Template',
      category: 'templates',
      price: 49.99,
      image: '⚛️',
      description: 'Modern admin dashboard built with React and Tailwind CSS',
      rating: 4.8,
      stock: 15
    },
    {
      id: 2,
      name: 'Node.js API Boilerplate',
      category: 'code',
      price: 29.99,
      image: '🟢',
      description: 'Production-ready REST API with authentication and database',
      rating: 4.9,
      stock: 8
    },
    {
      id: 3,
      name: 'UI Component Library',
      category: 'components',
      price: 39.99,
      image: '🎨',
      description: '50+ customizable React components for your next project',
      rating: 4.7,
      stock: 20
    },
    {
      id: 4,
      name: 'E-commerce Starter Kit',
      category: 'templates',
      price: 79.99,
      image: '🛒',
      description: 'Full-stack e-commerce solution with payment integration',
      rating: 5.0,
      stock: 5
    },
    {
      id: 5,
      name: 'Python Data Pipeline',
      category: 'code',
      price: 34.99,
      image: '🐍',
      description: 'Automated ETL pipeline for data processing and analytics',
      rating: 4.6,
      stock: 12
    },
    {
      id: 6,
      name: 'Mobile App Template',
      category: 'templates',
      price: 59.99,
      image: '📱',
      description: 'Cross-platform mobile app built with React Native',
      rating: 4.8,
      stock: 10
    },
    {
      id: 7,
      name: 'Animation Library',
      category: 'components',
      price: 24.99,
      image: '✨',
      description: 'Smooth animations and transitions for web applications',
      rating: 4.5,
      stock: 25
    },
    {
      id: 8,
      name: 'Docker DevOps Kit',
      category: 'code',
      price: 44.99,
      image: '🐳',
      description: 'Complete CI/CD pipeline with Docker and Kubernetes',
      rating: 4.9,
      stock: 7
    },
    {
      id: 9,
      name: 'Vue.js SPA Template',
      category: 'templates',
      price: 54.99,
      image: '💚',
      description: 'Single Page Application starter with Vue 3 and Vite',
      rating: 4.7,
      stock: 18
    },
    {
      id: 10,
      name: 'GraphQL API Kit',
      category: 'code',
      price: 39.99,
      image: '🔷',
      description: 'Complete GraphQL server setup with Apollo and TypeScript',
      rating: 4.8,
      stock: 11
    },
    {
      id: 11,
      name: 'Chart Components Pack',
      category: 'components',
      price: 29.99,
      image: '📊',
      description: 'Beautiful data visualization charts and graphs library',
      rating: 4.6,
      stock: 30
    },
    {
      id: 12,
      name: 'AI Chatbot Template',
      category: 'templates',
      price: 89.99,
      image: '🤖',
      description: 'AI-powered chatbot with natural language processing',
      rating: 4.9,
      stock: 6
    }
  ];

  const categories = [
    { id: 'all', label: 'All Products', icon: '📦' },
    { id: 'templates', label: 'Templates', icon: '📄' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'components', label: 'Components', icon: '🧩' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log('Added to cart:', product);
    alert(`✅ ${product.name} added to cart!`);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      paddingTop: '64px' // Espacio para el navbar fijo
    },
    content: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '40px 20px'
    },
    header: {
      marginBottom: '32px'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#64748b'
    },
    filterSection: {
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '32px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    searchBar: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      outline: 'none',
      marginBottom: '16px',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box'
    },
    categories: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    },
    categoryBtn: {
      padding: '8px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      background: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      color: '#64748b',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    categoryBtnActive: {
      background: '#3b82f6',
      color: 'white',
      borderColor: '#3b82f6'
    },
    resultsCount: {
      fontSize: '14px',
      color: '#64748b',
      marginBottom: '16px',
      fontWeight: '500'
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px'
    },
    productCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.2s',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column'
    },
    productIcon: {
      fontSize: '64px',
      textAlign: 'center',
      marginBottom: '16px'
    },
    productName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '8px'
    },
    productDescription: {
      fontSize: '14px',
      color: '#64748b',
      marginBottom: '12px',
      minHeight: '60px',
      flexGrow: 1
    },
    productMeta: {
      marginBottom: '12px'
    },
    rating: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '14px',
      color: '#64748b',
      marginBottom: '8px'
    },
    stock: {
      fontSize: '12px',
      color: '#64748b',
      marginBottom: '12px'
    },
    stockLow: {
      color: '#ef4444',
      fontWeight: '600'
    },
    productFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: '1px solid #e2e8f0'
    },
    price: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#3b82f6'
    },
    addButton: {
      padding: '10px 20px',
      background: '#1e293b',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    noResults: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#64748b',
      fontSize: '18px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Browse Products</h1>
          <p style={styles.subtitle}>Discover amazing tools and resources for developers</p>
        </div>

        {/* Filters */}
        <div style={styles.filterSection}>
          <input
            type="text"
            placeholder="🔍 Search products by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchBar}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
          <div style={styles.categories}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  ...styles.categoryBtn,
                  ...(selectedCategory === category.id ? styles.categoryBtnActive : {})
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.background = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.background = 'white';
                  }
                }}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div style={styles.resultsCount}>
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div style={styles.productsGrid}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                style={styles.productCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                <div style={styles.productIcon}>{product.image}</div>
                <h3 style={styles.productName}>{product.name}</h3>
                <div style={styles.productMeta}>
                  <div style={styles.rating}>
                    ⭐ {product.rating} rating
                  </div>
                  <div style={{...styles.stock, ...(product.stock < 10 ? styles.stockLow : {})}}>
                    {product.stock < 10 ? `⚠️ Only ${product.stock} left!` : `✅ ${product.stock} in stock`}
                  </div>
                </div>
                <p style={styles.productDescription}>{product.description}</p>
                <div style={styles.productFooter}>
                  <span style={styles.price}>${product.price}</span>
                  <button
                    style={styles.addButton}
                    onClick={() => addToCart(product)}
                    onMouseEnter={(e) => e.target.style.background = '#0f172a'}
                    onMouseLeave={(e) => e.target.style.background = '#1e293b'}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noResults}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p>No products found matching your search</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}