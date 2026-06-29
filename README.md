# Lumière Candle Co.

![App Preview](https://imgix.cosmicjs.com/c03db7d0-73ae-11f1-a87f-d72293b1048a-autopilot-photo-1603006905003-be475563bc59-1782732981172.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern online candle shop built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Browse hand-poured candles, filter by scent, type, and price, read customer reviews, and add items to your cart — all with a warm, elegant design that works beautifully on mobile.

## Features

- 🏠 **Elegant homepage** with featured candles and category browsing
- 🕯️ **Full product catalog** with filtering (scent, candle type, price) and sorting
- 🔍 **Product detail pages** with image galleries, scent details, burn times, and customer reviews
- 🛒 **Shopping cart** with quantity controls (persisted in local storage)
- ⭐ **Customer reviews** with star ratings and verified purchase badges
- 🏷️ **Category pages** to browse candles by collection
- 🔎 **Search** to quickly find a specific candle
- 📦 **Stock status indicators** (in stock, low stock, out of stock)
- 📱 **Fully responsive** design that looks great on every device

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a4258585a70784f2710bd28&clone_repository=6a4259bf5a70784f2710bdcb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: Build Me an Online Candle Shop
> I want you to build me a complete online store where people can browse and buy candles. Please build both the customer side and the behind-the-scenes admin side.
> What customers should be able to do
>
> See a nice homepage with featured candles and different categories
> Browse all candles, with the ability to filter (by scent, price, type) and sort them
> Click on a candle to see big photos, the description, scent details, how long it burns, and customer reviews
> Add candles to a shopping cart and change quantities
> Check out and pay safely with their card
> Create an account to see their past orders and save their delivery address
> Search for a specific candle
> Have everything look good and work well on a phone
>
> What I (the shop owner) should be able to do
>
> Add, edit, and remove candles, including uploading photos
> Manage categories of candles
> See all orders and update their status (e.g. paid, shipped, delivered)
> Keep track of how much stock I have left
> See a simple overview of my sales and which items are running low
>
> Other things I need
>
> A safe and trusted way to take card payments
> Stock counts that go down automatically when something is bought
> Customer logins kept secure
> Sample candle products already added so I can see how it looks straight away
> Simple step-by-step instructions for how to set it up and run it
>
> Please build the whole thing, fill it with some example candles so I can see it working, and explain what you're doing in plain language as you go."

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `categories`, `products`, and `reviews` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables (these are automatically configured when you deploy via Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all products with their related category (depth 1)
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug })
  .depth(1)

// Fetch reviews for a specific product (query by object id)
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .depth(1)
```

## Cosmic CMS Integration

This app reads three object types from your Cosmic bucket:

- **Products** (`products`) — name, tagline, description, price, sale price, main image, gallery, scent, candle type, burn time, inventory count, stock status, featured flag, and a related category.
- **Categories** (`categories`) — name, description, category image, and featured flag.
- **Reviews** (`reviews`) — reviewer name, rating, review text, verified purchase flag, and a related product.

Learn more in the [Cosmic documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push your code to a Git repository
2. Import the project into [Vercel](https://vercel.com)
3. Add the `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy

### Netlify

1. Push your code to a Git repository
2. Import the project into [Netlify](https://netlify.com)
3. Add the environment variables in Site Settings
4. Deploy

<!-- README_END -->