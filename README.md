# 🛡️ Money Guard - Smart Personal Finance Tracker

A modern React-based application designed to help you manage your budget with ease. This tool allows users to track income and expenses, visualize financial data, and monitor currency rates in real-time.

---

## 🌟 Key Features

- **🔑 Secure Authentication:** User registration and login using JWT tokens.
- **💰 Transaction Management:** Add, edit, or delete income and expense records.
- **📊 Interactive Dashboard:** Visual statistics using Donut charts to identify major spending categories.
- **💱 Live Currency Exchange:** Real-time monitoring of USD/EUR rates.
- **📱 Fully Responsive:** Seamless experience across mobile, tablet, and desktop devices.
- **💾 Data Persistence:** Your session stays active even if you refresh the page.

---

## 🛠️ Tech Stack

| Technology            | Purpose                                                 |
| --------------------- | ------------------------------------------------------- |
| **React & Vite**      | Core library and fast build tool.                       |
| **Redux Toolkit**     | Centralized state management for user and finance data. |
| **Styled Components** | Component-level CSS for **modular** styling.            |
| **Chart.js**          | Visualizing expense categories.                         |
| **Formik & Yup**      | Robust form handling and schema validation.             |
| **Axios**             | Handling asynchronous API requests.                     |

---

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI components (Button, Modal, Loader)
├── redux/        # Global state, slices, and selectors
├── pages/        # Main views (Dashboard, Login, Register)
├── services/     # API configuration and HTTP requests
├── hooks/        # Custom React hooks
└── styles/       # Global styles and theme variables

```

---

## 🚀 Getting Started

1. **Clone the project:**

```bash
git clone https://github.com/KeskenRidvan/goit-react-final-project-money-guard.git
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the application:**

```bash
npm run dev
```

---

## 💎 Best Practices Applied

- **Separation of Concerns:** Business logic is kept in Redux or custom hooks, while components handle only the UI.
- **Component Composition:** Building complex layouts by nesting smaller, **reusable** components.
- **Clean Code:** Using descriptive variable names and consistent file formatting.
- **Error Handling:** Implementation of **graceful** error messages for failed login or network issues.

---

## 👤 Author

**Rıdvan Kesken**

- [GitHub](https://www.google.com/search?q=https://github.com/KeskenRidvan)
