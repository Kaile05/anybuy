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
  const [dummyRes, fakeRes] = await Promise.all([
    fetch("https://dummyjson.com/products", {
      cache: "no-store",
    }),
    fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    }),
  ])

  if (!dummyRes.ok) {
    throw new Error(
      `DummyJSON failed: ${dummyRes.status} ${dummyRes.statusText}`
    )
  }

  if (!fakeRes.ok) {
    throw new Error(
      `Fake Store API failed: ${fakeRes.status} ${fakeRes.statusText}`
    )
  }

  const dummyJson: DummyProductsResponse = await dummyRes.json()
  const fakeData: FakeProduct[] = await fakeRes.json()

  const dummyProducts: Product[] = dummyJson.products.map((item) => ({
    id: item.id + 1000,
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    image: item.thumbnail,
    rating: item.rating,
    source: "Dummy",
  }))

  const fakeProducts: Product[] = fakeData.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    image: item.image,
    rating: item.rating?.rate || 0,
    source: "Fake",
  }))

  return [...dummyProducts, ...fakeProducts]
}

export async function getCategories(): Promise<string[]> {
  const [dummyRes, fakeRes] = await Promise.all([
    fetch("https://dummyjson.com/products", {
      cache: "no-store",
    }),
    fetch("https://fakestoreapi.com/products/categories", {
      cache: "no-store",
    }),
  ])

  if (!dummyRes.ok) {
    throw new Error(`DummyJSON failed: ${dummyRes.status}`)
  }

  if (!fakeRes.ok) {
    throw new Error(`Fake Store API failed: ${fakeRes.status}`)
  }

  const dummyJson: DummyProductsResponse = await dummyRes.json()
  const fakeCategories: string[] = await fakeRes.json()

  const dummyCategories = [
    ...new Set(dummyJson.products.map((product) => product.category)),
  ]

  return [...new Set([...dummyCategories, ...fakeCategories])]
}

export async function getSingleProduct(
  id: number,
  source: "Fake" | "Dummy"
): Promise<Product> {
  if (source === "Fake") {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`Fake Store API failed: ${res.status}`)
    }

    const product: FakeProduct = await res.json()

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

  const realId = id - 1000

  const res = await fetch(`https://dummyjson.com/products/${realId}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`DummyJSON failed: ${res.status}`)
  }

  const product: DummyProduct = await res.json()

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