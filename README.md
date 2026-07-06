# 🥬 VeggieMart

<div align="center">

### A Full-Stack MERN E-Commerce Platform for Fresh Vegetable Shopping

Built with **React**, **Node.js**, **Express.js**, **MongoDB Atlas**, **JWT Authentication**, and **Razorpay Test Mode**.

</div>

---

## 🚀 Live Demo

🌐 **Frontend:** https://veggie-mart-nine.vercel.app

⚙️ **Backend API:** https://veggiemart-s603.onrender.com/api

> **Note:** The backend is hosted on Render's free tier. The first request after inactivity may take **30–60 seconds** while the server wakes up.

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

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React, Vite, Tailwind CSS, React Router, Axios, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcryptjs |
| Payment | Razorpay Test Mode |
| Deployment | Vercel, Render |

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
git clone https://github.com/isatyam123/VeggieMart.git

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

## ☁️ Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Payment Gateway | Razorpay Test Mode |

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
