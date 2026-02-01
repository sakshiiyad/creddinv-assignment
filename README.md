# Creddinv Frontend Assignment

This project is a frontend web application built as part of the Creddinv coding assignment.  
The application demonstrates authentication, protected routes, product listing with filters, and a responsive UI built according to the provided Figma design.

---

## 🚀 Live Demo

🔗 **Deployed Application:**  
https://creddinv-assignment.vercel.app

🔗 **GitHub Repository:**  
https://github.com/<your-username>/creddinv-assignment

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **React**
- **SCSS Modules**
- **Next.js Image Optimization**
- **Google Font (Volkhov) via `next/font`**
- **Vercel** for deployment

---

## ✨ Features

### 1. Authentication
- Login using email, password, and mobile number
- API-based authentication
- Token stored in `localStorage`
- Inline error handling for invalid credentials

### 2. Protected Routes
- Product list page is protected
- Unauthorized users are redirected to the login page
- Token validity is verified using a validation API

### 3. Product Listing
- Products fetched from the provided API
- Displayed in a grid layout as per Figma design
- Each product shows:
  - Image (static placeholder)
  - Product name
  - Price

### 4. Filters
Users can filter products by:
- **Size**
- **Color**
- **Price range**

Multiple filters can be applied together.  
A **Clear Filters** option is also provided.

### 5. Responsive Design
- Desktop: Sidebar + 3-column grid
- Tablet: 2-column grid
- Mobile: Single-column layout
- Layout adapts smoothly across breakpoints

---

## 🎨 UI & Design Decisions

- UI is implemented according to the provided Figma design
- **Volkhov font** is applied globally to match the design
- Brand name is treated as static UI content as it is not provided by the API
- Product images are static placeholders since the API does not return image URLs

---

## 📁 Project Structure

```txt
src/
 ├─ app/
 │   ├─ login/
 │   ├─ productlist/
 │   ├─ page.js        # Redirects to /login
 │   └─ layout.js      # Global layout & font
 ├─ components/
 │   ├─ ProductNavbar.jsx
 │   └─ Footer.jsx
 └─ styles/
public/
 └─ whiteTshirt.jpg
