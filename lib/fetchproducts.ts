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

export async function getCategories(): Promise<string[]> {
  const [dummyRes, fakeRes] = await Promise.all([
    fetch("https://dummyjson.com/products/categories"),
    fetch("https://fakestoreapi.com/products/categories")
  ]);

  if (!dummyRes.ok || !fakeRes.ok) throw new Error("Failed to fetch categories");

  const dummyCategories = await dummyRes.json();
  const fakeCategories = await fakeRes.json();

  return [...new Set([...dummyCategories, ...fakeCategories])];
}

export async function getSingleProduct(id: number, source: "Fake" | "Dummy"): Promise<Product> {
  let product: any;

  if (source === "Fake") {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch Fake product.");
    product = await res.json();

    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating?.rate || 0,
      source: "Fake"
    };
  } else {
    const realId = id - 1000;
    const res = await fetch(`https://dummyjson.com/products/${realId}`);
    if (!res.ok) throw new Error("Failed to fetch Dummy product.");
    product = await res.json();

    return {
      id: product.id + 1000,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.thumbnail,
      rating: product.rating,
      source: "Dummy"
    };
  }
}
