# 🥬 VeggieMart

<div align="center">

### A Full-Stack MERN E-Commerce Platform for Fresh Vegetable Shopping

Built with **React**, **Node.js**, **Express**, **MongoDB Atlas**, **JWT Authentication**, and **Razorpay Test Mode**.

</div>

---

## 🌟 Overview

VeggieMart is a full-stack MERN e-commerce application that enables users to browse fresh vegetables, securely authenticate, manage their shopping cart, and complete online purchases using Razorpay Test Mode.

The application follows a modern client-server architecture with RESTful APIs, secure JWT-based authentication, MongoDB Atlas for persistent storage, and a responsive user interface built using React and Tailwind CSS.

---

## ✨ Features

### 👤 Authentication

- Secure JWT Authentication
- User Registration & Login
- Password Hashing using bcrypt
- Protected Routes
- Persistent Login

### 🛒 Shopping Experience

- Browse Fresh Vegetables
- Product Detail Page
- Search Products
- Add / Remove Cart Items
- Update Quantity
- Responsive Shopping Cart

### 💳 Checkout & Payments

- Secure Checkout Flow
- Shipping Information
- Razorpay Test Mode Integration
- Backend Payment Verification
- Order Placement
- Payment Status Tracking

### 📦 Order Management

- View Order History
- Paid / Pending Status
- User Profile
- Secure Order Retrieval

### 🎨 User Interface

- Responsive Design
- Tailwind CSS
- Modern Product Cards
- Toast Notifications
- Mobile Friendly

---

# 🏗 Tech Stack

## Frontend

- React (Vite)
- React Router
- Tailwind CSS
- Axios
- Context API
- React Hot Toast
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Razorpay SDK

---

# 📂 Project Structure

```text
VeggieMart
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── data
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/veggiemart.git

cd veggiemart
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000

NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_test_key

RAZORPAY_KEY_SECRET=your_test_secret
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

---

## Seed Database

```bash
cd backend

npm run data:import
```

---

## Run Backend

```bash
npm run dev
```

---

## Run Frontend

```bash
cd frontend

npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```

---

# 💳 Razorpay Test Payment

VeggieMart integrates **Razorpay Test Mode** for secure payment processing.

Use your own Razorpay Test API Keys inside:

```
backend/.env
```

Payment verification is performed securely on the backend using Razorpay's signature verification mechanism before marking an order as paid.

---

# 🔐 Authentication Flow

```
User Login
      │
      ▼
Generate JWT
      │
      ▼
Store Token
      │
      ▼
Protected APIs
      │
      ▼
Verify JWT
      │
      ▼
Return User Data
```

---

# 🛍 Order Flow

```
Browse Products
      │
      ▼
Add to Cart
      │
      ▼
Checkout
      │
      ▼
Create Razorpay Order
      │
      ▼
Complete Payment
      │
      ▼
Verify Signature
      │
      ▼
Update Order Status
```

---

# 🌱 Future Improvements

- Admin Dashboard
- Product Categories
- Wishlist
- Product Reviews
- Coupons & Discounts
- Inventory Management
- Cloudinary Image Uploads
- Email Notifications
- Order Tracking
- PWA Support

---

# 👨‍💻 Author

**Satyam Kumar**
