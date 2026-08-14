import { Product } from "@/types/product"

type DummyProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  thumbnail: string
  rating: number
}

type FakeProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
  }
}

type DummyProductsResponse = {
  products: DummyProduct[]
}

export async function getProducts(): Promise<Product[]> {
  const [dummyResult, fakeResult] = await Promise.allSettled([
    fetch("https://dummyjson.com/products", {
      cache: "no-store",
    }),

    fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    }),
  ])

  const dummyProducts: Product[] = []
  const fakeProducts: Product[] = []

  // =========================
  // DummyJSON
  // =========================

  if (
    dummyResult.status === "fulfilled" &&
    dummyResult.value.ok
  ) {
    const dummyJson: DummyProductsResponse =
      await dummyResult.value.json()

    dummyProducts.push(
      ...dummyJson.products.map((item) => ({
        id: item.id + 1000,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.thumbnail,
        rating: item.rating,
        source: "Dummy" as const,
      }))
    )
  }

  // =========================
  // Fake Store API
  // =========================

  if (
    fakeResult.status === "fulfilled" &&
    fakeResult.value.ok
  ) {
    const fakeData: FakeProduct[] =
      await fakeResult.value.json()

    fakeProducts.push(
      ...fakeData.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
        rating: item.rating?.rate || 0,
        source: "Fake" as const,
      }))
    )
  }

  // Only throw an error if BOTH APIs fail
  if (
    dummyProducts.length === 0 &&
    fakeProducts.length === 0
  ) {
    throw new Error("Both product APIs are unavailable.")
  }

  return [...dummyProducts, ...fakeProducts]
}


// ========================================
// GET CATEGORIES
// ========================================

export async function getCategories(): Promise<string[]> {
  const [dummyResult, fakeResult] = await Promise.allSettled([
    fetch("https://dummyjson.com/products/category-list", {
      cache: "no-store",
    }),

    fetch("https://fakestoreapi.com/products/categories", {
      cache: "no-store",
    }),
  ])

  let dummyCategories: string[] = []
  let fakeCategories: string[] = []

  // DummyJSON categories
  if (
    dummyResult.status === "fulfilled" &&
    dummyResult.value.ok
  ) {
    dummyCategories = await dummyResult.value.json()
  }

  // Fake Store categories
  if (
    fakeResult.status === "fulfilled" &&
    fakeResult.value.ok
  ) {
    fakeCategories = await fakeResult.value.json()
  }

  const categories = [
    ...new Set([
      ...dummyCategories,
      ...fakeCategories,
    ]),
  ]

  // Only throw if both APIs failed
  if (categories.length === 0) {
    throw new Error("Both category APIs are unavailable.")
  }

  return categories
}


// ========================================
// GET SINGLE PRODUCT
// ========================================

export async function getSingleProduct(
  id: number,
  source: "Fake" | "Dummy"
): Promise<Product> {

  // =========================
  // Fake Store
  // =========================

  if (source === "Fake") {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      {
        cache: "no-store",
      }
    )

    if (!res.ok) {
      throw new Error(
        `Fake Store API failed: ${res.status}`
      )
    }

    const product: FakeProduct =
      await res.json()

    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating?.rate || 0,
      source: "Fake",
    }
  }


  // =========================
  // DummyJSON
  // =========================

  const realId = id - 1000

  const res = await fetch(
    `https://dummyjson.com/products/${realId}`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error(
      `DummyJSON failed: ${res.status}`
    )
  }

  const product: DummyProduct =
    await res.json()

  return {
    id: product.id + 1000,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.thumbnail,
    rating: product.rating,
    source: "Dummy",
  }
}