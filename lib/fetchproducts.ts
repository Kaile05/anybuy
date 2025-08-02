import { Product } from "@/types/product"

export async function getProducts(): Promise<Product[]> {
  const [ dummyRes, fakeRes ] = await Promise.all([
    fetch("https://dummyjson.com/products"),
    fetch("https://fakestoreapi.com/products")
  ])
  if(!dummyRes.ok || !fakeRes.ok) throw new Error("Failed to Fetch Products.")

  const dummyJson = await dummyRes.json()
  const fakeData = await fakeRes.json()

  const dummyProducts:Product[] = dummyJson.products.map((item:any)=>({
    id: item.id + 1000,
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    image: item.thumbnail,
    rating: item.rating,
    source: "Dummy"
  }))

  const fakeProducts:Product[] = fakeData.map((item:any)=>({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    image: item.image,
    rating: item.rating?.rate || 0,
    source: "Fake"
  }))

  return[...dummyProducts,...fakeProducts]
}
