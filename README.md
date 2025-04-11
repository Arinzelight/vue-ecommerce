# 🛍️ Vue.js E-Commerce Website

---

A simple and responsive e-commerce website built using Vue 3, Pinia, and the Platzi Fake Store API. This project showcases how to structure a Vue.js application, integrate with REST APIs, implement pagination, search, favorites, and state persistence — while delivering a polished user experience with dark mode support.

## 📚 Project Overview

---

## Objective:

Build an e-commerce website that supports product browsing, category filtering, favorites management, and tracks recently visited items. Emphasis is placed on API interaction, state management, and UI responsiveness.

## ✨ Features

🔖 General
🌐 SPA with Vue Router

🌙 Dark mode toggle (using Lucide Vue icons)

🌀 Custom loading spinner using Lucide Vu

## Home Page

- Fetch and display product categories from the API

- Search bar to filter products by title

- Display 5 recently favorited and 5 recently viewed products (from state or localStorage)

## Categories Page

- View a list of product categories

- View products by selected category

- Pagination for category products (10 per page)

## Product Listing Page

- Table view of all products with:

- Product image

- Title

- Price

- Category

- Favorite button ⭐

- Pagination to navigate through products

- Sorting options (by price or name)

## 📦 Product Details Page

- Detailed view for a selected product:

- Large image

- Title

- Price

- Description

## Category

❤️ Favorites Page

- Table of all favorited products

- Remove products from favorites list

## 🛠 Technologies Used

- Vue 3 (Composition API)

- Vite

- Pinia – state management

- Vue Router – routing

- Tailwind CSS v4 – styling

- Axios – API requests

- Lucide Vue – icons (including spinner)

## Bonus Features Implemented

✅ Pagination on category and product listing pages

✅ Sorting by price and name

✅ Dark mode toggle with theme persistence

## Installation & Setup

1. Clone the Repository

```bash
git clone https://github.com/Arinzelight/vue-ecommerce.git
cd vue-ecommerce
```

2. Install Dependencies

```bash
   npm install
```

3. Start the Development Server

```bash
   npm run dev
```

## 🔗 Live Demo

[Live Demo](https://vue-ecommerce-iota.vercel.app/)

Time Tracking
This project was tracked using Toggl. Total time spent: 24 hours+
