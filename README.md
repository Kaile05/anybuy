🛒 AnyBuy

A responsive e-commerce web application built with Next.js, React, TypeScript, and Tailwind CSS.

AnyBuy combines product data from multiple public APIs into a unified shopping experience, allowing users to browse products, explore categories, view product details, filter products, and manage items in a shopping cart.

🚀 Live Demo

"Visit AnyBuy" (YOUR_VERCEL_URL_HERE)

✨ Features

- 🛍️ Product Catalog — Browse products from multiple API sources.
- 🔎 Product Discovery — Explore products through categories and curated sections.
- 🗂️ Category Filtering — Filter products by category.
- ⭐ Top Rated Products — View highly-rated products.
- 📄 Product Details — View detailed information about individual products.
- 🛒 Shopping Cart — Add and remove products from the cart.
- 🔢 Quantity Management — Adjust product quantities in the cart.
- 📱 Responsive Design — Designed for desktop and mobile devices.
- 🔀 Multiple API Sources — Combines product data from different APIs into a single interface.
- 🧩 Reusable Components — Built using modular React components.
- 🔷 TypeScript — Uses static typing for improved maintainability and developer experience.

🛠️ Tech Stack

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

APIs

- Fake Store API
- DummyJSON

Development Tools

- Git
- GitHub
- npm
- ESLint
- Vercel

🏗️ Project Structure

anybuy/
├── app/
│   ├── ...
│   └── ...
│
├── components/
│   ├── ...
│   └── ...
│
├── lib/
│   └── ...
│
├── types/
│   └── ...
│
├── public/
│   └── ...
│
├── package.json
├── tsconfig.json
└── next.config.ts

🔌 API Integration

AnyBuy combines product information from multiple public APIs into one unified product catalog.

Products from different sources are normalized within the application so they can be displayed using the same reusable UI components.

To prevent product ID conflicts between API sources, products are identified using source-specific prefixes.

For example:

fake-123
dummy-123

This allows products from different APIs to coexist safely within the application.

🛒 Shopping Cart

The application includes a shopping cart where users can:

- Add products
- Remove products
- Adjust quantities
- View selected products
- Review cart totals

The cart is designed around reusable product data so products from different API sources can be handled consistently.

📋 Getting Started

1. Clone the repository

git clone https://github.com/Kaile05/anybuy.git

2. Navigate to the project

cd anybuy

3. Install dependencies

npm install

4. Start the development server

npm run dev

Open your browser and visit:

http://localhost:3000

📸 Screenshots

Home Page

<img width="959" height="478" alt="image" src="https://github.com/user-attachments/assets/7b0c74d1-e17c-4405-8936-4aa0772b3fb3" />
<img width="439" height="459" alt="image" src="https://github.com/user-attachments/assets/8c984f3d-208e-4e6c-9c23-f8f485791ea6" />

Products

<img width="950" height="474" alt="image" src="https://github.com/user-attachments/assets/6cada3b9-8762-4106-b63e-efd29adbd4e1" />
<img width="437" height="463" alt="image" src="https://github.com/user-attachments/assets/820f289c-40b5-4f33-aebb-0395ea1c0993" />

Product Details

<img width="948" height="474" alt="image" src="https://github.com/user-attachments/assets/3f09b436-9156-42b3-8b4b-6c4ddd4782dc" />
<img width="442" height="463" alt="image" src="https://github.com/user-attachments/assets/f2d0c1f5-abd3-4946-9275-45db12a5acb0" />

🎯 What I Learned

Building AnyBuy helped me improve my understanding of:

- Next.js App Router
- React component architecture
- TypeScript
- Dynamic routes
- REST API integration
- Combining data from multiple APIs
- Data normalization
- Reusable components
- Shopping cart state management
- Responsive UI development
- Type-safe application development
- Git and GitHub workflow

🔮 Future Improvements

- [ ] Add user authentication
- [ ] Add persistent cart storage
- [ ] Add product search
- [ ] Improve filtering and sorting
- [ ] Add checkout flow
- [ ] Add payment integration
- [ ] Add product reviews
- [ ] Add automated tests
- [ ] Improve accessibility
- [ ] Improve API error handling
- [ ] Add loading skeletons

👨‍💻 Author

Lorenz Kyle Umpad

Frontend Developer / Computer Engineering Graduate

- GitHub: "@Kaile05" (https://github.com/Kaile05)

📄 License

This project is intended for personal and educational purposes.
