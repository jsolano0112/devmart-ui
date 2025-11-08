# 🛒 DEVMART UI | by Wilson Estrada and Juana Solano

A modern React-based web application built with TypeScript, designed as the front-end for a real-time e-commerce platform.

---

## 🛠️ Technologies

- **React 19.2.0** - Main framework
- **React Router DOM 7.9.5** - SPA navigation
- **Axios 1.13.2** - HTTP client
- **Context API** - State management
- **CSS-in-JS** - Integrated styling
- **Create React App** - Boilerplate and build system

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jsolano0112/devmart-ui.git
   cd devmart-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Edit `src/environment/environment.ts` if necessary:
   ```typescript
   export const environment = {
     DEVMART_API: "http://localhost:3000/api/v1/"
   }
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

5. **Access the application:**
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔐 Authentication

- **Login**: `/Login`
- **Register**: `/SignUp`
- **Home**: `/` (requires authentication)
